import { api } from './api';
import { mockRepository } from '../repository/mock';
import { supabase, isSupabaseConfigured } from './supabase';

let useBackend = false;
let useSupabase = false;
let isInitialized = false;

export const unifiedService = {
    async initialize() {
        if (isInitialized) return { useBackend, useSupabase };
        
        console.log("Inicializando serviços...");
        
        // 1. Tenta Supabase primeiro (Prioridade)
        if (isSupabaseConfigured()) {
            console.log("Supabase configurado. Verificando conexão...");
            // Um ping simples pode ser verificar a sessão ou uma tabela pública
            // Mas por enquanto assumimos que se tem chave, vamos tentar usar
            useSupabase = true;
            console.log("Usando Supabase como backend principal.");
        } else {
            console.log("Supabase não configurado (Faltam variáveis de ambiente).");
            
            // 2. Se não tem Supabase, tenta API Legada
            console.log("Verificando disponibilidade do backend legado...");
            useBackend = await api.healthCheck();
            console.log(`Backend legado disponível: ${useBackend ? 'Sim' : 'Não'}.`);
        }

        console.log(`Modo de operação: ${useSupabase ? 'Supabase' : (useBackend ? 'API Python' : 'Mock Local')}`);
        
        isInitialized = true;
        return { useBackend, useSupabase };
    },

    async login(email, password) {
        if (!isInitialized) await this.initialize();

        email = email?.trim();
        password = password?.trim();

        if (useSupabase) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                
                // Tenta pegar do metadata do usuário
                const meta = data.user.user_metadata || {};
                
                const userProfile = {
                    id: data.user.id,
                    name: meta.full_name || data.user.email.split('@')[0],
                    email: data.user.email,
                    // Usa os valores do metadata se existirem
                    accessLevel: meta.access_level !== undefined ? parseInt(meta.access_level) : 1,
                    role: meta.role || 'student',
                    branch: meta.branch || '' // Garante que a filial seja passada
                };
                
                return { user: userProfile, token: data.session.access_token };
            } catch (error) {
                // Se falhar no Supabase por credenciais inválidas OU erro de conexão, tenta o Mock
                // Isso permite login híbrido (usuários reais e usuários de teste) e fallback offline
                const isAuthError = error.message && (error.message.includes("Invalid login credentials") || error.message.includes("user not found"));
                const isNetworkError = error.message && (error.message.includes("Failed to fetch") || error.message.includes("Network request failed"));

                if (isAuthError || isNetworkError) {
                    console.log(`Login Supabase falhou (${isAuthError ? 'Auth' : 'Network'}), tentando Mock...`);
                    try {
                        const mockUser = await mockRepository.login(email, password);
                        if (mockUser) {
                             console.log("Usuário encontrado no Mock!");
                             return { user: mockUser, token: 'mock-token-' + Date.now() };
                        }
                    } catch (mockError) {
                        // Se falhar no mock também, ignora erro do mock e lança o original do Supabase
                    }
                }

                console.error("Erro no login Supabase:", error);
                throw error;
            }
        } else if (useBackend) {
            // ... (código existente da API Python)
            try {
                const { access_token } = await api.login(email, password);
                const user = await api.getMe(access_token);
                
                const mappedUser = {
                    ...user,
                    id: user.id || user.username,
                    name: user.full_name || user.username,
                };

                return { user: mappedUser, token: access_token };
            } catch (error) {
                console.error("Erro no login via API:", error);
                // Tenta fallback para Mock se for erro de conexão ou credenciais inválidas na API Python também
                try {
                    console.log("Tentando fallback para Mock após falha na API Python...");
                    const mockUser = await mockRepository.login(email, password);
                    if (mockUser) {
                         return { user: mockUser, token: 'mock-token-' + Date.now() };
                    }
                } catch (mockError) {
                    // Ignora erro do mock
                }
                throw error;
            }
        } else {
            // ... (código existente do Mock)
            if (!mockRepository || typeof mockRepository.login !== 'function') {
                console.error("Erro Crítico: mockRepository.login não está definido.", mockRepository);
                throw new Error("Erro interno no sistema de login (Mock indisponível).");
            }
            const user = await mockRepository.login(email, password);
            return { user, token: 'mock-token-' + Date.now() };
        }
    },

    async signUp(email, password, userData) {
        if (!isInitialized) await this.initialize();

        email = email?.trim();
        password = password?.trim();

        if (useSupabase) {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: userData.name,
                            role: 'student', // Padrão: Aluno
                            access_level: 1,
                            branch: 'Montanha Top Team' // Default branch
                        }
                    }
                });
                if (error) throw error;
                return data;
            } catch (error) {
                console.error("Erro no cadastro Supabase:", error);
                throw error;
            }
        } else {
            // Mock signup
            console.log("Mock SignUp:", { email, ...userData });
            return { 
                user: { id: 'mock-new', email, ...userData, role: 'student' }, 
                session: null // Simula que precisa verificar
            };
        }
    },

    async verifyOtp(email, token, type = 'signup') {
        if (!isInitialized) await this.initialize();
        
        if (useSupabase) {
            try {
                const { data, error } = await supabase.auth.verifyOtp({
                    email,
                    token,
                    type
                });
                if (error) throw error;
                
                const meta = data.user.user_metadata || {};
                const userProfile = {
                    id: data.user.id,
                    name: meta.full_name || data.user.email.split('@')[0],
                    email: data.user.email,
                    accessLevel: meta.access_level !== undefined ? parseInt(meta.access_level) : 1,
                    role: meta.role || 'student'
                };
                
                return { user: userProfile, token: data.session.access_token };
            } catch (error) {
                 console.error("Erro na verificação OTP:", error);
                 throw error;
            }
        } else {
            // Mock verify
            if (token === '123456') {
                return { 
                    user: { id: 'mock-new', email, name: 'Novo Aluno', role: 'student', accessLevel: 1 }, 
                    token: 'mock-token-verified' 
                };
            }
            throw new Error("Código de verificação inválido.");
        }
    },

    async resendOtp(email, type = 'signup') {
        if (!isInitialized) await this.initialize();
        
        if (useSupabase) {
            try {
                const { data, error } = await supabase.auth.resend({
                    email,
                    type,
                    options: {
                        emailRedirectTo: undefined 
                    }
                });
                if (error) throw error;
                return { message: "Código reenviado com sucesso!" };
            } catch (error) {
                console.error("Erro ao reenviar OTP:", error);
                throw error;
            }
        } else {
            console.log("Mock Resend OTP para:", email);
            return { message: "Código reenviado (Mock)" };
        }
    },

    async getStudents(token) {
        if (!isInitialized) await this.initialize();

        if (useSupabase) {
            try {
                const { data, error } = await supabase
                    .from('students')
                    .select('*');
                
                if (error) {
                    if (error.code === '42P01') { // undefined_table
                        console.warn("Tabela 'students' não encontrada no Supabase. Retornando Mock.");
                        return await mockRepository.getStudents();
                    }
                    throw error;
                }
                
                // Se o Supabase retornar vazio ou 0, carrega os dados mocados (Solicitação do usuário)
                if (!data || data.length === 0) {
                     console.log("Supabase retornou lista vazia de alunos. Carregando dados mocados.");
                     return await mockRepository.getStudents();
                }

                return data;
            } catch (error) {
                console.error("Erro ao buscar alunos no Supabase:", error);
                // Fallback para Mock
                return await mockRepository.getStudents();
            }
        } else if (useBackend) {
            try {
                return await api.getStudents(token);
            } catch (error) {
                console.warn("Falha ao buscar estudantes da API, tentando mock como fallback...", error);
                return await mockRepository.getStudents();
            }
        } else {
            return await mockRepository.getStudents();
        }
    },

    async getCurrentUser() {
        if (!isInitialized) await this.initialize();
        
        if (useSupabase) {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;
            
            // Mapear para formato interno
            const meta = user.user_metadata || {};
            return {
                id: user.id,
                email: user.email,
                name: meta.full_name || user.email,
                accessLevel: meta.access_level !== undefined ? parseInt(meta.access_level) : 1,
                role: meta.role || 'student',
                branch: meta.branch || ''
            };
        } else if (useBackend) {
             try {
                 return await api.getMe();
             } catch (e) {
                 return null;
             }
        } else {
             return null;
        }
    },

    async createUser(userData) {
        if (!isInitialized) await this.initialize();
        
        if (useSupabase) {
            // Criar usuário no Auth (Requer que a função seja chamada por um Admin Logado via Service Role ou API Function se o RLS bloquear)
            // OBS: O supabase.auth.signUp cria usuário e loga automaticamente (o que mudaria a sessão do admin).
            // Para criar OUTRO usuário sem deslogar, deve-se usar a Admin API (backend) ou uma Edge Function.
            // Porem, como estamos no frontend puro, a solução comum é usar `supabase.auth.signUp` se for auto-cadastro,
            // OU chamar uma função Postgres RPC se for admin criando usuário.
            
            // SIMPLIFICAÇÃO: Por enquanto, vamos criar apenas o registro na tabela 'profiles' simulando que o Auth já existe
            // ou assumir que vamos implementar um "Invite User" futuramente.
            
            // CORREÇÃO: Vamos tentar usar a API de admin via RPC ou instruir o usuário que criação de usuário requer backend
            console.warn("Criação de usuário via Frontend no Supabase requer Edge Function ou Admin API.");
            
            // Tenta criar apenas o profile se o ID for fornecido (migração)
            // Se for novo user real, retornamos erro por enquanto
            throw new Error("Criação de novos usuários de acesso ainda não implementada no modo Supabase (Requer Edge Function).");
        } else {
            // Mock implementation
            return { id: Date.now(), ...userData };
        }
    },



    async createStudent(studentData, token) {
        if (!isInitialized) await this.initialize();

        if (useSupabase) {
            try {
                const { data, error } = await supabase
                    .from('students')
                    .insert([studentData])
                    .select();
                
                if (error) throw error;
                return data[0];
            } catch (error) {
                console.error("Erro ao criar aluno no Supabase:", error);
                throw error;
            }
        } else if (useBackend) {
            return await api.createStudent(studentData, token);
        } else {
            return await mockRepository.createStudent(studentData);
        }
    },

    async logout() {
        if (useSupabase) {
            await supabase.auth.signOut();
        } else if (useBackend) {
            await api.logout();
        }
    },
    
    // Adicione outros métodos conforme necessário (getTransactions, etc)
    async getTransactions() {
        if (!isInitialized) await this.initialize();
        
        if (useSupabase) {
            // Implementar tabela 'financial_transactions' futuramente
            return []; 
        } else {
            // Mock ou Backend legado não implementado aqui
            return [];
        }
    },

    // User Management
    async getUsers() {
        if (!isInitialized) await this.initialize();
        
        let supabaseUsers = [];
        
        if (useSupabase) {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('name');
                
                if (error) {
                    console.error("Erro Supabase getUsers:", error);
                } else {
                    supabaseUsers = data.map(p => ({
                        id: p.id,
                        name: p.name || p.full_name || 'Sem Nome',
                        email: p.email || 'Email não disponível', 
                        role: p.role || 'student',
                        accessLevel: p.access_level || 1,
                        branch: p.branch || ''
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar usuários do Supabase:", error);
            }
        }
        
        // Busca usuários Mockados para manter na lista (Híbrido)
        const mockUsers = await mockRepository.getUsers();
        
        // Combina as listas (Mock + Supabase)
        // IDs do Supabase são UUIDs, do Mock são Inteiros, então dificilmente haverá colisão
        const allUsers = [...supabaseUsers, ...mockUsers];
        
        return allUsers;
    },

    async createUser(userData) {
        if (!isInitialized) await this.initialize();
        
        if (useSupabase) {
            // Nota: Criar usuário no Auth via Client requer login ou função RPC.
            // Por enquanto, simulamos sucesso ou avisamos.
            console.warn("Criação de usuário direto via painel admin requer Edge Functions. Usuário não será criado no Auth.");
            alert("Atenção: A criação de usuários por aqui apenas adicionaria ao banco de dados, mas não criaria o login. Peça para o usuário se cadastrar na tela de login.");
            return { id: Date.now(), ...userData };
        }
        return await mockRepository.createUser(userData);
    },

    async updateUser(id, updates) {
        if (!isInitialized) await this.initialize();
        
        // Verifica se é ID de Mock (numérico)
        if (typeof id === 'number' || !isNaN(Number(id))) {
            return await mockRepository.updateUser(id, updates);
        }

        if (useSupabase) {
            try {
                // Mapeia campos do frontend para colunas do banco
                const dbUpdates = {
                    name: updates.name,
                    role: updates.role,
                    access_level: updates.accessLevel,
                    branch: updates.branch
                };

                const { data, error } = await supabase
                    .from('profiles')
                    .update(dbUpdates)
                    .eq('id', id)
                    .select();

                if (error) throw error;
                return data[0];
            } catch (error) {
                console.error("Erro ao atualizar usuário no Supabase:", error);
                throw error;
            }
        }
        return await mockRepository.updateUser(id, updates);
    },

    async deleteUser(id) {
        if (!isInitialized) await this.initialize();
        
        // Verifica se é ID de Mock (numérico)
        if (typeof id === 'number' || !isNaN(Number(id))) {
            return await mockRepository.deleteUser(id);
        }

        if (useSupabase) {
             try {
                const { error } = await supabase
                    .from('profiles')
                    .delete()
                    .eq('id', id);
                
                if (error) throw error;
                return { success: true };
            } catch (error) {
                console.error("Erro ao deletar usuário no Supabase:", error);
                throw error;
            }
        }
        return await mockRepository.deleteUser(id);
    },

    // Professor Management
    async getProfessorEvents() {
        if (!isInitialized) await this.initialize();
        return await mockRepository.getProfessorEvents();
    },

    async addProfessorEvent(eventData) {
        if (!isInitialized) await this.initialize();
        return await mockRepository.addProfessorEvent(eventData);
    },

    async updateProfessorEvent(id, updates) {
        if (!isInitialized) await this.initialize();
        return await mockRepository.updateProfessorEvent(id, updates);
    },
    
    // Método auxiliar para forçar modo (útil para testes)
    setMode(mode) {
        useBackend = mode === 'backend';
        isInitialized = true;
    },
    
    isUsingBackend() {
        return useBackend;
    }
};

import { api } from './api';
import { mockRepository } from '../repository/mock';

let useBackend = false;
let isInitialized = false;

export const unifiedService = {
    async initialize() {
        if (isInitialized) return useBackend;
        
        console.log("Verificando disponibilidade do backend...");
        useBackend = await api.healthCheck();
        console.log(`Backend disponível: ${useBackend ? 'Sim' : 'Não'}. Usando ${useBackend ? 'API' : 'Mock'}.`);
        
        isInitialized = true;
        return useBackend;
    },

    async login(email, password) {
        if (!isInitialized) await this.initialize();

        if (useBackend) {
            try {
                const { access_token } = await api.login(email, password);
                const user = await api.getMe(access_token);
                
                // Mapear campos do backend para o formato esperado pelo frontend se necessário
                // Backend User: { username, email, full_name, role, ... }
                // Frontend User espera: { id, name, role, email, ... }
                
                const mappedUser = {
                    ...user,
                    id: user.id || user.username, // Fallback se id não vier
                    name: user.full_name || user.username,
                    // Garante que role existe
                };

                return { user: mappedUser, token: access_token };
            } catch (error) {
                console.error("Erro no login via API:", error);
                throw error; // Repassa erro de credenciais ou servidor
            }
        } else {
            // Verifica se mockRepository e mockRepository.login existem antes de chamar
            if (!mockRepository || typeof mockRepository.login !== 'function') {
                console.error("Erro Crítico: mockRepository.login não está definido.", mockRepository);
                throw new Error("Erro interno no sistema de login (Mock indisponível).");
            }
            const user = await mockRepository.login(email, password);
            return { user, token: 'mock-token-' + Date.now() };
        }
    },

    async getStudents(token) {
        if (!isInitialized) await this.initialize();

        if (useBackend) {
            try {
                return await api.getStudents(token);
            } catch (error) {
                console.warn("Falha ao buscar estudantes da API, tentando mock como fallback...", error);
                // Opcional: Fallback para mock se a API falhar em listar (já que a API pode estar incompleta)
                return await mockRepository.getStudents();
            }
        } else {
            return await mockRepository.getStudents();
        }
    },

    async getCurrentUser() {
        if (!isInitialized) await this.initialize();
        
        if (useBackend) {
             // Tenta obter usuário via cookie
             try {
                 return await api.getMe();
             } catch (e) {
                 return null;
             }
        } else {
             // No mock, não temos persistência real de sessão além do localStorage gerenciado pelo AuthContext
             // Então retornamos null aqui e deixamos o AuthContext usar o localStorage fallback
             return null;
        }
    },

    async createStudent(studentData, token) {
        if (!isInitialized) await this.initialize();

        if (useBackend) {
            return await api.createStudent(studentData, token);
        } else {
            return await mockRepository.createStudent(studentData);
        }
    },

    async logout() {
        if (useBackend) {
            await api.logout();
        }
        // Mock doesn't need explicit logout call as it's local
    },

    async getTransactions() {
        if (!isInitialized) await this.initialize();
        // Backend não tem transações implementadas ainda, fallback para mock
        // Se no futuro tiver, adicionar lógica aqui
        return await mockRepository.getTransactions();
    },

    // User Management
    async getUsers() {
        if (!isInitialized) await this.initialize();
        return await mockRepository.getUsers();
    },

    async createUser(userData) {
        if (!isInitialized) await this.initialize();
        return await mockRepository.createUser(userData);
    },

    async updateUser(id, updates) {
        if (!isInitialized) await this.initialize();
        return await mockRepository.updateUser(id, updates);
    },

    async deleteUser(id) {
        if (!isInitialized) await this.initialize();
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

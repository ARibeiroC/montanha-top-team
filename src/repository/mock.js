// MOCK DATA REPOSITORY
// Simulating a backend database

// TABLE: USERS (Login)
export const mockUsers = [
    { id: 'admin', name: 'Administrador', email: 'admin@montanha.com', role: 'admin', accessLevel: 4, branch: 'Montanha Top Team', password: 'admin' },
    { id: 'teacher', name: 'Professor Mestre', email: 'professor@montanha.com', role: 'teacher', accessLevel: 1, branch: 'Montanha Top Team', password: '123' },
    { id: 'prof-test', name: 'Professor Teste', email: 'prof@montanha.com', role: 'teacher', accessLevel: 1, branch: 'Montanha Top Team', password: '123' },
    { id: 'guardian', name: 'Responsável Silva', email: 'responsavel@montanha.com', role: 'guardian', accessLevel: 0, branch: 'Montanha Top Team', password: '123' },
    { id: 'ceo-filial', name: 'CEO Filial', email: 'ceo.filial@montanha.com', role: 'ceo-filial', accessLevel: 2, branch: 'Montanha Top Team - Wagner', password: '123' },
    { id: 'ceo-matriz', name: 'CEO Matriz', email: 'ceo.matriz@montanha.com', role: 'ceo-matriz', accessLevel: 3, branch: 'Montanha Top Team', password: '123' },
    { id: 'prof-marcos', name: 'Professor Marcos', email: 'marcos@montanha.com', role: 'teacher', accessLevel: 1, branch: 'Montanha Top Team - Marcos', password: '123' }
];

// TABLE: STUDENTS
export const mockStudents = [
    // MTT (Original)
    { id: 1, name: "Carlos Silva", email: "carlos@example.com", belt: "Branca", stripes: 2, active: 1, branch: 'Montanha Top Team', professorName: '', profilePic: null, height: 1.75, weight: 80.5, birthDate: '1995-05-20', cpf: '123.456.789-00', rg: '12.345.678-9', address: 'Rua das Flores, 123', phone: '11988887777', emergencyContact: 'Maria Silva (11) 98888-1111', registrationDate: '2023-01-15' },
    { id: 2, name: "Ana Souza", email: "ana@example.com", belt: "Azul", stripes: 0, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2023-02-10' },
    { id: 3, name: "Marcos Oliveira", email: "marcos@example.com", belt: "Roxa", stripes: 3, active: 0, branch: 'Montanha Top Team', professorName: '', registrationDate: '2022-11-05' },
    { id: 4, name: "Juliana Santos", email: "juliana@example.com", belt: "Branca", stripes: 4, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2023-06-20' },
    { id: 5, name: "Roberto Almeida", email: "roberto@example.com", belt: "Marrom", stripes: 1, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2021-08-15' },
    { id: 6, name: "Fernanda Lima", email: "fernanda@example.com", belt: "Preta", stripes: 0, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2020-03-10' },
    { id: 7, name: "Ricardo Pereira", email: "ricardo@example.com", belt: "Azul", stripes: 2, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2023-04-01' },
    { id: 8, name: "Patrícia Costa", email: "patricia@example.com", belt: "Roxa", stripes: 1, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2022-09-12' },
    { id: 9, name: "Lucas Martins", email: "lucas@example.com", belt: "Branca", stripes: 0, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2024-01-05' },
    { id: 10, name: "Beatriz Rocha", email: "beatriz@example.com", belt: "Marrom", stripes: 2, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2021-12-01' },
    { id: 11, name: "Gabriel Ferreira", email: "gabriel@example.com", belt: "Branca", stripes: 3, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2023-07-22' },
    { id: 12, name: "Larissa Mendes", email: "larissa@example.com", belt: "Azul", stripes: 4, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2023-03-15' },
    // New MTT
    { id: 13, name: "Felipe Costa", email: "felipe@example.com", belt: "Branca", stripes: 1, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2024-02-01' },
    { id: 14, name: "Mariana Dias", email: "mariana@example.com", belt: "Branca", stripes: 0, active: 1, branch: 'Montanha Top Team', professorName: '', registrationDate: '2024-02-15' },
    // Wagner
    { id: 101, name: "Pedro Wagner Aluno", email: "pedro.w@example.com", belt: "Branca", stripes: 1, active: 1, branch: 'Montanha Top Team - Wagner', professorName: 'Wagner', emergencyContact: 'Tia do Pedro (11) 97777-2222', registrationDate: '2023-11-10' },
    { id: 102, name: "Sônia Dias", email: "sonia@example.com", belt: "Branca", stripes: 2, active: 1, branch: 'Montanha Top Team - Wagner', professorName: 'Wagner', registrationDate: '2023-11-15' },
    { id: 103, name: "Tiago Wagner", email: "tiago.w@example.com", belt: "Azul", stripes: 0, active: 1, branch: 'Montanha Top Team - Wagner', professorName: 'Wagner', registrationDate: '2024-01-10' },
    { id: 104, name: "Julia Wagner", email: "julia.w@example.com", belt: "Branca", stripes: 3, active: 1, branch: 'Montanha Top Team - Wagner', professorName: 'Wagner', registrationDate: '2024-01-20' },
    // Marcos
    { id: 201, name: "Aluno Marcos 1", email: "am1@example.com", belt: "Branca", stripes: 0, active: 1, branch: 'Montanha Top Team - Marcos', professorName: 'Marcos', registrationDate: '2024-01-05' },
    { id: 202, name: "Aluno Marcos 2", email: "am2@example.com", belt: "Branca", stripes: 1, active: 1, branch: 'Montanha Top Team - Marcos', professorName: 'Marcos', registrationDate: '2024-01-12' },
    { id: 203, name: "Aluno Marcos 3", email: "am3@example.com", belt: "Azul", stripes: 0, active: 1, branch: 'Montanha Top Team - Marcos', professorName: 'Marcos', registrationDate: '2023-12-01' }
];

// TABLE: GUARDIANS
export const mockGuardians = [
    { id: 1, studentId: 1, name: "João Silva", relationship: "Pai", phone: "11999998888", email: "joao.silva@email.com", cpf: "111.222.333-44" },
    { id: 2, studentId: 101, name: "Maria Wagner", relationship: "Mãe", phone: "11977776666", email: "maria.w@email.com", cpf: "555.666.777-88" },
    { id: 3, studentId: 3, name: "Pedro Oliveira", relationship: "Pai", phone: "11911112222", email: "pedro.oli@email.com", cpf: "123.123.123-12" },
    { id: 4, studentId: 201, name: "Mãe do Marcos 1", relationship: "Mãe", phone: "11922223333", email: "mae.m1@email.com", cpf: "234.234.234-23" },
    { id: 5, studentId: 202, name: "Pai do Marcos 2", relationship: "Pai", phone: "11933334444", email: "pai.m2@email.com", cpf: "345.345.345-34" },
    { id: 6, studentId: 103, name: "Tia do Tiago", relationship: "Tia", phone: "11944445555", email: "tia.t@email.com", cpf: "456.456.456-45" },
    { id: 7, studentId: 13, name: "Avô do Felipe", relationship: "Avô", phone: "11955556666", email: "avo.f@email.com", cpf: "567.567.567-56" },
    { id: 8, studentId: 14, name: "Irmã da Mariana", relationship: "Irmã", phone: "11966667777", email: "irma.m@email.com", cpf: "678.678.678-67" },
    { id: 9, studentId: 104, name: "Pai da Julia", relationship: "Pai", phone: "11977778888", email: "pai.j@email.com", cpf: "789.789.789-78" },
    { id: 10, studentId: 203, name: "Mãe do Marcos 3", relationship: "Mãe", phone: "11988889999", email: "mae.m3@email.com", cpf: "890.890.890-89" }
];

// TABLE: ATTENDANCE
export const mockAttendance = [
    { id: 1, studentId: 1, date: "2023-10-01", time: "19:00" },
    { id: 2, studentId: 1, date: "2023-10-03", time: "19:00" },
    { id: 3, studentId: 1, date: "2023-10-05", time: "19:00" },
    { id: 4, studentId: 2, date: "2023-10-01", time: "19:00" },
    { id: 5, studentId: 2, date: "2023-10-03", time: "19:00" },
    { id: 6, studentId: 101, date: "2023-10-02", time: "18:00" },
    { id: 7, studentId: 101, date: "2023-10-04", time: "18:00" },
    { id: 8, studentId: 201, date: "2024-01-10", time: "20:00" },
    { id: 9, studentId: 201, date: "2024-01-12", time: "20:00" },
    { id: 10, studentId: 3, date: "2023-10-01", time: "19:00" },
    { id: 11, studentId: 4, date: "2023-10-01", time: "19:00" },
    { id: 12, studentId: 5, date: "2023-10-03", time: "19:00" },
    { id: 13, studentId: 13, date: "2024-02-05", time: "19:00" },
    { id: 14, studentId: 14, date: "2024-02-16", time: "19:00" },
    { id: 15, studentId: 103, date: "2024-01-11", time: "18:00" }
];

// TABLE: EVENTS (Graduation/Competition)
export const mockStudentEvents = [
    { id: 1, studentId: 1, name: "Campeonato Estadual 2023", date: "2023-10-15", rank: "2º Lugar" },
    { id: 2, studentId: 3, name: "Seminário Internacional", date: "2023-09-20", rank: "Participação" },
    { id: 3, studentId: 5, name: "Copa do Mundo", date: "2023-05-10", rank: "1º Lugar" },
    { id: 4, studentId: 2, name: "Campeonato Interno", date: "2023-11-10", rank: "3º Lugar" },
    { id: 5, studentId: 101, name: "Festival Kids", date: "2023-12-05", rank: "Medalha de Ouro" },
    { id: 6, studentId: 4, name: "Open de Verão", date: "2024-01-20", rank: "Participação" },
    { id: 7, studentId: 201, name: "Torneio Iniciante", date: "2024-02-10", rank: "1º Lugar" },
    { id: 8, studentId: 6, name: "Seminário Técnico", date: "2023-08-15", rank: "Certificado" },
    { id: 9, studentId: 7, name: "Copa da Amizade", date: "2023-09-01", rank: "2º Lugar" },
    { id: 10, studentId: 102, name: "Desafio de Equipes", date: "2023-11-20", rank: "Campeão" }
];

// TABLE: TRANSACTIONS (Financeiro)
export const mockTransactions = [
    { id: 1, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-05T03:00:00.000Z", status: 'paid', paymentMethod: 'pix', description: 'Mensalidade dezembro', branch: 'Montanha Top Team', studentId: 1 },
    { id: 2, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-10T03:00:00.000Z", status: 'pending', paymentMethod: 'card', description: 'Mensalidade dezembro', branch: 'Montanha Top Team - Wagner', studentId: 101 },
    { id: 3, type: 'income', category: 'Matrícula', amount: 150, date: "2025-11-25T03:00:00.000Z", status: 'paid', paymentMethod: 'cash', description: 'Taxa de matrícula', branch: 'Montanha Top Team - Marcos', studentId: 3 },
    { id: 4, type: 'income', category: 'Uniforme', amount: 200, date: "2025-12-02T03:00:00.000Z", status: 'paid', paymentMethod: 'transfer', description: 'Compra de uniforme', branch: 'Montanha Top Team' },
    { id: 5, type: 'income', category: 'Evento', amount: 300, date: "2025-12-12T03:00:00.000Z", status: 'pending', paymentMethod: 'pix', description: 'Inscrição em campeonato', branch: 'Montanha Top Team - Marcos', studentId: 4 },
    { id: 6, type: 'expense', category: 'Manutenção', amount: 120, date: "2025-12-03T03:00:00.000Z", status: 'paid', paymentMethod: 'transfer', description: 'Troca de lâmpadas', branch: 'Montanha Top Team' },
    { id: 7, type: 'expense', category: 'Aluguel', amount: 1800, date: "2025-12-01T03:00:00.000Z", status: 'paid', paymentMethod: 'transfer', description: 'Aluguel do espaço', branch: 'Montanha Top Team' },
    { id: 8, type: 'expense', category: 'Limpeza', amount: 200, date: "2025-12-08T03:00:00.000Z", status: 'paid', paymentMethod: 'cash', description: 'Serviço de limpeza mensal', branch: 'Montanha Top Team - Wagner' },
    { id: 9, type: 'expense', category: 'Marketing', amount: 350, date: "2025-11-20T03:00:00.000Z", status: 'paid', paymentMethod: 'card', description: 'Campanha redes sociais', branch: 'Montanha Top Team - Marcos' },
    { id: 10, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-15T03:00:00.000Z", status: 'pending', paymentMethod: 'pix', description: 'Mensalidade dezembro', branch: 'Montanha Top Team - Wagner', studentId: 102 },
    { id: 11, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-18T03:00:00.000Z", status: 'paid', paymentMethod: 'card', description: 'Mensalidade dezembro', branch: 'Montanha Top Team', studentId: 6 },
    { id: 12, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-01T03:00:00.000Z", status: 'pending', paymentMethod: 'cash', description: 'Mensalidade dezembro', branch: 'Montanha Top Team - Marcos', studentId: 7 },
    { id: 13, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-10-30T03:00:00.000Z", status: 'pending', paymentMethod: 'pix', description: 'Mensalidade setembro', branch: 'Montanha Top Team', studentId: 8 },
    { id: 14, type: 'expense', category: 'Equipamentos', amount: 950, date: "2025-09-15T03:00:00.000Z", status: 'paid', paymentMethod: 'transfer', description: 'Compra de tatames', branch: 'Montanha Top Team' },
    { id: 15, type: 'income', category: 'Mensalidade', amount: 250, date: new Date().toISOString(), status: 'paid', paymentMethod: 'pix', description: 'Mensalidade atual', branch: 'Montanha Top Team', studentId: 9 },
    { id: 16, type: 'expense', category: 'Contas', amount: 420, date: new Date().toISOString(), status: 'paid', paymentMethod: 'transfer', description: 'Água e luz', branch: 'Montanha Top Team - Wagner' },
    { id: 17, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-20T03:00:00.000Z", status: 'paid', paymentMethod: 'pix', description: 'Mensalidade dezembro', branch: 'Montanha Top Team - Marcos', studentId: 201 },
    { id: 18, type: 'income', category: 'Mensalidade', amount: 250, date: "2025-12-22T03:00:00.000Z", status: 'pending', paymentMethod: 'card', description: 'Mensalidade dezembro', branch: 'Montanha Top Team - Marcos', studentId: 202 },
    { id: 19, type: 'expense', category: 'Internet', amount: 150, date: "2025-12-10T03:00:00.000Z", status: 'paid', paymentMethod: 'pix', description: 'Conta de internet', branch: 'Montanha Top Team' },
    { id: 20, type: 'expense', category: 'Confraternização', amount: 500, date: "2025-12-23T03:00:00.000Z", status: 'paid', paymentMethod: 'cash', description: 'Festa de final de ano', branch: 'Montanha Top Team' },
    { id: 21, type: 'income', category: 'Seminário', amount: 1000, date: "2025-12-15T03:00:00.000Z", status: 'paid', paymentMethod: 'transfer', description: 'Seminário Técnico', branch: 'Montanha Top Team' },
    { id: 22, type: 'income', category: 'Mensalidade', amount: 250, date: "2026-01-04T03:00:00.000Z", status: 'paid', paymentMethod: 'pix', description: 'Mensalidade Janeiro 2026', branch: 'Montanha Top Team', studentId: 1 },
    { id: 23, type: 'expense', category: 'Aluguel', amount: 1800, date: "2026-01-05T03:00:00.000Z", status: 'pending', paymentMethod: 'transfer', description: 'Aluguel Janeiro 2026', branch: 'Montanha Top Team' }
];

// TABLE: PROFESSOR ATTENDANCE & EVENTS (Gestão de Professores)
export const mockProfessorEvents = [
    { id: 1, userId: 'teacher', type: 'absence', date: '2025-12-10', reason: 'Doença', approved: true },
    { id: 2, userId: 'teacher', type: 'delay', date: '2025-12-15', minutes: 15, reason: 'Trânsito', approved: true },
    { id: 3, userId: 'prof-marcos', type: 'substitution', date: '2025-12-20', originalTeacher: 'prof-marcos', substitute: 'teacher', reason: 'Viagem', approved: false },
];

// TABLE: CERTIFICATE_CONFIG
export const mockCertificateConfig = {
    branch: 'global',
    city: 'SÃO PAULO',
    date: new Date().toISOString().split('T')[0],
    instructor1: {
        name: 'GUILHERME NASCIMENTO',
        role: 'RESPONSÁVEL TÉCNICO',
        details1: 'FAIXA PRETA 3º GRAU - ÁRBITRO PROFISSIONAL',
        details2: 'FPJJ: 39633',
        details3: 'CBJJ / IBJJF: 84780'
    },
    instructor2: {
        name: 'ALDERI HENRIQUE DASILVA',
        role: 'LÍDER E FUNDADOR DA EQUIPE MONTANHA TOP TEAM',
        details1: 'FAIXA PRETA',
        details2: 'FPJJ: 57789',
        details3: 'CBJJ / IBJJF: 407945'
    }
};

// Repository Functions
export const mockRepository = {
    getUsers: async () => [...mockUsers],
    getStudents: async () => {
        return mockStudents.map(student => {
            const guardians = mockGuardians.filter(g => g.studentId === student.id);
            const attendance = mockAttendance.filter(a => a.studentId === student.id);
            const events = mockStudentEvents.filter(e => e.studentId === student.id);
            const financial = mockTransactions.filter(t => t.studentId === student.id);
            
            // Logica de status financeiro simplificada
            const lastPayment = financial.filter(f => f.type === 'income').sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            const financialStatus = lastPayment ? 'Em dia' : 'Pendente';

            return {
                ...student,
                guardians,
                attendance,
                events,
                financialStatus
            };
        });
    },
    getTransactions: async () => [...mockTransactions],
    getCertificateConfig: async () => ({ ...mockCertificateConfig }),
    getProfessorEvents: async () => [...mockProfessorEvents],

    // User Management
    createUser: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const newId = userData.id || `user-${Date.now()}`;
        if (mockUsers.some(u => u.email === userData.email)) throw new Error("Email já cadastrado.");
        const newUser = { ...userData, id: newId };
        mockUsers.push(newUser);
        return newUser;
    },
    
    updateUser: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const index = mockUsers.findIndex(u => u.id === id);
        if (index === -1) throw new Error("Usuário não encontrado.");
        mockUsers[index] = { ...mockUsers[index], ...updates };
        return mockUsers[index];
    },
    
    deleteUser: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) mockUsers.splice(index, 1);
        return true;
    },

    // Professor Management
    addProfessorEvent: async (eventData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newEvent = { ...eventData, id: Date.now() };
        mockProfessorEvents.push(newEvent);
        return newEvent;
    },
    
    updateProfessorEvent: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockProfessorEvents.findIndex(e => e.id === id);
        if (index === -1) throw new Error("Evento não encontrado");
        mockProfessorEvents[index] = { ...mockProfessorEvents[index], ...updates };
        return mockProfessorEvents[index];
    },

    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
        
        // Check special mock users
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
            // Remove password before returning
            // eslint-disable-next-line no-unused-vars
            const { password: _, ...userWithoutPass } = user;
            return userWithoutPass;
        }

        // Check students
        const student = mockStudents.find(s => s.email === email);
        if (student) {
             // For students, we accept any password in mock or match specific logic
            const studentUser = { ...student, role: 'student', accessLevel: 0 };
            return studentUser;
        }

        throw new Error("Credenciais inválidas (Mock)");
    },

    createStudent: async (student) => {
        if (!student) throw new Error("Dados inválidos para criação de aluno.");
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newId = Math.max(...mockStudents.map(s => s.id), 0) + 1;
        
        // Split data into tables
        // eslint-disable-next-line no-unused-vars
        const { attendance = [], events = [], guardian = null, ...studentData } = student;
        
        // Insert into Students
        const newStudent = { ...studentData, id: newId, active: true, registrationDate: new Date().toISOString().split('T')[0] };
        mockStudents.push(newStudent);
        
        // Insert into Guardians (if provided)
        if (guardian) {
            mockGuardians.push({ ...guardian, id: Math.max(...mockGuardians.map(g => g.id), 0) + 1, studentId: newId });
        }
        
        // Return "joined" object for frontend
        return { ...newStudent, attendance, events, guardian };
    }
};

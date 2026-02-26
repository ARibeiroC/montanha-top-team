import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { unifiedService } from "../services/unifiedService";

export const SchoolContext = createContext()

// Hook personalizado para facilitar o uso do contexto
export const useSchool = () => {
    const context = useContext(SchoolContext);
    if (!context) {
        throw new Error("useSchool deve ser usado dentro de um SchoolContextProvider");
    }
    return context;
};

export const SchoolContextProvider = ({children}) => {
    const [students, setStudents] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                await unifiedService.initialize();
                const [studentsData, transactionsData] = await Promise.all([
                    unifiedService.getStudents(),
                    unifiedService.getTransactions()
                ]);

                // Validate data types
                const validStudents = Array.isArray(studentsData) ? studentsData : [];
                const validTransactions = Array.isArray(transactionsData) ? transactionsData : [];

                const studentsWithDefaults = validStudents.map(s => ({
                    branch: 'Montanha Top Team',
                    professorName: '',
                    ...s
                }));
                
                setStudents(studentsWithDefaults);
                setTransactions(validTransactions);
            } catch (err) {
                console.error("Erro ao carregar dados escolares:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Gestão de Alunos (Atualizar dados, graduação)
    const updateStudent = (id, updatedData) => {
        setStudents(prev => prev.map(student => 
            student.id === id ? { ...student, ...updatedData } : student
        ));
    };

    // Adicionar Novo Aluno
    const addStudent = async (newStudent) => {
        try {
            const sessionStr = localStorage.getItem("session");
            let token = null;
            if (sessionStr) {
                 try {
                     token = JSON.parse(sessionStr).token;
                 } catch(e) { console.debug('Invalid session JSON', e) }
            }

            const created = await unifiedService.createStudent(newStudent, token);

            // Automatically create a user for the student if email exists
            if (newStudent.email) {
                try {
                    const defaultPassword = '123'; // Default password for new students
                    const userPayload = {
                        id: created.id.toString(), // Use student ID as User ID or link them
                        name: newStudent.name,
                        email: newStudent.email,
                        role: 'student',
                        accessLevel: 0,
                        branch: newStudent.branch ?? 'Montanha Top Team',
                        password: defaultPassword
                    };
                    
                    // Call service to create user (assuming unifiedService exposes it or we use mock directly if offline)
                    // unifiedService.createUser might need to be exposed or added
                    // For now, let's assume we can call it if it exists, or fallback to mock
                    if (unifiedService.createUser) {
                        await unifiedService.createUser(userPayload, token);
                        console.log(`Usuário criado automaticamente para o aluno: ${newStudent.name}`);
                    }
                } catch (userError) {
                    console.error("Erro ao criar usuário automático para o aluno:", userError);
                    // Don't block student creation if user creation fails, but log it
                }
            }

            const student = {
                attendance: [],
                events: [],
                active: true,
                stripes: 0,
                belt: 'Branca',
                branch: newStudent.branch ?? 'Montanha Top Team',
                professorName: newStudent.professorName ?? '',
                ...created
            };
            setStudents(prev => [...prev, student]);
            return student;
        } catch (e) {
            console.error("Erro ao criar estudante:", e);
            throw e;
        }
    };

    // Gestão de Presença
    const registerAttendance = (studentId) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('pt-BR');
        const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        setStudents(prev => prev.map(student => {
            if (student.id === studentId) {
                // Check if already attended today
                const alreadyAttended = student.attendance.some(record => record.date === dateStr);
                if (alreadyAttended) {
                    return student; // Do nothing if already attended
                }

                const attendanceRecord = {
                    date: dateStr,
                    time: timeStr
                };

                return { 
                    ...student, 
                    attendance: [attendanceRecord, ...student.attendance] 
                };
            }
            return student;
        }));
    };

    // Gestão de Eventos
    const addEvent = (studentId, eventName) => {
        setStudents(prev => prev.map(student => 
            student.id === studentId 
                ? { ...student, events: [...student.events, eventName] } 
                : student
        ));
    };

    // Configuração de Certificados (Estado Global)
    const [certificateConfig, setCertificateConfig] = useState({
        city: 'SÃO PAULO',
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        thirdInstructorEnabled: false,
        templateMode: true,
        templateCategory: 'adulto',
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
        },
        instructor3: {
            name: '',
            role: '',
            details1: '',
            details2: '',
            details3: ''
        }
    });

    const updateCertificateConfig = (field, value, nestedObj = null) => {
        if (nestedObj) {
            setCertificateConfig(prev => ({
                ...prev,
                [nestedObj]: { ...prev[nestedObj], [field]: value }
            }));
        } else {
            setCertificateConfig(prev => ({ ...prev, [field]: value }));
        }
    };

    const getStudentById = (id) => students.find(s => s.id === id);

    const addTransaction = (tx) => {
        const id = Math.max(...transactions.map(t => t.id), 0) + 1;
        const baseBranch = tx.branch ?? (tx.studentId ? (getStudentById(tx.studentId)?.branch ?? 'Montanha Top Team') : 'Montanha Top Team');
        const item = {
            id,
            type: tx.type,
            category: tx.category,
            amount: Number(tx.amount),
            date: tx.date ?? new Date().toISOString(),
            status: tx.status ?? 'pending',
            paymentMethod: tx.paymentMethod ?? 'cash',
            description: tx.description ?? '',
            branch: baseBranch,
            studentId: tx.studentId ?? null
        };
        setTransactions(prev => [item, ...prev]);
        return item;
    };
    const updateTransaction = (id, updates) => {
        let updated;
        setTransactions(prev => prev.map(t => {
            if (t.id === id) {
                updated = { ...t, ...updates };
                return updated;
            }
            return t;
        }));
        return updated;
    };
    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };
    const getSummary = ({ from, to, branch } = {}) => {
        const filtered = transactions.filter(t => {
            const tDate = new Date(t.date).toISOString().split('T')[0];
            const inFrom = from ? tDate >= from : true;
            const inTo = to ? tDate <= to : true;
            const inBranch = branch ? t.branch === branch : true;
            return inFrom && inTo && inBranch;
        });
        const income = filtered.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const expense = filtered.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        const balance = income - expense;
        return { income, expense, balance };
    };
    const getOverdue = ({ branch } = {}) => {
        const items = transactions.filter(t => {
            const inBranch = branch ? t.branch === branch : true;
            const isIncome = t.type === 'income';
            const isPending = t.status === 'pending';
            const isPast = new Date(t.date).getTime() < new Date().setHours(0, 0, 0, 0);
            return inBranch && isIncome && isPending && isPast;
        });
        return { count: items.length, items };
    };

    return (
        <SchoolContext.Provider value={{ 
            students, 
            updateStudent, 
            addStudent,
            registerAttendance, 
            addEvent,
            certificateConfig,
            updateCertificateConfig,
            getStudentById,
            transactions,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            getSummary,
            getOverdue,
            loading
        }}>
            {children}
        </SchoolContext.Provider>
    )
}

SchoolContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

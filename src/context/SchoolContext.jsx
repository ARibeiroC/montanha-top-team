import { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';

export const SchoolContext = createContext()

// Hook personalizado para facilitar o uso do contexto
export const useSchool = () => {
    const context = useContext(SchoolContext);
    if (!context) {
        throw new Error("useSchool deve ser usado dentro de um SchoolContextProvider");
    }
    return context;
};

const initialStudents = [
    { 
        id: 1, 
        name: "Carlos Silva", 
        email: "carlos@example.com",
        belt: "Branca", 
        stripes: 2, 
        attendance: [
            { date: "2023-10-01", time: "19:00" },
            { date: "2023-10-03", time: "19:00" }
        ],
        events: ["Campeonato Estadual 2023"],
        active: true
    },
    { 
        id: 2, 
        name: "Ana Souza", 
        email: "ana@example.com",
        belt: "Azul", 
        stripes: 0, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 3, 
        name: "Marcos Oliveira", 
        email: "marcos@example.com",
        belt: "Roxa", 
        stripes: 3, 
        attendance: [], 
        events: ["Seminário Internacional"],
        active: false
    },
    { 
        id: 4, 
        name: "Juliana Santos", 
        email: "juliana@example.com",
        belt: "Branca", 
        stripes: 4, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 5, 
        name: "Roberto Almeida", 
        email: "roberto@example.com",
        belt: "Marrom", 
        stripes: 1, 
        attendance: [], 
        events: ["Copa do Mundo"],
        active: true
    },
    { 
        id: 6, 
        name: "Fernanda Lima", 
        email: "fernanda@example.com",
        belt: "Preta", 
        stripes: 0, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 7, 
        name: "Ricardo Pereira", 
        email: "ricardo@example.com",
        belt: "Azul", 
        stripes: 2, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 8, 
        name: "Patrícia Costa", 
        email: "patricia@example.com",
        belt: "Roxa", 
        stripes: 1, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 9, 
        name: "Lucas Martins", 
        email: "lucas@example.com",
        belt: "Branca", 
        stripes: 0, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 10, 
        name: "Beatriz Rocha", 
        email: "beatriz@example.com",
        belt: "Marrom", 
        stripes: 2, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 11, 
        name: "Gabriel Ferreira", 
        email: "gabriel@example.com",
        belt: "Branca", 
        stripes: 3, 
        attendance: [], 
        events: [],
        active: true
    },
    { 
        id: 12, 
        name: "Larissa Mendes", 
        email: "larissa@example.com",
        belt: "Azul", 
        stripes: 4, 
        attendance: [], 
        events: [],
        active: true
    }
];

export const SchoolContextProvider = ({children}) => {
    const [students, setStudents] = useState(initialStudents);

    // Gestão de Alunos (Atualizar dados, graduação)
    const updateStudent = (id, updatedData) => {
        setStudents(prev => prev.map(student => 
            student.id === id ? { ...student, ...updatedData } : student
        ));
    };

    // Adicionar Novo Aluno
    const addStudent = (newStudent) => {
        const id = Math.max(...students.map(s => s.id), 0) + 1;
        const student = {
            id,
            attendance: [],
            events: [],
            active: true,
            stripes: 0,
            belt: 'Branca',
            ...newStudent
        };
        setStudents(prev => [...prev, student]);
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

    return (
        <SchoolContext.Provider value={{ 
            students, 
            updateStudent, 
            addStudent,
            registerAttendance, 
            addEvent,
            certificateConfig,
            updateCertificateConfig,
            getStudentById 
        }}>
            {children}
        </SchoolContext.Provider>
    )
}

SchoolContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

import { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import './Attendance.css';

export function Attendance() {
    const { students, registerAttendance } = useSchool();
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) && student.active
    );

    const handleCheckIn = (id, name) => {
        registerAttendance(id);
        setMessage(`Presença confirmada para: ${name}`);
        setTimeout(() => setMessage(''), 3000);
    };

    const isPresentToday = (student) => {
        const today = new Date().toLocaleDateString('pt-BR');
        return student.attendance.some(record => record.date === today);
    };

    return (
        <div className="attendance-container">
            <h2>Gestão de Presença</h2>
            
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Buscar aluno por nome..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {message && <div className="success-message">{message}</div>}

            <div className="students-list">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => {
                        const present = isPresentToday(student);
                        return (
                            <div key={student.id} className="student-card-mini">
                                <div className="info">
                                    <strong>{student.name}</strong>
                                    <span>{student.belt} - {student.stripes}º Grau</span>
                                </div>
                                <button 
                                    onClick={() => !present && handleCheckIn(student.id, student.name)}
                                    className={`checkin-btn ${present ? 'disabled' : ''}`}
                                    disabled={present}
                                >
                                    {present ? 'Presença Confirmada' : 'Confirmar Presença'}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>Nenhum aluno encontrado.</p>
                )}
            </div>
        </div>
    );
}

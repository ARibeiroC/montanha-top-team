import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSchool } from '@/context/SchoolContext';
import { FaUser, FaHistory, FaCalendarAlt, FaMoneyBillWave, FaTrophy, FaTimes } from 'react-icons/fa';
import './StudentsManager.css';

export function StudentsManager() {
    const { students, updateStudent, addStudent } = useSchool();
    const { user } = useAuth();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    
    // View Details State
    const [viewDetailsId, setViewDetailsId] = useState(null);
    
    // Add Student State
    const [isAdding, setIsAdding] = useState(false);
    const [newStudentForm, setNewStudentForm] = useState({
        name: '',
        belt: 'Branca',
        stripes: 0,
        active: true
    });

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewStudentForm(prev => ({ ...prev, [name]: value }));
    };

    const submitNewStudent = (e) => {
        e.preventDefault();
        if (!newStudentForm.name) return; // Simple validation
        addStudent(newStudentForm);
        setIsAdding(false);
        setNewStudentForm({ name: '', belt: 'Branca', stripes: 0, active: true });
    };

    const startEdit = (student) => {
        setEditingId(student.id);
        setEditForm({ ...student });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = (e) => {
        e.preventDefault();
        updateStudent(editingId, editForm);
        setEditingId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const visibleStudents = (user?.accessLevel === 2 && user?.branch)
        ? students.filter(s => (s.branch ?? 'Montanha Top Team') === user.branch)
        : students;

    const selectedStudent = students.find(s => s.id === viewDetailsId);

    return (
        <div className="students-manager-container">
            {/* Modal de Detalhes */}
            {viewDetailsId && selectedStudent && (
                <div className="modal-overlay" onClick={() => setViewDetailsId(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setViewDetailsId(null)}><FaTimes /></button>
                        
                        <div className="student-profile-header">
                            <div className="student-avatar-large">
                                {selectedStudent.name.charAt(0)}
                            </div>
                            <div className="student-info-main">
                                <h2>{selectedStudent.name}</h2>
                                <p className="subtitle">{selectedStudent.email || 'Email não cadastrado'}</p>
                                <span className={`status-badge ${selectedStudent.active ? 'active' : 'inactive'}`}>
                                    {selectedStudent.active ? 'Ativo' : 'Inativo'}
                                </span>
                            </div>
                        </div>

                        <div className="student-details-grid">
                            <div className="detail-card">
                                <h3><FaUser /> Dados Pessoais</h3>
                                <p><strong>Data de Nascimento:</strong> {selectedStudent.birthDate || '-'}</p>
                                <p><strong>CPF:</strong> {selectedStudent.cpf || '-'}</p>
                                <p><strong>Telefone:</strong> {selectedStudent.phone || '-'}</p>
                                <p><strong>Responsável:</strong> {selectedStudent.guardianName || '-'}</p>
                            </div>

                            <div className="detail-card">
                                <h3><FaHistory /> Graduação</h3>
                                <p><strong>Faixa Atual:</strong> {selectedStudent.belt}</p>
                                <p><strong>Graus:</strong> {selectedStudent.stripes}</p>
                                <p><strong>Professor:</strong> {selectedStudent.professorName || '-'}</p>
                                <p><strong>Início:</strong> {selectedStudent.registrationDate || '-'}</p>
                            </div>

                            <div className="detail-card">
                                <h3><FaMoneyBillWave /> Financeiro</h3>
                                <p><strong>Status:</strong> <span className={selectedStudent.financialStatus === 'Em dia' ? 'text-success' : 'text-danger'}>{selectedStudent.financialStatus || 'Pendente'}</span></p>
                                {/* Futuro: Listar últimas mensalidades */}
                            </div>

                            <div className="detail-card full-width">
                                <h3><FaTrophy /> Histórico de Competições</h3>
                                {selectedStudent.events && selectedStudent.events.length > 0 ? (
                                    <ul className="events-list-detail">
                                        {selectedStudent.events.map((ev, idx) => (
                                            <li key={idx}>
                                                <strong>{ev.name || ev}</strong> - {ev.rank || ev.date || 'Participação'}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-data">Nenhuma competição registrada.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="header-controls">
                <h2>Gestão de Alunos e Graduação</h2>
                <button className="add-btn" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancelar' : '+ Novo Aluno'}
                </button>
            </div>

            {isAdding && (
                <div className="add-student-form">
                    <form onSubmit={submitNewStudent} className="form-inline">
                        <input 
                            name="name" 
                            value={newStudentForm.name} 
                            onChange={handleAddChange} 
                            placeholder="Nome Completo" 
                            className="edit-input"
                            required 
                        />
                        <select 
                            name="belt" 
                            value={newStudentForm.belt} 
                            onChange={handleAddChange}
                            className="edit-select"
                        >
                            <option value="Branca">Branca</option>
                            <option value="Azul">Azul</option>
                            <option value="Roxa">Roxa</option>
                            <option value="Marrom">Marrom</option>
                            <option value="Preta">Preta</option>
                        </select>
                        <input 
                            type="number" 
                            name="stripes" 
                            value={newStudentForm.stripes} 
                            onChange={handleAddChange} 
                            min="0" max="4" 
                            placeholder="Graus" 
                            className="edit-input-small"
                        />
                        <button type="submit" className="save-btn">Cadastrar</button>
                    </form>
                </div>
            )}
            
            {/* Visualização Mobile (Cards) */}
            <div className="mobile-view">
                {visibleStudents.map(student => (
                    <div key={student.id} className="student-card-mobile">
                        {editingId === student.id ? (
                            <div className="edit-form-mobile">
                                <input name="name" value={editForm.name} onChange={handleChange} className="edit-input" placeholder="Nome" />
                                <select name="belt" value={editForm.belt} onChange={handleChange} className="edit-select">
                                    <option value="Branca">Branca</option>
                                    <option value="Azul">Azul</option>
                                    <option value="Roxa">Roxa</option>
                                    <option value="Marrom">Marrom</option>
                                    <option value="Preta">Preta</option>
                                </select>
                                <input type="number" name="stripes" value={editForm.stripes} onChange={handleChange} min="0" max="4" className="edit-input" placeholder="Graus" />
                                <div className="actions">
                                    <button onClick={saveEdit} className="save-btn">Salvar</button>
                                    <button onClick={cancelEdit} className="cancel-btn">Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="header" onClick={() => setViewDetailsId(student.id)}>
                                    <h3>{student.name}</h3>
                                    <span className={`status-badge ${student.active ? 'active' : 'inactive'}`}>
                                        {student.active ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                                <div className="details">
                                    <span>{student.belt} - {student.stripes}º Grau</span>
                                </div>
                                <div className="actions">
                                    <button onClick={() => startEdit(student)} className="edit-btn">Editar</button>
                                    <button onClick={() => setViewDetailsId(student.id)} className="details-btn">Detalhes</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Visualização Desktop (Tabela) */}
            <table className="students-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Faixa</th>
                        <th>Graus</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleStudents.map(student => (
                        <tr key={student.id}>
                            {editingId === student.id ? (
                                <>
                                    <td>
                                        <input 
                                            name="name" 
                                            value={editForm.name} 
                                            onChange={handleChange} 
                                            className="edit-input"
                                        />
                                    </td>
                                    <td>
                                        <select 
                                            name="belt" 
                                            value={editForm.belt} 
                                            onChange={handleChange}
                                            className="edit-select"
                                        >
                                            <option value="Branca">Branca</option>
                                            <option value="Azul">Azul</option>
                                            <option value="Roxa">Roxa</option>
                                            <option value="Marrom">Marrom</option>
                                            <option value="Preta">Preta</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="stripes" 
                                            value={editForm.stripes} 
                                            onChange={handleChange} 
                                            min="0" max="4"
                                            className="edit-input-small"
                                        />
                                    </td>
                                    <td>
                                        <select 
                                            name="active" 
                                            value={editForm.active} 
                                            onChange={(e) => setEditForm({...editForm, active: e.target.value === 'true'})}
                                            className="edit-select"
                                        >
                                            <option value="true">Ativo</option>
                                            <option value="false">Inativo</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={saveEdit} className="save-btn">Salvar</button>
                                            <button onClick={cancelEdit} className="cancel-btn">Cancelar</button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td onClick={() => setViewDetailsId(student.id)} style={{cursor: 'pointer', fontWeight: 'bold'}}>{student.name}</td>
                                    <td>{student.belt}</td>
                                    <td>{student.stripes}</td>
                                    <td>
                                        <span className={`status-badge ${student.active ? 'active' : 'inactive'}`}>
                                            {student.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => startEdit(student)} className="edit-btn">
                                                Editar / Graduar
                                            </button>
                                            <button onClick={() => setViewDetailsId(student.id)} className="details-btn-icon" title="Ver Detalhes">
                                                <FaUser />
                                            </button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

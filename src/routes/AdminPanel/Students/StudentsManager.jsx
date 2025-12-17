import { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import './StudentsManager.css';

export function StudentsManager() {
    const { students, updateStudent, addStudent } = useSchool();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    
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

    return (
        <div className="students-manager-container">
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
                {students.map(student => (
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
                                <div className="header">
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
                    {students.map(student => (
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
                                    <td>{student.name}</td>
                                    <td>{student.belt}</td>
                                    <td>{student.stripes}</td>
                                    <td>
                                        <span className={`status-badge ${student.active ? 'active' : 'inactive'}`}>
                                            {student.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => startEdit(student)} className="edit-btn">
                                            Editar / Graduar
                                        </button>
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

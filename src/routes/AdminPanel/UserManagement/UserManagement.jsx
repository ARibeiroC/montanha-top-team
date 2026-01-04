import React, { useState, useEffect } from 'react';
import { unifiedService } from '../../../services/unifiedService';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import './UserManagement.css';

export function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // null for new, object for edit
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'teacher',
        accessLevel: 2,
        branch: '',
        password: ''
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await unifiedService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
            alert("Erro ao carregar usuários");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Auto-update accessLevel based on role
        if (name === 'role') {
            let level = 1;
            switch(value) {
                case 'ceo-matriz': 
                case 'admin': 
                    level = 3; 
                    break;
                case 'ceo-filial': // Assuming CEO Filial might have level 3 or 2 depending on requirements, let's keep them high
                    level = 3;
                    break;
                case 'teacher': 
                    level = 2; 
                    break;
                case 'student':
                case 'guardian': 
                    level = 1; 
                    break;
                default: level = 1;
            }
            setFormData(prev => ({ ...prev, role: value, accessLevel: level }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser) {
                await unifiedService.updateUser(currentUser.id, formData);
                alert("Usuário atualizado com sucesso!");
            } else {
                await unifiedService.createUser(formData);
                alert("Usuário criado com sucesso!");
            }
            setIsFormOpen(false);
            setCurrentUser(null);
            resetForm();
            loadUsers();
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            alert("Erro ao salvar usuário: " + error.message);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            accessLevel: user.accessLevel,
            branch: user.branch || '',
            password: user.password || '' // Note: Password handling in real apps should be more secure
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await unifiedService.deleteUser(id);
                loadUsers();
            } catch (error) {
                console.error("Erro ao excluir usuário:", error);
                alert("Erro ao excluir usuário");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            role: 'teacher',
            accessLevel: 1,
            branch: '',
            password: ''
        });
    };

    const openNewUserForm = () => {
        setCurrentUser(null);
        resetForm();
        setIsFormOpen(true);
    };

    return (
        <div className="user-management-container">
            <div className="um-header">
                <h2>Gestão de Usuários</h2>
                <button className="btn-add" onClick={openNewUserForm}>
                    <FaPlus /> Novo Usuário
                </button>
            </div>

            {isFormOpen && (
                <div className="um-form-overlay">
                    <div className="um-form-container">
                        <div className="um-form-header">
                            <h3>{currentUser ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                            <button className="btn-close" onClick={() => setIsFormOpen(false)}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Senha:</label>
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Função (Role):</label>
                                <select name="role" value={formData.role} onChange={handleInputChange}>
                                    <option value="teacher">Professor (Teacher)</option>
                                    <option value="ceo-filial">CEO Filial</option>
                                    <option value="ceo-matriz">CEO Matriz</option>
                                    <option value="admin">Administrador</option>
                                    <option value="guardian">Responsável</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nível de Acesso:</label>
                                <input type="number" name="accessLevel" value={formData.accessLevel} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Filial:</label>
                                <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Ex: Montanha Top Team" />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-save">Salvar</button>
                                <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="um-list">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Nível</th>
                                <th>Filial</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.accessLevel}</td>
                                    <td>{user.branch}</td>
                                    <td>
                                        <button className="btn-icon edit" onClick={() => handleEdit(user)}><FaEdit /></button>
                                        <button className="btn-icon delete" onClick={() => handleDelete(user.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

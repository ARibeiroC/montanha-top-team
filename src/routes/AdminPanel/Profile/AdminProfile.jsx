import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { unifiedService } from '@/services/unifiedService';
import './AdminProfile.css';
import { FaUserEdit, FaSave } from 'react-icons/fa';

export function AdminProfile() {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', // Optional: only if they want to change it
        currentPassword: '' // Usually required for changes, but keeping simple for now
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                profilePic: user.profilePic || '',
                role: user.role || 'admin',
                accessLevel: user.accessLevel || 3
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Auto-update accessLevel if role changes (optional logic, but good for consistency)
        if (name === 'role') {
            let level = 1;
            switch(value) {
                case 'ceo-matriz': 
                case 'admin': 
                case 'ceo-filial':
                    level = 3; 
                    break;
                case 'teacher': 
                    level = 2; 
                    break;
                default: level = 1;
            }
            setFormData(prev => ({ ...prev, role: value, accessLevel: level }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'O tamanho máximo da foto deve ser 2MB.' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profilePic: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Prepare update data
            const updateData = {
                name: formData.name,
                email: formData.email,
                profilePic: formData.profilePic
            };
            
            // Only allow role/accessLevel update if user is high privilege (e.g. >= 3 or 'ceo-matriz'/'admin')
            // And only if they are actually changed
            if (user.accessLevel >= 3 || user.role === 'ceo-matriz' || user.role === 'admin') {
                updateData.role = formData.role;
                updateData.accessLevel = parseInt(formData.accessLevel);
            }

            if (formData.password) {
                updateData.password = formData.password;
            }

            // Update in backend/mock
            await unifiedService.updateUser(user.id, updateData);

            // Update local session
            updateUser(updateData);

            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
            setFormData(prev => ({ ...prev, password: '' })); // Clear password field
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            setMessage({ type: 'error', text: 'Erro ao atualizar perfil: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-profile-container">
            <div className="profile-header">
                <h2><FaUserEdit /> Editar Perfil</h2>
            </div>
            
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="admin-profile-form">
                <div className="form-group">
                    <label>Foto de Perfil</label>
                    <div className="file-upload-container">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <FaUserEdit /> Escolher Foto
                        </label>
                        <input 
                            id="file-upload" 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        {formData.profilePic && (
                            <div className="preview-image">
                                <img src={formData.profilePic} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Nome Completo</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {(user.accessLevel >= 3 || user.role === 'ceo-matriz' || user.role === 'admin') && (
                    <div className="form-row">
                        <div className="form-group">
                            <label>Função (Role)</label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange}
                                className="role-select"
                            >
                                <option value="ceo-matriz">CEO Matriz</option>
                                <option value="admin">Administrador</option>
                                <option value="ceo-filial">CEO Filial</option>
                                <option value="teacher">Professor</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Nível de Acesso</label>
                            <input 
                                type="number" 
                                name="accessLevel" 
                                value={formData.accessLevel} 
                                readOnly // Auto-calculated based on role
                                className="read-only-input"
                            />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label>Nova Senha (opcional)</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Deixe em branco para manter a atual"
                    />
                </div>

                <div className="form-group read-only">
                    <label>Função</label>
                    <input type="text" value={user?.role || ''} disabled />
                </div>

                <div className="form-group read-only">
                    <label>Nível de Acesso</label>
                    <input type="text" value={user?.accessLevel || ''} disabled />
                </div>

                <button type="submit" className="btn-save" disabled={loading}>
                    <FaSave /> {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    );
}

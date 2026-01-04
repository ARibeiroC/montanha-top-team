import React, { useState, useEffect } from 'react';
import { unifiedService } from '../../../services/unifiedService';
import { FaPlus, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import './ProfessorManagement.css';

export function ProfessorManagement() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        type: 'absence', // absence, delay, substitution
        date: new Date().toISOString().split('T')[0],
        reason: '',
        minutes: 0,
        originalTeacher: '',
        substitute: '',
        approved: false
    });
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [eventsData, usersData] = await Promise.all([
                unifiedService.getProfessorEvents(),
                unifiedService.getUsers()
            ]);
            setEvents(eventsData);
            // Filter only teachers for selection
            setTeachers(usersData.filter(u => u.role === 'teacher' || u.role === 'admin' || u.role.includes('ceo'))); 
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await unifiedService.addProfessorEvent(formData);
            alert("Ocorrência registrada com sucesso!");
            setIsFormOpen(false);
            resetForm();
            loadData();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar ocorrência");
        }
    };

    const handleApprove = async (id, status) => {
        try {
            await unifiedService.updateProfessorEvent(id, { approved: status });
            loadData();
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            userId: '',
            type: 'absence',
            date: new Date().toISOString().split('T')[0],
            reason: '',
            minutes: 0,
            originalTeacher: '',
            substitute: '',
            approved: false
        });
    };

    const getTeacherName = (id) => {
        const teacher = teachers.find(t => t.id === id);
        return teacher ? teacher.name : id;
    };

    return (
        <div className="professor-management-container">
            <div className="pm-header">
                <h2>Gestão de Professores</h2>
                <button className="btn-add" onClick={() => setIsFormOpen(true)}>
                    <FaPlus /> Registrar Ocorrência
                </button>
            </div>

            {isFormOpen && (
                <div className="pm-form-overlay">
                    <div className="pm-form-container">
                        <div className="pm-form-header">
                            <h3>Nova Ocorrência</h3>
                            <button className="btn-close" onClick={() => setIsFormOpen(false)}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Professor:</label>
                                <select name="userId" value={formData.userId} onChange={handleInputChange} required>
                                    <option value="">Selecione...</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tipo:</label>
                                <select name="type" value={formData.type} onChange={handleInputChange}>
                                    <option value="absence">Falta</option>
                                    <option value="delay">Atraso</option>
                                    <option value="substitution">Substituição</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Data:</label>
                                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                            </div>
                            
                            {formData.type === 'delay' && (
                                <div className="form-group">
                                    <label>Minutos de Atraso:</label>
                                    <input type="number" name="minutes" value={formData.minutes} onChange={handleInputChange} />
                                </div>
                            )}

                            {formData.type === 'substitution' && (
                                <>
                                    <div className="form-group">
                                        <label>Professor Original:</label>
                                        <select name="originalTeacher" value={formData.originalTeacher} onChange={handleInputChange}>
                                            <option value="">Selecione...</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Substituto:</label>
                                        <select name="substitute" value={formData.substitute} onChange={handleInputChange}>
                                            <option value="">Selecione...</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Motivo/Observação:</label>
                                <textarea name="reason" value={formData.reason} onChange={handleInputChange} rows="3"></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-save">Salvar</button>
                                <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="pm-list">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Professor</th>
                                <th>Tipo</th>
                                <th>Detalhes</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event.id}>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{getTeacherName(event.userId)}</td>
                                    <td>
                                        <span className={`event-type ${event.type}`}>
                                            {event.type === 'absence' ? 'Falta' : 
                                             event.type === 'delay' ? 'Atraso' : 'Substituição'}
                                        </span>
                                    </td>
                                    <td>
                                        {event.type === 'delay' && `${event.minutes} min. `}
                                        {event.type === 'substitution' && `Sub: ${getTeacherName(event.substitute)}. `}
                                        {event.reason}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${event.approved ? 'approved' : 'pending'}`}>
                                            {event.approved ? 'Aprovado' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td>
                                        {!event.approved && (
                                            <button className="btn-icon approve" title="Aprovar/Justificar" onClick={() => handleApprove(event.id, true)}>
                                                <FaCheck />
                                            </button>
                                        )}
                                        {event.approved && (
                                            <button className="btn-icon reject" title="Rejeitar/Cancelar" onClick={() => handleApprove(event.id, false)}>
                                                <FaTimes />
                                            </button>
                                        )}
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

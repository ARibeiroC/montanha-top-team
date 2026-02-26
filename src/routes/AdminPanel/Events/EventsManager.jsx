import { useState, useEffect } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { useAuth } from '@/context/AuthContext';
import { FaCalendarAlt, FaPlus, FaUsers, FaTrophy, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './EventsManager.css';

export function EventsManager() {
    const { students, updateStudent, addEvent } = useSchool();
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list', 'create', 'manage'
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    // New Event Form
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        type: 'Championship', // Championship, Seminar, Internal
        description: ''
    });

    // Mock Events Data (Local state for now, ideally should be in SchoolContext or Backend)
    // In a real app, we would fetch this. For now, we simulate.
    useEffect(() => {
        // Simulating fetching existing events
        const mockInitialEvents = [
            { id: 1, name: 'Campeonato Estadual 2024', date: '2024-05-15', type: 'Championship', description: 'Campeonato principal do estado' },
            { id: 2, name: 'Seminário Técnico', date: '2024-06-20', type: 'Seminar', description: 'Seminário com Mestre Convidado' }
        ];
        setEvents(mockInitialEvents);
    }, []);

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const event = {
            id: Date.now(),
            ...newEvent
        };
        setEvents([...events, event]);
        setViewMode('list');
        setNewEvent({ name: '', date: '', type: 'Championship', description: '' });
    };

    const handleManageEvent = (event) => {
        setSelectedEvent(event);
        setViewMode('manage');
    };

    // Filter students for the management view
    const [searchTerm, setSearchTerm] = useState('');
    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) && s.active
    );

    const handleAddStudentToEvent = (student, rank = 'Participação') => {
        // Logic to add event to student history
        // We use the existing addEvent from SchoolContext which adds to student.events array
        // But addEvent currently just takes a string name. We might need to enhance it or format the string.
        
        // Format: "Event Name - Rank"
        const eventString = `${selectedEvent.name} - ${rank}`;
        
        // Check if already added to avoid duplicates (simple check)
        const alreadyHas = student.events && student.events.some(e => e.name && e.name.includes(selectedEvent.name));
        
        if (!alreadyHas) {
            // We need to construct the event object as expected by mockStudentEvents structure if possible, 
            // but addEvent context method simplifies it.
            // Let's assume SchoolContext addEvent handles it or we update student directly.
            
            // Actually, SchoolContext addEvent updates the local state.
            // Let's use a custom update here to be more precise with the object structure if needed.
            
            const newEventObj = {
                id: Date.now(),
                studentId: student.id,
                name: selectedEvent.name,
                date: selectedEvent.date,
                rank: rank
            };

            // We can't directly push to student.events in context without a proper method exposed.
            // existing addEvent: const addEvent = (studentId, eventName) => ...
            // It pushes eventName (string) or object? Let's check SchoolContext.
            // SchoolContext: events: [...student.events, eventName]
            // So it expects an object or string? mockStudentEvents has objects.
            // The addEvent function in SchoolContext (read previously) seemed to push whatever is passed.
            
            // Let's pass the full object.
            addEvent(student.id, newEventObj);
            alert(`Aluno ${student.name} adicionado ao evento!`);
        } else {
            alert('Aluno já registrado neste evento.');
        }
    };

    return (
        <div className="events-manager-container">
            <div className="events-header">
                <h2>Gestão de Eventos e Campeonatos</h2>
                {viewMode === 'list' && (
                    <button className="btn-primary" onClick={() => setViewMode('create')}>
                        <FaPlus /> Novo Evento
                    </button>
                )}
                {viewMode !== 'list' && (
                    <button className="btn-secondary" onClick={() => setViewMode('list')}>
                        Voltar para Lista
                    </button>
                )}
            </div>

            {viewMode === 'list' && (
                <div className="events-list">
                    {events.length === 0 ? (
                        <p className="no-data">Nenhum evento cadastrado.</p>
                    ) : (
                        <div className="cards-grid">
                            {events.map(event => (
                                <div key={event.id} className="event-card">
                                    <div className="event-info">
                                        <h3>{event.name}</h3>
                                        <p><FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}</p>
                                        <span className={`badge ${event.type.toLowerCase()}`}>{event.type}</span>
                                    </div>
                                    <div className="event-actions">
                                        <button className="btn-icon" onClick={() => handleManageEvent(event)} title="Gerenciar Participantes">
                                            <FaUsers /> Gerenciar
                                        </button>
                                        {/* Edit/Delete placeholders */}
                                        <button className="btn-icon outline"><FaEdit /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {viewMode === 'create' && (
                <div className="create-event-form">
                    <h3>Cadastrar Novo Evento</h3>
                    <form onSubmit={handleCreateEvent}>
                        <div className="form-group">
                            <label>Nome do Evento</label>
                            <input 
                                type="text" 
                                value={newEvent.name} 
                                onChange={e => setNewEvent({...newEvent, name: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Data</label>
                            <input 
                                type="date" 
                                value={newEvent.date} 
                                onChange={e => setNewEvent({...newEvent, date: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo</label>
                            <select 
                                value={newEvent.type} 
                                onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                            >
                                <option value="Championship">Campeonato</option>
                                <option value="Seminar">Seminário</option>
                                <option value="Internal">Interno</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea 
                                value={newEvent.description} 
                                onChange={e => setNewEvent({...newEvent, description: e.target.value})} 
                            />
                        </div>
                        <button type="submit" className="btn-primary">Salvar Evento</button>
                    </form>
                </div>
            )}

            {viewMode === 'manage' && selectedEvent && (
                <div className="manage-event">
                    <div className="manage-header">
                        <h3>Gerenciar: {selectedEvent.name}</h3>
                        <p>Adicione alunos e registre resultados.</p>
                    </div>
                    
                    <div className="student-selector">
                        <input 
                            type="text" 
                            placeholder="Buscar aluno..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <div className="students-list-scroll">
                            <table className="students-table">
                                <thead>
                                    <tr>
                                        <th>Aluno</th>
                                        <th>Faixa</th>
                                        <th>Resultado / Presença</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map(student => {
                                        const eventRecord = student.events?.find(e => e.name === selectedEvent.name || (e.name && e.name.includes(selectedEvent.name)));
                                        const isRegistered = !!eventRecord;
                                        
                                        return (
                                            <tr key={student.id} className={isRegistered ? 'registered' : ''}>
                                                <td data-label="Aluno">{student.name}</td>
                                                <td data-label="Faixa">{student.belt}</td>
                                                <td data-label="Resultado">
                                                    {isRegistered ? (
                                                        <span className="result-display">{eventRecord.rank || 'Registrado'}</span>
                                                    ) : (
                                                        <select id={`rank-${student.id}`} defaultValue="Participação" className="rank-select">
                                                            <option value="Participação">Participação</option>
                                                            <option value="1º Lugar">1º Lugar (Ouro)</option>
                                                            <option value="2º Lugar">2º Lugar (Prata)</option>
                                                            <option value="3º Lugar">3º Lugar (Bronze)</option>
                                                        </select>
                                                    )}
                                                </td>
                                                <td data-label="Ação">
                                                    {isRegistered ? (
                                                        <button className="btn-small success" disabled><FaCheck /> Adicionado</button>
                                                    ) : (
                                                        <button 
                                                            className="btn-small primary"
                                                            onClick={() => {
                                                                const rank = document.getElementById(`rank-${student.id}`).value;
                                                                handleAddStudentToEvent(student, rank);
                                                            }}
                                                        >
                                                            <FaPlus /> Adicionar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
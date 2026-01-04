import { useState, useRef } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { useAuth } from '@/context/AuthContext';
import { FaPrint, FaFilter } from 'react-icons/fa';
import './Certificates.css';
import logo from '@/assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';

export function Certificates() {
    const { students, certificateConfig, updateCertificateConfig } = useSchool();
    const { user } = useAuth();
    const printRef = useRef();

    // --- STATES ---
    // 1. Configuration (Date, City, Instructors)
    // Note: Config is now managed in SchoolContext (certificateConfig)

    // 2. Filter & Selection
    const [filterBelt, setFilterBelt] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

    // --- HANDLERS ---
    const handleConfigChange = (field, value, nestedObj = null) => {
        updateCertificateConfig(field, value, nestedObj);
    };

    const toggleStudentSelection = (id) => {
        setSelectedStudentIds(prev => 
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedStudentIds.length === filteredStudents.length) {
            setSelectedStudentIds([]);
        } else {
            setSelectedStudentIds(filteredStudents.map(s => s.id));
        }
    };

    const handlePrint = () => {
        window.print();
    };

    // --- HELPERS ---
    const filteredStudents = students.filter(student => {
        // Filter by Branch (if user is Branch Admin - Level 2)
        if (user?.accessLevel === 2 && user?.branch) {
            if ((student.branch ?? 'Montanha Top Team') !== user.branch) {
                return false;
            }
        }

        return filterBelt ? student.belt === filterBelt : true;
    });

    const getFormattedDate = () => {
        if (!certificateConfig.date) return '';
        const dateObj = new Date(certificateConfig.date);
        // Fix timezone issue by treating input as local date
        const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(dateObj.getTime() + userTimezoneOffset);
        
        const day = adjustedDate.getDate();
        const month = adjustedDate.toLocaleDateString('pt-BR', { month: 'long' });
        const year = adjustedDate.getFullYear();
        return `${certificateConfig.city.toUpperCase()}, ${day} DE ${month.toUpperCase()} DE ${year}`;
    };

    const getBeltColorClass = (beltName) => {
        if (!beltName) return '';
        const map = {
            'Branca': 'white',
            'Azul': 'blue',
            'Roxa': 'purple',
            'Marrom': 'brown',
            'Preta': 'black'
        };
        return map[beltName] || 'black';
    };

    // Only render selected students for printing/preview
    const studentsToPrint = students.filter(s => selectedStudentIds.includes(s.id));

    return (
        <div className="certificates-container">
            {/* --- MANAGEMENT PANEL (Hidden on Print) --- */}
            <div className="management-panel">
                <div className="panel-section config-section">
                    <h3><FaFilter /> Configuração do Certificado</h3>
                    
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input 
                                type="text" 
                                value={certificateConfig.city} 
                                onChange={(e) => handleConfigChange('city', e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Data de Graduação</label>
                            <input 
                                type="date" 
                                value={certificateConfig.date} 
                                onChange={(e) => handleConfigChange('date', e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="instructors-config">
                        <div className="instructor-block">
                            <h4>Instrutor 1 (Esquerda)</h4>
                            <input placeholder="Nome" value={certificateConfig.instructor1.name} onChange={(e) => handleConfigChange('name', e.target.value, 'instructor1')} />
                            <input placeholder="Cargo" value={certificateConfig.instructor1.role} onChange={(e) => handleConfigChange('role', e.target.value, 'instructor1')} />
                            <input placeholder="Detalhe 1" value={certificateConfig.instructor1.details1} onChange={(e) => handleConfigChange('details1', e.target.value, 'instructor1')} />
                            <input placeholder="Detalhe 2" value={certificateConfig.instructor1.details2} onChange={(e) => handleConfigChange('details2', e.target.value, 'instructor1')} />
                            <input placeholder="Detalhe 3" value={certificateConfig.instructor1.details3} onChange={(e) => handleConfigChange('details3', e.target.value, 'instructor1')} />
                        </div>
                        <div className="instructor-block">
                            <h4>Instrutor 2 (Direita)</h4>
                            <input placeholder="Nome" value={certificateConfig.instructor2.name} onChange={(e) => handleConfigChange('name', e.target.value, 'instructor2')} />
                            <input placeholder="Cargo" value={certificateConfig.instructor2.role} onChange={(e) => handleConfigChange('role', e.target.value, 'instructor2')} />
                            <input placeholder="Detalhe 1" value={certificateConfig.instructor2.details1} onChange={(e) => handleConfigChange('details1', e.target.value, 'instructor2')} />
                            <input placeholder="Detalhe 2" value={certificateConfig.instructor2.details2} onChange={(e) => handleConfigChange('details2', e.target.value, 'instructor2')} />
                            <input placeholder="Detalhe 3" value={certificateConfig.instructor2.details3} onChange={(e) => handleConfigChange('details3', e.target.value, 'instructor2')} />
                        </div>
                    </div>
                </div>

                <div className="panel-section selection-section">
                    <div className="selection-header">
                        <h3>Seleção de Alunos</h3>
                        <div className="filter-controls">
                            <select value={filterBelt} onChange={(e) => setFilterBelt(e.target.value)}>
                                <option value="">Todas as Faixas</option>
                                <option value="Branca">Branca</option>
                                <option value="Azul">Azul</option>
                                <option value="Roxa">Roxa</option>
                                <option value="Marrom">Marrom</option>
                                <option value="Preta">Preta</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="students-table-wrapper">
                        <table className="students-selection-table">
                            <thead>
                                <tr>
                                    <th width="40">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedStudentIds.length > 0 && selectedStudentIds.length === filteredStudents.length}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th>Nome</th>
                                    <th>Faixa</th>
                                    <th>Graus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className={selectedStudentIds.includes(student.id) ? 'selected' : ''}>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedStudentIds.includes(student.id)}
                                                onChange={() => toggleStudentSelection(student.id)}
                                            />
                                        </td>
                                        <td>{student.name}</td>
                                        <td>{student.belt}</td>
                                        <td>{student.stripes}</td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="no-data">Nenhum aluno encontrado para esta faixa.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="action-footer">
                        <span>{selectedStudentIds.length} aluno(s) selecionado(s)</span>
                        <button 
                            className="print-btn" 
                            onClick={handlePrint}
                            disabled={selectedStudentIds.length === 0}
                        >
                            <FaPrint /> Gerar / Imprimir Certificados
                        </button>
                    </div>
                </div>
            </div>

            {/* --- PRINT AREA (Visible Only in Preview/Print) --- */}
            <div className="print-area" ref={printRef}>
                {studentsToPrint.length === 0 ? (
                    <div className="empty-preview">
                        <p>Selecione alunos para visualizar os certificados.</p>
                    </div>
                ) : (
                    studentsToPrint.map(student => (
                        <div key={student.id} className="certificate-page">
                             {/* Background Decor */}
                             <div className="bg-curve-top-left"></div>
                            <div className="bg-curve-bottom-right"></div>
                            <div className="bg-border-outline"></div>

                            {/* Content */}
                            <div className="certificate-content">
                                <div className="header-logo">
                                    <img src={logo} alt="Montanha Top Team" />
                                </div>

                                <h1 className="title-certificate">CERTIFICADO</h1>
                                
                                <p className="date-location">{getFormattedDate()}</p>

                                <div className="main-text">
                                    <p>A EQUIPE MONTANHA TOP TEAM confere o presente certificado a</p>
                                    <h2 className="student-name">{student.name}</h2>
                                    <p>
                                        por ter alcançado com mérito a graduação de <strong>FAIXA {student.belt.toUpperCase()}</strong> em jiu-jitsu e defesa pessoal
                                    </p>
                                </div>

                                <div className="signatures-row">
                                    <div className="signature-block">
                                        <div className="sig-line"></div>
                                        <p className="sig-name">{certificateConfig.instructor1.name}</p>
                                        <p className="sig-role">{certificateConfig.instructor1.role}</p>
                                        <p className="sig-details">{certificateConfig.instructor1.details1}</p>
                                        <p className="sig-details">{certificateConfig.instructor1.details2}</p>
                                        <p className="sig-details">{certificateConfig.instructor1.details3}</p>
                                    </div>
                                    <div className="signature-block">
                                        <div className="sig-line"></div>
                                        <p className="sig-name">{certificateConfig.instructor2.name}</p>
                                        <p className="sig-role">{certificateConfig.instructor2.role}</p>
                                        <p className="sig-details">{certificateConfig.instructor2.details1}</p>
                                        <p className="sig-details">{certificateConfig.instructor2.details2}</p>
                                        <p className="sig-details">{certificateConfig.instructor2.details3}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Belt Bar */}
                            <div className={`belt-bar-bottom ${getBeltColorClass(student.belt)}`}></div>
                            
                            {/* Gold Seal */}
                            <div className="gold-seal">
                                <div className="seal-inner">
                                    <img src={logo} alt="Seal Logo" />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

import { useState, useRef, useEffect } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { useAuth } from '@/context/AuthContext';
import { FaPrint, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Certificates.css';
import { CertificateSvg } from '@/components/Certificate/CertificateSvg.jsx';

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
    const [triggerPrint, setTriggerPrint] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [printReadyCount, setPrintReadyCount] = useState(0);

    useEffect(() => {
        setPreviewIndex(0);
    }, [selectedStudentIds]);

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
        setPrintReadyCount(0);
        setTriggerPrint(true);
    };

    const handleCertificateReady = () => {
        setPrintReadyCount(prev => prev + 1);
    };

    const handlePrev = () => {
        setPreviewIndex(prev => prev > 0 ? prev - 1 : prev);
    };

    const handleNext = () => {
        setPreviewIndex(prev => prev < studentsToPrint.length - 1 ? prev + 1 : prev);
    };

    // Reset after printing
    useEffect(() => {
        const after = () => setTriggerPrint(false);
        window.addEventListener('afterprint', after);
        return () => window.removeEventListener('afterprint', after);
    }, []);

    // --- HELPERS ---
    const filteredStudents = students.filter(student => {
        // Filter by Branch (if user is Branch Admin - Level 2)
        if (user?.accessLevel === 2 && user?.branch) {
            if ((student.branch ?? 'Montanha Top Team') !== user.branch) {
                return false;
            }
        }
        const isWhite = String(student.belt || '').toLowerCase() === 'branca';
        if (isWhite) return false;
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

    

    // Only render selected students for printing/preview
    const studentsToPrint = filteredStudents.filter(s => selectedStudentIds.includes(s.id));

    useEffect(() => {
    if (triggerPrint && studentsToPrint.length > 0 && printReadyCount >= studentsToPrint.length) {
      console.log('--- STARTING PRINT PROCESS ---');
      console.log('Students to print:', studentsToPrint);
      console.log('Total students:', studentsToPrint.length);
      setTimeout(() => window.print(), 100);
    }
  }, [triggerPrint, printReadyCount, studentsToPrint.length]);

    const getSerialForStudent = (student) => {
        const possible = student?.blackBeltOrder ?? student?.blackBeltNumber ?? student?.certificateNumber ?? student?.serialNumber;
        return possible;
    };
    const getBeltColors = (beltName) => {
        const normalize = (s) => String(s || '').toLowerCase().trim();
        const colorMap = {
            'branca': '#e0e0e0',
            'azul': '#001887',
            'roxa': '#610178',
            'marrom': '#6a1b0b',
            'preta': '#000000',
            'cinza': '#6a6a6a',
            'amarela': '#ffff00',
            'laranja': '#ff7300',
            'verde': '#008000',
            'vermelha': '#ff0000'
        };
        const splitColors = (name) => {
            const n = normalize(name);
            const seps = ['/', '-', ' e ', ' & ', ','];
            for (const sep of seps) {
                if (n.includes(sep)) return n.split(sep).map(p => p.trim()).filter(Boolean);
            }
            return [n];
        };
        const hex = (n) => colorMap[normalize(n)] || '#000000';
        const parts = splitColors(beltName);
        const primary = hex(parts[0]);
        const stripe = parts.length > 1 ? hex(parts[1]) : primary;
        const grau = primary === '#000000' ? '#ff0000' : '#000000';
        return { 'belt-color': primary, 'belt-listra': stripe, 'belt-grau': grau };
    };
    const getLabelValuesForStudent = () => ({
        'text-cidade-data': getFormattedDate(),
        'text-supervisor-name': certificateConfig.instructor1.name,
        'text-supervisor-title': certificateConfig.instructor1.role,
        'text-supervisor-faixa': certificateConfig.instructor1.details1,
        'text-supervisor-fpjj': certificateConfig.instructor1.details2,
        'text-supervisor-cbjj-ibjjf': certificateConfig.instructor1.details3,
        'text-mestre-name': certificateConfig.instructor2.name,
        'text-mestre-title': certificateConfig.instructor2.role,
        'text-mestre-faixa': certificateConfig.instructor2.details1,
        'text-mestre-fpjj': certificateConfig.instructor2.details2,
        'text-mestre-cbjj-ibjjf': certificateConfig.instructor2.details3,
        thirdInstructorEnabled: certificateConfig.thirdInstructorEnabled,
        thirdInstructor: {
            name: certificateConfig.instructor3.name,
            role: certificateConfig.instructor3.role,
            details1: certificateConfig.instructor3.details1,
            details2: certificateConfig.instructor3.details2,
            details3: certificateConfig.instructor3.details3,
        }
    });

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
                        <div className="form-group-row">
                            <div className="form-group">
                                <label>Categoria de template</label>
                                <select value={certificateConfig.templateCategory} onChange={(e) => handleConfigChange('templateCategory', e.target.value)}>
                                    <option value="adulto">Adulto</option>
                                    <option value="infantil">Infantil</option>
                                </select>
                            </div>
                        </div>
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
                        <div className="instructor-block">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={certificateConfig.thirdInstructorEnabled}
                                    onChange={(e) => handleConfigChange('thirdInstructorEnabled', e.target.checked)}
                                />
                                Adicionar terceiro professor (central)
                            </label>
                            {certificateConfig.thirdInstructorEnabled && (
                                <>
                                    <input placeholder="Nome" value={certificateConfig.instructor3.name} onChange={(e) => handleConfigChange('name', e.target.value, 'instructor3')} />
                                    <input placeholder="Cargo" value={certificateConfig.instructor3.role} onChange={(e) => handleConfigChange('role', e.target.value, 'instructor3')} />
                                    <input placeholder="Detalhe 1" value={certificateConfig.instructor3.details1} onChange={(e) => handleConfigChange('details1', e.target.value, 'instructor3')} />
                                    <input placeholder="Detalhe 2" value={certificateConfig.instructor3.details2} onChange={(e) => handleConfigChange('details2', e.target.value, 'instructor3')} />
                                    <input placeholder="Detalhe 3" value={certificateConfig.instructor3.details3} onChange={(e) => handleConfigChange('details3', e.target.value, 'instructor3')} />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="panel-section selection-section">
                    <div className="selection-header">
                        <h3>Seleção de Alunos</h3>
                        <div className="filter-controls">
                            <select value={filterBelt} onChange={(e) => setFilterBelt(e.target.value)}>
                                <option value="">Todas as Faixas</option>
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
                            className="checkin-btn" 
                            onClick={handlePrint}
                            disabled={selectedStudentIds.length === 0}
                        >
                            <FaPrint /> Gerar / Imprimir Certificados
                        </button>
                    </div>

                    <div className="inline-preview" role="region" aria-label="Pré-visualização de Certificados">
                        {studentsToPrint.length === 0 ? (
                            <div className="preview-placeholder">
                                <p>Selecione aluno(s) na tabela acima para visualizar.</p>
                            </div>
                        ) : (
                            <div className="carousel-container">
                                <div className="carousel-content">
                                    <CertificateSvg
                                        key={studentsToPrint[previewIndex].id}
                                        studentName={studentsToPrint[previewIndex].name}
                                        belt={studentsToPrint[previewIndex].belt}
                                        dateLocation={getFormattedDate()}
                                        templateMode={certificateConfig.templateMode}
                                        templateCategory={certificateConfig.templateCategory}
                                        labelValues={getLabelValuesForStudent(studentsToPrint[previewIndex])}
                                        beltColors={getBeltColors(studentsToPrint[previewIndex].belt)}
                                        serialNumber={getSerialForStudent(studentsToPrint[previewIndex])}
                                        enablePreview={true}
                                    />
                                </div>
                                <div className="carousel-controls">
                                    <button 
                                        className="nav-btn" 
                                        onClick={handlePrev} 
                                        disabled={previewIndex === 0}
                                        title="Anterior"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    
                                    <span className="carousel-counter">
                                        {previewIndex + 1} de {studentsToPrint.length}
                                    </span>
                                    
                                    <button 
                                        className="nav-btn" 
                                        onClick={handleNext} 
                                        disabled={previewIndex === studentsToPrint.length - 1}
                                        title="Próximo"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- PRINT AREA (Visible Only in Preview/Print) --- */}
            <div className="print-area" ref={printRef}>
                {studentsToPrint.length > 0 && studentsToPrint.map(student => (
                    <div key={student.id} className="certificate-page">
                        <CertificateSvg
                            studentName={student.name}
                            belt={student.belt}
                            dateLocation={getFormattedDate()}
                            templateMode={certificateConfig.templateMode}
                            templateCategory={certificateConfig.templateCategory}
                            labelValues={getLabelValuesForStudent(student)}
                            beltColors={getBeltColors(student.belt)}
                            serialNumber={getSerialForStudent(student)}
                            enablePreview={false}
                            triggerPrint={triggerPrint}
                            onPrintReady={handleCertificateReady}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

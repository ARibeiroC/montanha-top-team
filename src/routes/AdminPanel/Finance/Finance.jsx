import { useMemo, useState, useEffect } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useAuth } from '@/context/AuthContext'
import './Finance.css'
import { LiaCoinsSolid } from "react-icons/lia"
import { FaPlus, FaEdit, FaTrash, FaDownload } from "react-icons/fa"

export function Finance() {
    const { user } = useAuth()
    const { transactions, addTransaction, updateTransaction, deleteTransaction, getSummary, getOverdue, students } = useSchool()
    const [filters, setFilters] = useState({ 
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        branch: '', 
        category: '', 
        status: '' 
    })
    
    // Determine the branch to apply for filtering available options
    const level = typeof user?.accessLevel === 'number' ? user.accessLevel : 0
    const canEdit = level >= 2
    const userBranch = user?.branch || ''
    const appliedBranch = level === 2 ? userBranch : (filters.branch || '')
    const { month: selectedMonth, year: selectedYear, category: selectedCategory, status: selectedStatus } = filters

    // Dynamic years based on transactions and selected branch
    const years = useMemo(() => {
        const uniqueYears = new Set()
        const currentYear = new Date().getFullYear()
        
        // If no transactions, at least show current year
        if (transactions.length === 0) {
            uniqueYears.add(currentYear)
        } else {
            transactions.forEach(t => {
                // Filter by branch if selected
                if (appliedBranch && t.branch !== appliedBranch) return

                const y = new Date(t.date).getFullYear()
                if (!isNaN(y)) uniqueYears.add(y)
            })
            
            // If the filtered transactions yield no years (e.g. branch has no data), 
            // fallback to current year or handle empty state. 
            // Let's add current year if set is empty to avoid broken UI
            if (uniqueYears.size === 0) uniqueYears.add(currentYear)
        }
        
        return Array.from(uniqueYears).sort((a, b) => b - a)
    }, [transactions, appliedBranch])

    // Dynamic months based on transactions, selected branch AND selected year
    const months = useMemo(() => {
        const allMonths = [
            { value: 1, label: 'Janeiro' },
            { value: 2, label: 'Fevereiro' },
            { value: 3, label: 'Março' },
            { value: 4, label: 'Abril' },
            { value: 5, label: 'Maio' },
            { value: 6, label: 'Junho' },
            { value: 7, label: 'Julho' },
            { value: 8, label: 'Agosto' },
            { value: 9, label: 'Setembro' },
            { value: 10, label: 'Outubro' },
            { value: 11, label: 'Novembro' },
            { value: 12, label: 'Dezembro' }
        ]

        if (transactions.length === 0) return allMonths

        const activeMonths = new Set()
        
        transactions.forEach(t => {
            // Filter by branch
            if (appliedBranch && t.branch !== appliedBranch) return
            
            // Filter by selected year
            const date = new Date(t.date)
            if (date.getFullYear() !== selectedYear) return

            activeMonths.add(date.getMonth() + 1)
        })

        if (activeMonths.size === 0) {
            return allMonths
        }

        return allMonths.filter(m => activeMonths.has(m.value))
    }, [transactions, appliedBranch, selectedYear])

    // Calculate date range based on month/year
    const dateRange = useMemo(() => {
        if (!selectedMonth || !selectedYear) return { from: '', to: '' }
        
        // Create dates using local time to avoid timezone issues
        const firstDay = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`
        // Get last day of month
        const lastDayDate = new Date(selectedYear, selectedMonth, 0)
        const lastDay = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(lastDayDate.getDate()).padStart(2, '0')}`
        
        return { from: firstDay, to: lastDay }
    }, [selectedMonth, selectedYear])

    const [modalOpen, setModalOpen] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [form, setForm] = useState({
        type: 'income',
        category: 'Mensalidade',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        paymentMethod: 'cash',
        description: '',
        branch: '',
        studentId: ''
    })
    // NOTE: variables 'level', 'canEdit', 'userBranch', 'appliedBranch' moved up for hoisting reasons in previous step

    // Effect to validate filters when options change
    useEffect(() => {
        // If selected year is not in available years, switch to most recent available
        if (years.length > 0 && !years.includes(selectedYear)) {
            setFilters(prev => ({ ...prev, year: years[0] }))
        }
        
        // If selected month is not in available months (and months list is not empty), switch to first available
        // Note: 'months' array objects have .value
        const monthValues = months.map(m => m.value)
        if (monthValues.length > 0 && !monthValues.includes(selectedMonth)) {
            setFilters(prev => ({ ...prev, month: monthValues[0] }))
        }
    }, [years, months, selectedYear, selectedMonth])

    const normalizedTransactions = useMemo(() => {
        return transactions.map(t => ({
            ...t,
            dateOnly: new Date(t.date).toISOString().split('T')[0]
        }))
    }, [transactions])
    const filtered = useMemo(() => {
        return normalizedTransactions.filter(t => {
            const inBranch = appliedBranch ? t.branch === appliedBranch : true
            const inCategory = selectedCategory ? t.category === selectedCategory : true
            const inStatus = selectedStatus ? t.status === selectedStatus : true
            // Use calculated dateRange instead of direct filter props
            const inFrom = dateRange.from ? t.dateOnly >= dateRange.from : true
            const inTo = dateRange.to ? t.dateOnly <= dateRange.to : true
            return inBranch && inCategory && inStatus && inFrom && inTo
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [normalizedTransactions, selectedCategory, selectedStatus, appliedBranch, dateRange])
    const summary = useMemo(() => getSummary({ from: dateRange.from, to: dateRange.to, branch: appliedBranch }), [dateRange, appliedBranch, getSummary])
    const overdue = useMemo(() => getOverdue({ branch: appliedBranch }), [appliedBranch, getOverdue])
    const branches = useMemo(() => {
        const set = new Set(transactions.map(t => t.branch))
        students.forEach(s => set.add(s.branch))
        return Array.from(set)
    }, [transactions, students])
    const categories = ['Mensalidade','Matrícula','Uniforme','Evento','Manutenção','Outros']
    const statuses = ['pending','paid','overdue']
    const methods = ['cash','card','pix','transfer']
    const openAdd = () => {
        setEditItem(null)
        setForm({
            type: 'income',
            category: 'Mensalidade',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            paymentMethod: 'cash',
            description: '',
            branch: level === 2 ? userBranch : '',
            studentId: ''
        })
        setModalOpen(true)
    }
    const openEdit = (item) => {
        setEditItem(item)
        setForm({
            type: item.type,
            category: item.category,
            amount: String(item.amount),
            date: new Date(item.date).toISOString().split('T')[0],
            status: item.status,
            paymentMethod: item.paymentMethod,
            description: item.description,
            branch: item.branch,
            studentId: item.studentId ? String(item.studentId) : ''
        })
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
        setEditItem(null)
    }
    const submitForm = (e) => {
        e.preventDefault()
        const payload = {
            type: form.type,
            category: form.category,
            amount: parseFloat(form.amount),
            date: new Date(form.date).toISOString(),
            status: form.status,
            paymentMethod: form.paymentMethod,
            description: form.description,
            branch: level === 2 ? userBranch : form.branch || userBranch || 'Montanha Top Team',
            studentId: form.studentId ? parseInt(form.studentId, 10) : null
        }
        if (editItem) {
            updateTransaction(editItem.id, payload)
        } else {
            addTransaction(payload)
        }
        closeModal()
    }
    const removeItem = (id) => {
        deleteTransaction(id)
    }
    const exportCSV = () => {
        const header = ['ID','Tipo','Categoria','Valor','Data','Status','Pagamento','Descrição','Filial','AlunoId']
        const lines = filtered.map(t => [
            t.id,
            t.type,
            t.category,
            t.amount,
            new Date(t.date).toLocaleDateString('pt-BR'),
            t.status,
            t.paymentMethod,
            t.description?.replace(/\n/g, ' '),
            t.branch,
            t.studentId ?? ''
        ])
        const csv = [header, ...lines].map(r => r.join(';')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'financeiro.csv'
        a.click()
        URL.revokeObjectURL(url)
    }
    return (
        <div className="finance-container">
            <div className="finance-header">
                <div className="title">
                    <LiaCoinsSolid className="menu-icon" />
                    <h2>Financeiro</h2>
                </div>
                <div className="actions">
                    {canEdit && <button className="btn primary" onClick={openAdd}><FaPlus /> Novo lançamento</button>}
                    <button className="btn" onClick={exportCSV}><FaDownload /> Exportar CSV</button>
                </div>
            </div>
            <div className="filters">
                <select value={filters.month} onChange={e => setFilters(prev => ({ ...prev, month: parseInt(e.target.value) }))}>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select value={filters.year} onChange={e => setFilters(prev => ({ ...prev, year: parseInt(e.target.value) }))}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                {level !== 2 && (
                    <select value={filters.branch} onChange={e => setFilters(prev => ({ ...prev, branch: e.target.value }))}>
                        <option value="">Todas filiais</option>
                        {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                )}
                <select value={filters.category} onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}>
                    <option value="">Todas categorias</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={filters.status} onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}>
                    <option value="">Todos status</option>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div className="summary-cards">
                <div className="card">
                    <div className="card-data"><p>R$ {summary.income.toFixed(2)}</p></div>
                    <div className="card-title"><p>Receita</p></div>
                </div>
                <div className="card">
                    <div className="card-data"><p>R$ {summary.expense.toFixed(2)}</p></div>
                    <div className="card-title"><p>Despesa</p></div>
                </div>
                <div className="card">
                    <div className="card-data"><p>R$ {summary.balance.toFixed(2)}</p></div>
                    <div className="card-title"><p>Saldo</p></div>
                </div>
                <div className="card">
                    <div className="card-data"><p>{overdue.count}</p></div>
                    <div className="card-title"><p>Inadimplentes</p></div>
                </div>
            </div>
            <div className="list-mobile">
                {filtered.map(item => {
                    const studentName = item.studentId ? (students.find(s => s.id === item.studentId)?.name || '') : ''
                    return (
                        <div className="list-card" key={item.id}>
                            <div className="row">
                                <span className="title">{item.type === 'income' ? 'Receita' : 'Despesa'}</span>
                                <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="row">
                                <span>{item.category}</span>
                                <span>R$ {item.amount.toFixed(2)}</span>
                            </div>
                            <div className="row">
                                <span>{item.branch}</span>
                                <span>{item.paymentMethod}</span>
                            </div>
                            <div className="row">
                                <span>{studentName}</span>
                                <span>{item.status}</span>
                            </div>
                            {item.description && <div className="row"><span>{item.description}</span></div>}
                            {canEdit && (
                                <div className="actions">
                                    <button className="btn small" onClick={() => openEdit(item)}><FaEdit /></button>
                                    <button className="btn small danger" onClick={() => removeItem(item.id)}><FaTrash /></button>
                                </div>
                            )}
                        </div>
                    )
                })}
                {filtered.length === 0 && <div className="empty">Nenhum lançamento</div>}
            </div>
            <div className="table-wrapper">
                <table className="finance-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Filial</th>
                            <th>Aluno</th>
                            <th>Status</th>
                            <th>Pagamento</th>
                            <th>Valor</th>
                            {canEdit && <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(item => {
                            const studentName = item.studentId ? (students.find(s => s.id === item.studentId)?.name || '') : ''
                            return (
                                <tr key={item.id}>
                                    <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                                    <td>{item.type === 'income' ? 'Receita' : 'Despesa'}</td>
                                    <td>{item.category}</td>
                                    <td>{item.description}</td>
                                    <td>{item.branch}</td>
                                    <td>{studentName}</td>
                                    <td>{item.status}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>R$ {item.amount.toFixed(2)}</td>
                                    {canEdit && (
                                        <td className="actions-cell">
                                            <button className="btn small" onClick={() => openEdit(item)}><FaEdit /></button>
                                            <button className="btn small danger" onClick={() => removeItem(item.id)}><FaTrash /></button>
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={canEdit ? 10 : 9} className="empty">Nenhum lançamento</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editItem ? 'Editar lançamento' : 'Novo lançamento'}</h3>
                        <form onSubmit={submitForm} className="form-grid">
                            <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}>
                                <option value="income">Receita</option>
                                <option value="expense">Despesa</option>
                            </select>
                            <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input type="number" step="0.01" placeholder="Valor" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} />
                            <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} />
                            <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}>
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select value={form.paymentMethod} onChange={e => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))}>
                                {methods.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            {level !== 2 && (
                                <select value={form.branch} onChange={e => setForm(prev => ({ ...prev, branch: e.target.value }))}>
                                    <option value="">Selecionar filial</option>
                                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            )}
                            <select value={form.studentId} onChange={e => setForm(prev => ({ ...prev, studentId: e.target.value }))}>
                                <option value="">Sem aluno</option>
                                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <input type="text" placeholder="Descrição" value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} />
                            <div className="modal-actions">
                                <button type="button" className="btn" onClick={closeModal}>Cancelar</button>
                                <button type="submit" className="btn primary">{editItem ? 'Salvar' : 'Adicionar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Finance

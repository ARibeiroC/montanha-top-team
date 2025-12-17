import './SchedulesTable.css'

export function SchedulesTable() {
    return (
        <div className="schedules-table-container" id="schedulesTable">
            <h1>Horário de Treinos</h1>
            <div className="container">
                <div className="week">
                    <h2>DOMINGO</h2>
                    <div className="container-card-week">
                        <div className="header">
                            <div className="hours">
                                <h3>Horário</h3>
                            </div>
                            <div className="classifications">
                                <h3>Categoria</h3>
                            </div>
                            <div className="teachers">
                                <h3>Professor</h3>
                            </div>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="hours">
                                    <p>09:00 às 10:30</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Ricardo Santos</p>
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>
                <div className="week">
                    <h2>SEGUNDA</h2>
                    <div className="container-card-week">
                        <div className="header">
                            <div className="hours">
                                <h3>Horário</h3>
                            </div>
                            <div className="classifications">
                                <h3>Categoria</h3>
                            </div>
                            <div className="teachers">
                                <h3>Professor</h3>
                            </div>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="hours">
                                    <p>07:00 às 08:30</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Odailton Bezerra</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>16:00 às 17:30</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>19:00 às 20:15</p>
                                </div>
                                <div className="classifications">
                                    <p>Kids</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                    <p>Prof. Fabiano Andrade</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>20:15 às 21:45</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                    <p>Prof. Fabiano Andrade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="week">
                    <h2>TERÇA</h2>
                    <div className="container-card-week">
                        <div className="header">
                            <div className="hours">
                                <h3>Horário</h3>
                            </div>
                            <div className="classifications">
                                <h3>Categoria</h3>
                            </div>
                            <div className="teachers">
                                <h3>Professor</h3>
                            </div>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="hours">
                                    <p>19:00 às 20:15</p>
                                </div>
                                <div className="classifications">
                                    <p>Mirim</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                    <p>Prof. Fabiano Andrade</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>20:15 às 21:30</p>
                                </div>
                                <div className="classifications">
                                    <p>Juvenil</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                    <p>Prof. Fabiano Andrade</p>
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>
                <div className="week">
                    <h2>QUARTA</h2>
                    <div className="container-card-week">
                        <div className="header">
                            <div className="hours">
                                <h3>Horário</h3>
                            </div>
                            <div className="classifications">
                                <h3>Categoria</h3>
                            </div>
                            <div className="teachers">
                                <h3>Professor</h3>
                            </div>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="hours">
                                    <p>07:00 às 08:30</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Odailton Bezerra</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>16:00 às 17:30</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>19:00 às 20:15</p>
                                </div>
                                <div className="classifications">
                                    <p>Kids</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                    <p>Prof. Fabiano Andrade</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="hours">
                                    <p>20:15 às 21:45</p>
                                </div>
                                <div className="classifications">
                                    <p>Adulto</p>
                                </div>
                                <div className="teachers">
                                    <p>Prof. Montanha</p>
                                    <p>Prof. Fabiano Andrade</p>
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    )
}

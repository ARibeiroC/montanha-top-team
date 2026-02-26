import './WorkoutSchedules.css'

export function Schedules() {
    return (
        <div className="workout-schedules-container">
            <div id="schedules">
                <h1>Cronograma de Treinos</h1>
                <div className="container">
                    
                    {/* DOMINGO */}
                    <div className="week">
                        <h2>Domingo</h2>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th className="col-time">Horário</th>
                                    <th className="col-category">Categoria</th>
                                    <th className="col-prof">Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-time">09:00 - 10:30</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Ricardo Santos</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* SEGUNDA */}
                    <div className="week">
                        <h2>Segunda</h2>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th className="col-time">Horário</th>
                                    <th className="col-category">Categoria</th>
                                    <th className="col-prof">Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-time">07:00 - 08:30</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Odailton Bezerra</td>
                                </tr>
                                <tr>
                                    <td className="col-time">16:00 - 17:30</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Montanha</td>
                                </tr>
                                <tr>
                                    <td className="col-time">19:00 - 20:15</td>
                                    <td className="col-category">Kids</td>
                                    <td className="col-prof">Prof. Montanha<br/>Prof. Fabiano Andrade</td>
                                </tr>
                                <tr>
                                    <td className="col-time">20:15 - 21:45</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Montanha<br/>Prof. Fabiano Andrade</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* TERÇA */}
                    <div className="week">
                        <h2>Terça</h2>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th className="col-time">Horário</th>
                                    <th className="col-category">Categoria</th>
                                    <th className="col-prof">Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-time">19:00 - 20:15</td>
                                    <td className="col-category">Mirim</td>
                                    <td className="col-prof">Prof. Montanha<br/>Prof. Fabiano Andrade</td>
                                </tr>
                                <tr>
                                    <td className="col-time">20:15 - 21:30</td>
                                    <td className="col-category">Juvenil</td>
                                    <td className="col-prof">Prof. Montanha<br/>Prof. Fabiano Andrade</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* QUARTA */}
                    <div className="week">
                        <h2>Quarta</h2>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th className="col-time">Horário</th>
                                    <th className="col-category">Categoria</th>
                                    <th className="col-prof">Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-time">07:00 - 08:30</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Odailton Bezerra</td>
                                </tr>
                                <tr>
                                    <td className="col-time">16:00 - 17:30</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Montanha</td>
                                </tr>
                                <tr>
                                    <td className="col-time">19:00 - 20:15</td>
                                    <td className="col-category">Kids</td>
                                    <td className="col-prof">Prof. Montanha<br/>Prof. Fabiano Andrade</td>
                                </tr>
                                <tr>
                                    <td className="col-time">20:15 - 21:45</td>
                                    <td className="col-category">Adulto</td>
                                    <td className="col-prof">Prof. Montanha<br/>Prof. Fabiano Andrade</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

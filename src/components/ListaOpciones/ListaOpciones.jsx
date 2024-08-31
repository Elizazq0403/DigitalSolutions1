import "./ListaOpciones.css"

const ListaOpciones = (props) => {
    const manejarCambio = (e) => {
        console.log("cambio", e.target.value)
        props.actualizarEquipo(e.target.value)
    }

    return (
        <div className="lista-opciones">
            <label>Equipos</label>
            <select value={props.valor} onChange={manejarCambio}>
                <option value="" disabled defaultValue="" hidden>Seleccionar equipo</option>
                {/* Validación: si props.equipos existe y es un array */}
                {(props.equipos && props.equipos.length > 0) ? (
                    props.equipos.map((equipo, index) => (
                        <option key={index} value={equipo}>{equipo}</option>
                    ))
                ) : (
                    <option disabled>No hay equipos disponibles</option>
                )}
            </select>
        </div>
    )
}

export default ListaOpciones

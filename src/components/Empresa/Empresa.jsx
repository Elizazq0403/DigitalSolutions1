import "./Empresa.css"
import Cliente from "../Cliente/Cliente";
import hexToRgba from 'hex-to-rgba';

const Empresa = (props) => {
    //Destructuracion, simplifica al maximo el codigo
    const { colorPrimario, colorSecundario, titulo, id } = props.datos
    const { colaboradores, eliminarColaborador, actualizarColor, like } = props
    const obj = {
        backgroundColor: hexToRgba(colorPrimario, 0.6)
    }


    const estiloTitulo = { borderColor: colorPrimario }

    return <>
        {
            colaboradores.length > 0 &&
            <section className="equipo" style={obj}>
                <input
                    type='color'
                    className="input-color"
                    value={colorPrimario}
                    onChange={(evento) => {
                        actualizarColor(evento.target.value, id)
                    }}
                />
                {/*<h3 style={estiloTitulo} >{titulo}</h3> de esta linea de codigo se borro el titulo del equipo programacion, etc*/}
                <h3 style={estiloTitulo} ></h3>
                <div className="colaboradores">
                    {
                        colaboradores.map((colaborador, index) => <Cliente
                            datos={colaborador}
                            key={index}
                            colorPrimario={colorPrimario}
                            eliminarColaborador={eliminarColaborador}
                            like={like}
                        />)
                    }
                </div>
            </section>
        }
    </>
}

export default Empresa
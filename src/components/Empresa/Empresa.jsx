import "./Empresa.css"
import Cliente from "../Cliente/Cliente";
import hexToRgba from 'hex-to-rgba';

const Empresa = (props) => {
    //Destructuracion, simplifica al maximo el codigo
    const { colorPrimario, colorSecundario, titulo, id } = props.datos
    const { colaboradores, eliminarColaborador, actualizarColor, like } = props
    const obj = {
        //backgroundColor: hexToRgba(colorPrimario, 0.6) hexToRgba es lo que le da opasidad al  color de fondo, es una biblioteca de nmp (npm i hex-to-rgba) 
    }


    const estiloTitulo = { borderColor: colorPrimario }

    return <>
        {
            colaboradores.length > 0 &&
            <section className="equipo" style={obj}> {/*className="equipo" style={obj}, borrando es se ajusta el tamaño sin el fondo de la mitad */}
                {/**/}
                <input
                    type='color' /*Este es el input que nos trae la tabla de colores*/
                    className="input-color" /*Esta clase le da posicion al input*/
                    value={colorPrimario} /*Este es el que determina en que color inicia el input-color, si le damos color secundario inicia por color secundario*/
                    onChange={(evento) => {
                        actualizarColor(evento.target.value, id) //value, es el valor del input
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
                            //eliminarColaborador={eliminarColaborador}
                            //like={like}
                        />)
                    }
                </div>
            </section>
        }
    </>
}

export default Empresa   
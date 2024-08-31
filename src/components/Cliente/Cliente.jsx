import "./Cliente.css"
import { AiFillCloseCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { RiQrCodeFill } from "react-icons/ri";

const Cliente = (props) => {
    const { nombre, puesto, foto, equipo, id, fav } = props.datos
    const { colorPrimario, eliminarColaborador, like } = props

    // condicion ? verdadero : falso

    return <div className="colaborador">
        <AiFillCloseCircle className="eliminar" onClick={() => eliminarColaborador(id)} /> {/*Boton eliminar*/}
        <div className="encabezado" style={{ backgroundColor: colorPrimario }}>
            <img src={foto} alt={nombre} />
        </div> {/*Imagen del colaborador*/}
        <div className="info">
            <h4>{nombre}</h4>
            <h5>{puesto}</h5>
            {fav ? <AiFillHeart color="red" onClick={() => like(id)} /> : <AiOutlineHeart onClick={() => like(id)} />} {/*Icono like*/}

            <div className="social-icons-container">
                <a href="tel:+1234567890">
                    <FiPhoneCall className="social-icon phone" />
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="social-icon whatsapp" />
                </a>
                <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                    <MdEmail className="social-icon email" />
                </a>
                <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                    <MdPhoneIphone className="social-icon iphone" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <RiQrCodeFill className="social-icon qr" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaShareAlt className="social-icon share" />
                </a>
            </div>


        </div>

    

    </div>
}

export default Cliente
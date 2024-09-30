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
            {/*fav ? <AiFillHeart color="red" onClick={() => like(id)} /> : <AiOutlineHeart onClick={() => like(id)} />} {/*Icono like*/}

            <div className="social-icons-container">
                <a href="tel:+1234567890">
                    <div className="social-icon-container">
                        <FiPhoneCall className="social-icon" />
                    </div>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-container">
                        <FaWhatsapp className="social-icon whatsapp" />
                    </div>
                </a>
                <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-container">
                        <MdEmail className="social-icon email" />
                    </div>
                </a>
                <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-container">
                        <MdPhoneIphone className="social-icon iphone" />
                    </div>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-container">
                        <RiQrCodeFill className="social-icon qr" />
                    </div>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <div className="social-icon-container">
                        <FaShareAlt className="social-icon share" />
                    </div>
                </a>
            </div>


        </div>

    

    </div>
}

export default Cliente
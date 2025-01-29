import "./Contacto.css";
import { AiFillCloseCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { RiQrCodeFill } from "react-icons/ri";
import ListProductos from "../../pages/Productos/ListProductos";
import fotoProductos from "../../assets/img/ubicacion.png"

const Contacto = (props) => {
    const { nombre, puesto, foto, equipo, id, fav } = props.datos;
    const { colorPrimario } = props;

    return (
        <div className="cliente-card ">
            <div className="cliente-header" style={{ backgroundColor: colorPrimario }}>
                <img src={foto} alt={nombre} />
            </div>
            <div className="cliente-info">
                    <h4>{nombre}</h4>
                    <h5><strong>{puesto}</strong></h5>

                <div className="social-redes">
                    <a href="tel:+573008600740">
                    <div className="social-icon-box">
                        <img 
                            src={require('../../assets/img/facebook.png')} 
                            alt="Icono facebook" 
                            className="iphone"
                        />
                    </div>                    </a>
                    <a href="https://wa.me/573044698664" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/instagram.png')} 
                                alt="Icono instagram" 
                                className="iphone" 
                            />
                        </div>
                    </a>

                    <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/icono internet.png')} 
                                alt="Icono internet" 
                                className="iphone" 
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Contacto;
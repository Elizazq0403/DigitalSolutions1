import "./Cliente.css";
import { AiFillCloseCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { RiQrCodeFill } from "react-icons/ri";
import ListProductos from "../../pages/Productos/ListProductos";

const Cliente = (props) => {
    const { nombre, puesto, foto, equipo, id, fav } = props.datos;
    const { colorPrimario } = props;

    return (
        <div className="cliente-card ">
            <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
                <h2 className="cliente-titulo">Web-Z  Digitals Solutions</h2>
                <img src={foto} alt={nombre} />
            </div>

            <div className="cliente-info">
                    <h4>{nombre}</h4>
                    <h5><strong>{puesto}</strong></h5>

                <div className="social-links">
                    <a href="tel:+573216921887">
                    <div className="social-icon-box">
                        <img 
                            src={require('../../assets/img/icono llamar.png')} 
                            alt="Icono Llamar" 
                            className="iphone"
                        />
                        <span className="icon-label"><strong>Llamar</strong></span>
                    </div>
                                        </a>
                    <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/email.png')} 
                                alt="Icono Email" 
                                className="whatsapp-icon" 
                            />
                        <span className="icon-label"><strong>Correo</strong></span>
                        </div>
                    </a>

                    <a href="https://wa.me/573216921887" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/whatsapp.png')} 
                                alt="Icono WhatsApp" 
                                className="iphone" 
                            />
                        <span className="icon-label"><strong>Whatsapp</strong></span>
                        </div>
                    </a>
                    <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/descarga.png')} 
                                alt="Icono Descargar" 
                                className="iphone" 
                            />
                        <span className="icon-label"><strong>Contacto</strong></span>    
                        </div>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/compartir2.png')} 
                                alt="Icono Compartir" 
                                className="iphone" 
                            />
                        <span className="icon-label"><strong>Compartir Wp</strong></span>
                        </div>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/compartir.png')} 
                                alt="Icono Compartir" 
                                className="iphone" 
                            />
                        <span className="icon-label"><strong>Compartir QR</strong></span>
                        </div>
                    </a>
                </div>
            </div>
            <div className="cliente-inf">
                <div className="social-redes">
                    <div class="cuadrado-con-borde-int">
                        <div class="borde-interno-rojo">
                        <img 
                            src={require('../../assets/img/CODIGO QR.jpeg')} 
                            alt="Icono Compartir" 
                            className="qr-imagen" 
                        />  
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Cliente;

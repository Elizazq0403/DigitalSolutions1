import "./Cliente.css";
import { AiFillCloseCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { RiQrCodeFill } from "react-icons/ri";
import ListProductos from "../../pages/Productos/ListProductos";
import hexToRgba from 'hex-to-rgba';
import { useNavigate } from 'react-router-dom';

const Cliente = (props) => {
    const { nombre, puesto, foto, equipo, id, fav } = props.datos;
    const { colorPrimario } = props;

    const navigate = useNavigate();

    const irACodigoQR = () => {
        navigate('/Productos#qr');
    };

    return (
        <div className="cliente-card">
            <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
                <h2 className="cliente-titulo">Asher Industriales S.A.S     </h2>
                <img src={foto} alt={nombre} style={{ border: `4px solid ${colorPrimario}` }} />
            </div>

            <div className="cliente-info">
            <h4 style={{ color: colorPrimario }}>{nombre}</h4>
                <h5><strong>{puesto}</strong></h5>
                <div className="social-links">
                    <a href="tel:+573206942009">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/icono llamar.png')} 
                                alt="Icono Llamar" 
                                className="iphone"
                            />
                            <span className="icon-label"><strong>Llamar</strong></span>
                        </div>
                    </a>
                    <a href="mailto:gerencia@asherindustriales.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/email.png')} 
                                alt="Icono Email" 
                                className="whatsapp-icon" 
                            />
                            <span className="icon-label"><strong>Correo</strong></span>
                        </div>
                    </a>

                    <a href="https://wa.me/573206942009" target="_blank" rel="noopener noreferrer">
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
                    <a 
                        href="https://api.whatsapp.com/send?text=https://elizazq0403.github.io/DigitalSolutions1/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
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
                            <span className="icon-label"><strong>QR Pagos</strong></span>
                        </div>
                    </a>
                </div>
            </div>

            <div className="cliente-inf">
                <div className="social-redes">
                    <div className="cuadrado-con-borde-int">
                    <div className="borde-interno-rojo" style={{ border: `3px solid ${colorPrimario}` }}>
                            <img 
                                src={require('../../assets/img/CODIGO QR.jpg')} 
                                alt="QR" 
                                className="tarjeta-qr-imagen" 
                            />  
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Cliente;

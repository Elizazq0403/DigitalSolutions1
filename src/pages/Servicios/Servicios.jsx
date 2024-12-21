import "./Servicios.css"
import { AiFillCloseCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { RiQrCodeFill } from "react-icons/ri";
import ListProductos from "../../pages/Productos/ListProductos";
import hexToRgba from 'hex-to-rgba';
import fotoProductos from "../../assets/img/icono productos.png"

const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, foto, nombre } = props.datos;
  

  const obj = {
    //backgroundColor: hexToRgba(colorPrimario, 0.6)
  };

  return (
    <section className="equipo" style={obj}>
      <div className="colaborador">
        <div className="encabezado" style={{ backgroundColor: colorPrimario }}>
        <img src={fotoProductos} alt={nombre} />
        </div>
        <div className="info">
          <ListProductos />
        </div>
      </div>
    </section>
  );
};

export default Servicios;
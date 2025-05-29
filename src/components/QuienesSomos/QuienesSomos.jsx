import React from "react";
import "./QuienesSomos.css";

/* Descripci */
const QuienesSomos = () => {
  return (
    <div className="">
  <div className="phase phase-right">
    <div className="phase-content">
      <h2 className="phase-title">
        <strong>QUIENES SOMOS</strong>
      </h2>
      <p>
        ¡Bienvenidos a ASHER INDUSTRIALES! Somos una empresa ferretera de asesoría técnica y venta de herramientas para montaje y mantenimiento industrial.
      </p>
    </div>

    <img
      src={require("../../assets/img/Quienes-Somos.png")}
      alt="Icono representativo"
      className="phase-icon"
    />
  </div>

  <div className="phase">
  <img
      src={require("../../assets/img/Excelencia.png")}
      alt="Icono representativo"
      className="phase-icon"
    />
    <div className="phase-content">
      <h2 className="phase-title">
        <strong>COMPROMISO</strong>
      </h2>
      <p>
        Nuestro compromiso es satisfacer las necesidades en las herramientas industriales de nuestros clientes con asesoría y productos de calidad que cumplan con las expectativas en sus mantenimientos y montajes Industriales.
      </p>
    </div>
  </div>

  <div className="phase phase-right">
    <div className="phase-content">
      <h2 className="phase-title">
        <strong>BDS MASCHINEN</strong>
      </h2>
      <p>
        <>Distribuidores <b>BDS MASCHINEN</b> autorizados para Colombia. Es un fabricante “Hecho en Alemania” clase Premium de taladros magnéticos anulares, cortadores y la placa de máquinas de biselado.</>
      </p>
    </div>
    <img
      src={require("../../assets/img/compromiso.png")}
      alt="Icono representativo"
      className="phase-icon"
    />
  </div>

  <div className="phase">
  <img
      src={require("../../assets/img/Otros_productos.png")}
      alt="Icono representativo"
      className="phase-icon"
    />
    <div className="phase-content">
      <h2 className="phase-title">
        <strong>DIFERENTES MODELOS</strong>
      </h2>
      <p>
        BDS fabrica 30 modelos diferentes, para satisfacer las necesidades de perforación por núcleos, modelos especiales para perforación de vías férreas, estructuras metálicas, modelos de alimentación automática.
      </p>
    </div>
  </div>

  <div className="phase phase-right">
    <div className="phase-content">
      <h2 className="phase-title">
        <strong>OTRAS LINEAS</strong>
      </h2>
      <p>
        Asher Industriales es un proveedor aliado de herramientas eléctricas y manuales de alto rendimiento. Manejamos diversas marcas líderes del sector industrial.
      </p>
    </div>
    <img
      src={require("../../assets/img/Otras_lineas.png")}
      alt="Icono representativo"
      className="phase-icon"
    />
  </div>
</div>

  );
};

export default QuienesSomos;

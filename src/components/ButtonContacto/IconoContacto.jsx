import React from "react";
import "./IconoContacto.css"; // donde tienes los estilos .button, etc.

const IconoContacto = ({ icono, texto, color }) => {
  return (
    <button className="button" style={{ "--clr": color }}>
      <span className="button-decor"></span>
      <div className="button-content">
        <div className="button__icon">{icono}</div>
        <span className="button__text">{texto}</span>
      </div>
    </button>
  );
};

export default IconoContacto;

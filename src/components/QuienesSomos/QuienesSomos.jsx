import React from "react";
import "./QuienesSomos.css";

/* Descripci */
const QuienesSomos = () => {
  return (
    <div className="">
      <div className="phase phase-right">
        <div className="phase-content">
          <h2 className="phase-title">QUIENES SOMOS</h2>
          <p>
            Somos un negocio digital dedicado a transformar la forma en que las personas y las organizaciones se presentan al mundo en pleno siglo XXI.
          </p>
        </div>
        <div className="phase-icon">💻</div>
      </div>
      <div className="phase">
        <div className="phase-icon">👥</div>
        <div className="phase-content">
          <h2 className="phase-title">100% DIGITAL</h2>
          <p>
            Diseñamos tarjetas de presentación digitales, innovadoras y personalizadas. Nuestro enfoque combina diseño creativo, moderno y de última tecnología.
          </p>
        </div>
      </div>
      <div className="phase phase-right">
        <div className="phase-content">
          <h2 className="phase-title">ACCESIBILIDAD</h2>
          <p>
            Este producto es accesible para todas las personas y empresas que deseen conectarse y compartir la información de sus productos a un solo clic.
          </p>
        </div>
        <div className="phase-icon">👍</div>
      </div>
      <div className="phase">
        <div className="phase-icon">📊</div>
        <div className="phase-content">
          <h2 className="phase-title">DISEÑO WEB</h2>
          <p>
            Su diseño intuitivo permite compartirse fácilmente mediante un enlace, código QR o a través de redes sociales, llegando a miles de personas en internet, desde cualquier dispositivo.
          </p>
        </div>
      </div>
      <div className="phase phase-right">
        <div className="phase-content">
          <h2 className="phase-title">ACOMPAÑAMIENTO</h2>
          <p>
            Brindamos un acompañamiento oportuno, asegurándonos de que entiendas cada paso y descubras cómo sacarle el mayor provecho a nuestras soluciones y alcanzar tus objetivos.
          </p>
        </div>
        <div className="phase-icon">💡</div>
      </div>
    </div>
  );
};

export default QuienesSomos;

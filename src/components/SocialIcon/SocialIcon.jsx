import React from "react";
import "./SocialIcon.css";

const SocialIcon = ({ 
  icon, 
  color = "#1877f2", 
  link = "#", 
  tooltip = "Social", 
  onClick // 👈 agregamos esta prop
}) => {

  const handleClick = () => {
    if (onClick) {
      onClick(); // 👈 ejecuta la función pasada (por ejemplo toggleQR)
    } else if (link && link !== "#") {
      window.open(link, "_blank"); // 👈 solo abre si hay link válido
    }
  };

  return (
    <ul className="wrapper">
      <li
        className="icon"
        style={{ "--hover-color": color }}
        onClick={handleClick} // 👈 usamos la función condicional
      >
        <span className="tooltip">{tooltip}</span>
        {icon}
      </li>
    </ul>
  );
};

export default SocialIcon;


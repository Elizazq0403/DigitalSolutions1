import React from "react";
import "./SocialIcon.css"; // los estilos los ves abajo

const SocialIcon = ({ icon, color = "#1877f2", link = "#", tooltip = "Social" }) => {
  return (
    <ul className="wrapper">
      <li
        className="icon"
        style={{ "--hover-color": color }}
        onClick={() => window.open(link, "_blank")}
      >
        <span className="tooltip">{tooltip}</span>
        {icon}
      </li>
    </ul>
  );
};

export default SocialIcon;

import React from "react";
import "./CardIcons.css";

const CardIcons = ({ icons }) => {
  return (
    <div className="card">
      {icons.map((icon, index) => (
        <a
          key={index}
          className={`social-link${index + 3}`}
          onClick={icon.onClick}
          href={icon.link}
          target={icon.link ? "_blank" : undefined}
          rel="noopener noreferrer"
        >
          {icon.component}
        </a>
      ))}
    </div>
  );
};

export default CardIcons;


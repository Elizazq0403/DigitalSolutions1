import React from 'react';
import './CargandoPagina.css'; // O los estilos inline

const CargandoPagina = ({ size = 'medium', color = '#00c02e' }) => {
  // Tamaños predefinidos
  const sizeMap = {
    small: { container: 60, dot: 12 },
    medium: { container: 80, dot: 16 },
    large: { container: 100, dot: 20 }
  };

  const { container, dot } = sizeMap[size] || sizeMap.medium;

  // Estilos inline si no quieres CSS separado
  const styles = {
    loadingContent: {
      position: 'relative',
      width: `${container}px`,
      height: `${container}px`,
      margin: '0 auto',
      filter: 'url(#gooey)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    liquid: {
      position: 'absolute',
      width: `${dot}px`,
      height: `${dot}px`,
      borderRadius: '50%',
      backgroundColor: color,
      animation: 'animate 4s ease-in-out infinite',
      animationDelay: 'calc(0.2s * var(--i))'
    },
    svg: {
      width: 0,
      height: 0
    }
  };

  return (
    <>
      <div className="loading-content" style={styles.loadingContent}>
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="liquid"
            style={{
              ...styles.liquid,
              '--i': i,
              animationDelay: `calc(0.2s * ${i})`
            }}
          />
        ))}
      </div>
      
      <svg className="svg" style={styles.svg}>
        <filter id="gooey">
          <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
          <feColorMatrix
            values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
          />
        </filter>
      </svg>
    </>
  );
};

export default CargandoPagina;
// src/components/CustomImageCarousel.jsx

import React from 'react';
import { Carousel } from 'antd';

const CarruselProductos = ({ images }) => {
  return (
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={image.alt || `Imagen ${index + 1}`}
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarruselProductos;


import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import { List, Pagination } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import './ListProductos.css';
import { TbJewishStarFilled } from "react-icons/tb";

const productos = [
  {
    className: 'phase-title',
    title: 'OTRAS LÍNEAS',
    content: (
      <p className="justificado">
        Eslingas, Cadenas, Máquinas de chaflán, Herramientas de corte, Herramientas eléctricas y manuales, Taladro magnético básico, Taladro magnético roscador.
      </p>
    ),
    image: require('../../assets/img/Otras_lineas.jpg'),
  },
  {
    href: 'https://www.youtube.com/watch?v=X9TmJamuFUk&ab_channel=HoGiaPhat',
    title: 'Taladro MAB 845',
    content: (
      <p className="justificado">
        La clásica entre los taladros de broca hueca con base magnética grandes de BDS. Para sacanúcleos de hasta Ø 100 mm y 110 mm de profundidad de corte. Apta para brocas espirales, escariadoras, avellanadoras y roscadoras.
      </p>
    ),
    image: require('../../assets/img/MAB 845.jpg'),
  },
  {
    href: 'https://www.ejemplo.com/producto-3',
    title: 'Zapatos de cuero',
    description: 'Zapatos elegantes hechos a mano.',
    content: 'Disponibles desde la talla 38 a 44.',
    image: require('../../assets/img/bds-maschinen.jpg'),
  },
];

const listData = productos.map(prod => ({
  href: prod.href,
  title: prod.title,
  description: prod.description,
  content: prod.content,
  image: prod.image,
}));

const ListProductos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  const paginatedData = listData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="equipo">
      {/* <h4 className="phase-title">LÍNEAS DE PRODUCTOS</h4>

      <div className="estrellas">
        {[...Array(5)].map((_, i) => (
          <TbJewishStarFilled key={i} className="estrella-icono" />
        ))}
      </div>*/}

      <ul className="lista-productos">
        <li>Distribuidores autorizados:</li>
      </ul>

      <ul>
      <li className="phase-title-li">
        <a href="https://bds-machines.es/" target="_blank" rel="noopener noreferrer">
          BDS Maschinen en Colombia
        </a>
      </li>
    </ul>


      <List
        itemLayout="vertical"
        size="large"
        dataSource={paginatedData}
        
        /*footer={
          <div>
            <b>Asher</b> Industriales S.A.S
          </div>
        }*/
        
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={
              <div style={{ width: 272, position: 'relative', marginTop: '20px' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  //bottom: 10,
                  right: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}>
                  <LikeOutlined style={{ cursor: 'pointer' }} />
                  <span>156</span>
                </div>
              </div>
            }
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title || 'Producto'}</a>}
              description={item.description}
            />
            <div style={{ whiteSpace: 'pre-line' }}>
              {item.content}
            </div>
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={listData.length}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default ListProductos;


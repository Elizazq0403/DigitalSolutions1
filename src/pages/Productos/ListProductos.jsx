import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import { List, Avatar, Pagination } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './ListProductos.css'; // Importa el archivo CSS
import hexToRgba from 'hex-to-rgba';
import CarruselProductos from '../../components/carruselProductos/CarruselProductos';
import { TbJewishStarFilled } from "react-icons/tb";


const productos = [
  {
  href: 'https://www.ejemplo.com/producto-1',
  content: (
     
    <p class="justificado">
      
   Eslingas, Cadenas, Máquinas de chaflán, Herramientas de corte, Herramientas eléctricas y manuales, Taladro magnético básico, Taladro magnético roscador.
</p>


  ),
},
  {
    href: 'https://www.youtube.com/watch?v=X9TmJamuFUk&ab_channel=HoGiaPhat',
    title: 'Taladro MAB 845',
    //description: 'Ideal para oficina o uso casual.',
    content: 
    <p className="justificado">
      La clásica entre los taladros de broca hueca con base magnética grandes de BDS. Para sacanúcleos de hasta Ø 100 mm y 110 mm de profundidad de corte. El inicio en la clase superior con más potencia y más flexibilidad. Apta para brocas espirales, escariadoras, avellanadoras y roscadoras.
    </p>
    
  },
  {
    href: 'https://www.ejemplo.com/producto-3',
    title: 'Zapatos de cuero',
    description: 'Zapatos elegantes hechos a mano.',
    content: 'Disponibles desde la talla 38 a 44.'
  },
];

<List
  itemLayout="vertical"
  dataSource={productos}
  renderItem={(item) => (
    <List.Item>
      <List.Item.Meta
        title={<a href={item.href}>{item.title || 'Producto'}</a>}
        description={item.description}
      />
      {/* Asegúrate de usar pre-line para mostrar los saltos de línea */}
      <div style={{ whiteSpace: 'pre-line' }}>
        {item.content}
      </div>
    </List.Item>
  )}
/>


const listData = [];

for (let i = 0; i < productos.length; i++) {
  listData.push({
    href: productos[i].href,
    title: productos[i].title,
    description: productos[i].description,
    content: productos[i].content,
  });
}



const actions = [

  { type: <LikeOutlined />, text: '156' },
  
];


const renderActions = () => (
  actions.map((action, index) => (
    <span key={index} style={{ marginRight: 8 }}>
      {action.type} {action.text}
    </span>
  ))
);


const ListProductos = () => {

 
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 1;


  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
  };


  const paginatedData = listData.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Programación", // El único equipo
    colorPrimario: "#606060",
    colorSecundario: "#373738"
  }]);


  const actualizarColor = (color, id) => {
    console.log("Actualizar: ", color, id);
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        equipo.colorPrimario = color;
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };
 

  const imageData = [
  { src: require('../../assets/img/Otras_lineas.jpg'), alt: 'Producto 1' },
  { src: require('../../assets/img/MAB 845.jpg'), alt: 'Producto 2' },
  { src: require('../../assets/img/bds-maschinen.jpg'), alt: 'Producto 3' },
  ];

  return (
    <div className="equipo"> {/* Aplica la clase equipo */}

      
    
      <h3 className="pdtos-titulo">Líneas de Productos</h3>

      <div className="estrellas">
        <TbJewishStarFilled className="estrella-icono" />
        <TbJewishStarFilled className="estrella-icono" />
        <TbJewishStarFilled className="estrella-icono" />
        <TbJewishStarFilled className="estrella-icono" />
        <TbJewishStarFilled className="estrella-icono" />
        
      </div>


      <ul className='lista-productos'>  
        <li>DISTRIBUIDORES AUTORIZADOS:</li>
      </ul> 

      <ul className='lista-productos'>  
        <li>BDS Maschinen en Colombia</li>
      </ul>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={paginatedData}
        footer={
          <div>
            <b>Asher</b> Industriales
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={renderActions()}
            extra={
              <div style={{ width: 272 }}>
                <CarruselProductos images={imageData} />
              </div>
              }
          >
            <List.Item.Meta
              //avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={listData.length}
        onChange={handlePageChange}
      />
    </div>
  );
};


export default ListProductos;
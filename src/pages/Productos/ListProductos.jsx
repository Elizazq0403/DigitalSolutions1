import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import { List, Avatar, Pagination } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './ListProductos.css'; // Importa el archivo CSS
import hexToRgba from 'hex-to-rgba';


const productos = [
  {
  href: 'https://www.ejemplo.com/producto-1',
  content: (
    <ul>
      <li>• BDS Maschinen</li>
      <li>• Eslingas</li>
      <li>• Maquinas de chaflan</li>
      <li>• Herramientas de corte</li>
      <li>• Herramientas Eléctricas</li>
      <li>• Herramientas Manuales</li>
      <li>• Taladro Magnético Básico</li>
      <li>• Taladro Magnético Roscador</li>
    </ul>
  ),
},
  {
    href: 'https://www.ejemplo.com/producto-2',
    title: 'Pantalón clásico',
    description: 'Ideal para oficina o uso casual.',
    content: 'Material: algodón. Colores: azul, negro.'
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
  { type: <StarOutlined />, text: '156' },
  { type: <LikeOutlined />, text: '156' },
  { type: <MessageOutlined />, text: '2' },
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
 



  return (
    <div className="equipo"> {/* Aplica la clase equipo */}
    
      <h3 className="pdtos-titulo">Líneas de Productos</h3>
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
              <img 
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              
              />
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
import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import { List, Avatar, Pagination } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './ListProductos.css'; // Importa el archivo CSS


const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `Producto ${i}`,
    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
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
      <h3>Lista de Productos</h3>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={paginatedData}
        footer={
          <div>
            <b>Ant Design React</b> footer part
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
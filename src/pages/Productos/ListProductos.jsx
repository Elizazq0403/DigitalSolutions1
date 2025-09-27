import React, { useEffect, useState } from "react";
import { List, Pagination } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import "./ListProductos.css";

const ListProductos = ({ empresaId }) => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  useEffect(() => {
  console.log("👉 empresaId recibido en ListProductos:", empresaId);
  const fetchProductos = async () => {
    try {
      if (!empresaId) {
        console.warn("⚠️ empresaId no recibido en ListProductos");
        return;
      }

      const response = await fetch(`http://localhost:5000/productos/${empresaId}`);
      const data = await response.json();
      console.log("👉 Productos recibidos:", data);
      setProductos(data);
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
    }
  };

  fetchProductos();
}, [empresaId]);


  const paginatedData = productos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="equipo">
      {/* Título general 
      <ul className="lista-productos">
        <li>{productos[0]?.titulo || "Distribuidores autorizados"}</li>
      </ul>*/}


      <List
      itemLayout="vertical"
      size="large"
      dataSource={paginatedData}
      renderItem={(item) => (
        <List.Item
          key={item.numero_producto}
          extra={
            <div style={{ width: 272, position: "relative", marginTop: "20px" }}>
              <img
                src={item.link_imagen_producto} 
                alt={item.titulo}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  display: "block",
                  objectFit: "cover",
                  margin: "0 auto",
                  justifyContent: "center",
                }}
              />
            </div>
          }
        >
          {/* 🔹 Descripción 1 dinámica */}
          <ul>
            <li className="phase-title-li">
              <a
                href={item.link_producto || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.descripcion1 || "Descripción principal"}
              </a>
            </li>
          </ul>

          {/* 🔹 Descripción 2 dinámica (ya estaba bien) */}
          <List.Item.Meta
            title={<a href={item.link_producto}>{item.titulo}</a>}
            description={item.descripcion2}
          />
        </List.Item>
      )}
    />


      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={productos.length}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default ListProductos;



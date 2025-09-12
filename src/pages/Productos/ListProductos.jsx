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
      {/* Título general */}
      <ul className="lista-productos">
        <li>{productos[0]?.titulo || "Distribuidores autorizados"}</li>
      </ul>

      {/* Descripción 1 (ejemplo, primer producto o fijo según BD) */}
      <ul>
        <li className="phase-title-li">
          <a
            href={productos[0]?.link_producto || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {productos[0]?.descripcion1 || "Descripción principal"}
          </a>
        </li>
      </ul>

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
                  }}
                />
                {/* Contador de likes (me gusta) 
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  <LikeOutlined style={{ cursor: "pointer" }} />
                  <span>156</span>
                </div>*/}
              </div>
            }
          >
            <List.Item.Meta
              title={<a href={item.link_producto}>{item.titulo}</a>}
              description={item.descripcion2}
            />
            <div style={{ whiteSpace: "pre-line" }}>{item.descripcion2}</div>
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



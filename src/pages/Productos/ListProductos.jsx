import React, { useEffect, useState } from "react";
import { List, Pagination } from "antd";
import "./ListProductos.css";
import { getApiUrl } from "../../../src/api/config.js";

// 🔹 Componente para renderizar imagen O video
const MediaRenderer = ({ src, alt, style }) => {
  // Detectar si es video por la extensión del archivo
  const isVideo = () => {
    if (!src) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
  };

  if (isVideo()) {
    return (
      <video
        controls
        style={style}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    );
  }

  // Por defecto, asumimos que es una imagen
  return <img src={src} alt={alt} style={style} />;
};

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

        const response = await fetch(getApiUrl(`/productos/${empresaId}`));
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
      <List
        itemLayout="vertical"
        size="large"
        dataSource={paginatedData}
        renderItem={(item) => (
          <List.Item
            key={item.numero_producto}
            extra={
              <div style={{ width: 272, position: "relative", marginTop: "20px" }}>
                {/* 🔹 Usamos MediaRenderer en lugar de img directamente */}
                <MediaRenderer
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
            <ul>
              <li className="phase-title-li">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.descripcion1 || "Descripción principal"}
                </a>
              </li>
            </ul>

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



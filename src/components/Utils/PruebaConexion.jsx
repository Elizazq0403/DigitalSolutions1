import { useEffect, useState } from 'react';
import axios from 'axios';

function PruebaConexion() {
  const [mensaje, setMensaje] = useState("Conectando...");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/prueba")
      .then(res => setMensaje(res.data.message))
      .catch(() => setMensaje("❌ No se pudo conectar con el backend"));
  }, []);

  return (
    <div>
      <h2>Prueba de Conexión</h2>
      <p>{mensaje}</p>
    </div>
  );
}

export default PruebaConexion;

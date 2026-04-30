import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const CodigoQR = ({ colorPrimario }) => {
  // 1. Fijamos el slug como 'webz' por ser tu usuario administrador
  const adminSlug = 'webz-qr'; 
  
  // 2. Iniciamos con tu URL por defecto, pero permitimos que la borres/cambies
  const [url, setUrl] = useState(`https://tudcard.com/#/cliente/${adminSlug}/perfil`);
  const [qr, setQr] = useState('');
  const [error, setError] = useState('');

  const settings = {
    width: 500,
    margin: 4,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  };

  const generateQR = async (targetUrl) => {
    setError('');
    const finalUrl = targetUrl || url;
    
    if (!finalUrl.trim()) {
      setError('Por favor ingresa una URL válida');
      return;
    }

    try {
      const qrCode = await QRCode.toDataURL(finalUrl, settings);
      setQr(qrCode);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('No se pudo generar el QR.');
    }
  };

  // Se genera tu QR de administradora apenas entras
  useEffect(() => {
    generateQR();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      
      {error && (
        <div style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://tudcard.com/..."
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: `2px solid ${colorPrimario || '#1379db'}`, 
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>
      
      <button 
        onClick={() => generateQR()}
        style={{ 
          padding: '12px 24px', 
          background: colorPrimario || '#1379db', 
          color: 'white', 
          border: 'none', 
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%',
          transition: 'opacity 0.2s'
        }}
      >
        Generar Nuevo Código
      </button>
      
      {qr && (
        <div style={{ marginTop: '30px', textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '15px', border: '1px solid #eee' }}>
          <img 
            src={qr} 
            alt="QR Code" 
            style={{ maxWidth: '250px', width: '100%', border: '1px solid #ddd', padding: '10px', backgroundColor: 'white', borderRadius: '8px' }} 
          />
          <div style={{ marginTop: '15px' }}>
            <a 
              href={qr} 
              download={`QR-Admin-${adminSlug}.png`}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: '#388e3c',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            >
              ⬇️ Descargar para Cliente
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodigoQR;
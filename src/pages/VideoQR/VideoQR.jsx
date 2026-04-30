import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const VideoQR = ({ slug, datosCompletos, colorPrimario }) => {
  const [qr, setQr] = useState('');
  const iconoDefault = "https://tudcard.com/img/icono-default.png";
  
  // URL dinámica basada en el slug
  const urlDinamica = `https://tudcard.com/#/cliente/${slug}/perfil`;

  useEffect(() => {
    const renderizarQR = async () => {
      // Priorizamos el link_qr de la base de datos
      if (datosCompletos?.link_qr) {
        setQr(datosCompletos.link_qr);
      } else {
        try {
          const qrLocal = await QRCode.toDataURL(urlDinamica, {
            width: 500,
            margin: 4,
            errorCorrectionLevel: 'H'
          });
          setQr(qrLocal);
        } catch (err) {
          console.error('Error generando QR fallback:', err);
        }
      }
    };

    renderizarQR();
  }, [datosCompletos, slug, urlDinamica]);

  // LÓGICA DE FOTO: Buscamos link_foto (personal) antes que link_logo (empresa)
  const fotoPerfil = datosCompletos?.link_foto || datosCompletos?.link_logo || iconoDefault;

  return (
    <div className="cliente-contenedor" style={{ padding: '0px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '450px', margin: '20px auto' }}>
      
      {/* --- ENCABEZADO ESTILO CLIENTE.JSX --- */}
      <header className="cliente-header" style={{ position: 'relative', marginBottom: '60px' }}>
        <div style={{ 
          backgroundColor: colorPrimario || '#1379db', 
          height: '140px', 
          width: '100%' 
        }}></div>
        
        {/* Foto de Perfil Circular */}
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          padding: '5px',
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}>
          <img 
            src={fotoPerfil} 
            alt="Foto de Perfil" 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: `3px solid #fff` // Borde blanco para resaltar sobre el fondo
            }} 
            onError={(e) => { e.target.src = iconoDefault; }}
          />
        </div>
      </header>

      {/* --- CUERPO DEL QR --- */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
          {datosCompletos?.nombre_completo || datosCompletos?.razon_social || 'Tu D-Card'}
        </h2>
        <p style={{ fontSize: '1rem', color: colorPrimario || '#1379db', fontWeight: '600', marginBottom: '25px' }}>
          {datosCompletos?.puesto || 'Consultor'}
        </p>

        {qr && (
          <section className="seccion-codigo-qr">
            <div style={{
              padding: '15px',
              backgroundColor: '#fff',
              borderRadius: '25px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
              display: 'inline-block',
              marginBottom: '20px'
            }}>
              <div style={{ 
                  border: `3px solid ${colorPrimario || '#1379db'}`, 
                  borderRadius: '15px',
                  padding: '10px',
                  lineHeight: 0
              }}>
                <img
                  src={qr} 
                  alt="QR Dinámico"
                  style={{ width: '100%', maxWidth: '240px', display: 'block' }}
                  onError={(e) => { e.target.src = iconoDefault; }}
                />
              </div>
            </div>
            
            <div style={{ marginTop: '10px', paddingBottom: '20px' }}>
              <p style={{ 
                fontWeight: '800', 
                color: '#333', 
                textTransform: 'uppercase', 
                fontSize: '13px', 
                letterSpacing: '1px' 
              }}>
                Escanea • Conecta • Comparte
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VideoQR;
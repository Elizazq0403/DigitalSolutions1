import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { ImWhatsapp } from "react-icons/im";

const VideoQR = ({ slug, datosCompletos, colorPrimario, colorSecundario }) => {
  const [qr, setQr] = useState('');
  const avatarDefault = "https://tudcard.com/img/avatar-default.png";
  const logoDCard = "https://tudcard.com/img/Logo-video-ok.png";
  
  const urlDinamica = `https://tudcard.com/#/cliente/${slug}/perfil`;

  useEffect(() => {
    const renderizarQR = async () => {
      if (datosCompletos?.link_qr) {
        setQr(datosCompletos.link_qr);
      } else {
        try {
          const qrLocal = await QRCode.toDataURL(urlDinamica, {
            width: 600,
            margin: 2,
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

  const fotoPerfil = datosCompletos?.link_foto || datosCompletos?.link_logo || avatarDefault;

  return (
    <div className="cliente-contenedor" style={{ padding: '0px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '340px', margin: '20px auto' }}>
      
      {/* --- ENCABEZADO --- */}
      <header className="cliente-header" style={{ position: 'relative', marginBottom: '60px' }}>
        <div style={{ backgroundColor: colorPrimario || '#1379db', height: '140px', width: '100%' }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          padding: '0px',
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          lineHeight: 0
        }}>
          <img 
            src={fotoPerfil} 
            alt="Foto de Perfil" 
            style={{ 
              width: '140px', 
              height: '140px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: `4px solid ${colorSecundario}` 
            }} 
            onError={(e) => { e.target.onerror = null; e.target.src = avatarDefault; }}
          />
        </div>
      </header>

      {/* --- CUERPO DEL QR --- */}
      <div style={{ padding: '20px' }}>
        
        {/* Nombre de la Empresa */}
        <div className="cliente-info">
          <h2 style={{ 
            color: colorPrimario, 
            fontSize: '26px', 
            fontWeight: '600', 
            marginBottom: '15px' 
          }}>
            {datosCompletos?.empresa?.razon_social || datosCompletos?.razon_social || 'D-Card'}
          </h2>
        </div>

        {qr && (
          <section className="seccion-codigo-qr">
            <div style={{
              position: 'relative', 
              display: 'inline-block',
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '25px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
              marginBottom: '10px' // Reducido para que el teléfono quede cerca
            }}>
              <img
                src={qr} 
                alt="QR Dinámico"
                style={{ width: '100%', maxWidth: '240px', display: 'block' }}
              />

              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '5px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={logoDCard} 
                  alt="D-Card Logo Center" 
                  style={{ width: '100px', height: 'auto' }} 
                />
              </div>
            </div>
            
            {/* Contenedor Inferior Centrado */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              
              {/* Grupo de WhatsApp Centrado */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '5px'
              }}>
                <ImWhatsapp style={{ color: '#25D366', fontSize: '24px' }} />
                <span className="cliente-info" style={{ 
                  color: colorPrimario, 
                  fontSize: '22px', // Un poco más grande para resaltar
                  fontWeight: '700' 
                }}>
                  {datosCompletos?.empresa?.telefono || datosCompletos?.telefono || 'D-Card'}
                </span>
              </div>

              <p className="cliente-info" style={{ fontSize: '18px', margin: 0, opacity: 0.8 }}>
                Escanea · Conecta · Impacta
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VideoQR;
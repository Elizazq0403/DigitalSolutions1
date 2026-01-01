import { useState, version } from 'react'
import QRCode from 'qrcode'
import './CodigoQR.css'

function CodigoQR() {
  console.log("🚀 Componente CodigoQR MONTADO");

  const [url, setUrl] = useState('');
  const [qr, setQr] = useState('');

  const settings = {
    width: 500,
    margin: 2,
    version: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  }

  const generateQR = async () => {
    try {
      const qrCode = await QRCode.toDataURL(url, settings)
      setQr(qrCode)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Generate QR</h1>
      <input
        type="text"
        placeholder="https://google.com"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <button onClick={() => generateQR()}>Generate</button>
      {qr && (
        <>
          <img src={qr} alt="QR Code" />
          <a href={qr} download="qr-code.png">Download</a>
        </>
      )}
    </>
  )
}

export default CodigoQR
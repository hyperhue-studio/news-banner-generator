import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import '../styles/ImageUploader.css';
// Importar directamente la imagen de fondo
import backgroundImage from '../assets/images/background.jpg'; // Asegúrate de que el nombre y la extensión coincidan con la imagen que tienes

const ImageUploader: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 400, y: 200 }); // Posición inicial de la imagen - LÍNEA 9
  const [rotation, setRotation] = useState(0); // Rotación inicial - LÍNEA 10
  const [scale, setScale] = useState(1); // Escala inicial
  const containerRef = useRef<HTMLDivElement>(null);

  // Manejador para la carga de la imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador para cambiar la posición X
  const handlePositionXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition({ ...position, x: parseInt(e.target.value) }); // LÍNEA 28
  };

  // Manejador para cambiar la posición Y
  const handlePositionYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition({ ...position, y: parseInt(e.target.value) }); // LÍNEA 33
  };

  // Manejador para cambiar la rotación
  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(parseInt(e.target.value)); // LÍNEA 38
  };

  // Manejador para cambiar la escala
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  // Función para descargar la imagen
  const handleDownload = async () => {
    if (containerRef.current) {
      const canvas = await html2canvas(containerRef.current);
      const image = canvas.toDataURL('image/jpeg', 0.9); // Cambiado a JPEG con calidad 0.9
      const link = document.createElement('a');
      link.href = image;
      link.download = 'banner.jpg'; // Cambiado a .jpg
      link.click();
    }
  };

  return (
    <div className="image-uploader">
      <h2>Generador de Banner</h2>
      
      <div className="controls">
        <div className="upload-section">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            id="image-upload" 
          />
          <label htmlFor="image-upload" className="upload-button">
            Subir Imagen
          </label>
        </div>

        {uploadedImage && (
          <div className="adjustment-controls">
            <div className="control-group">
              <label>
                Posición X:
                <input 
                  type="range" 
                  min="0" 
                  max="800" 
                  value={position.x} 
                  onChange={handlePositionXChange} 
                />
                <span>{position.x}px</span>
              </label>
            </div>

            <div className="control-group">
              <label>
                Posición Y:
                <input 
                  type="range" 
                  min="0" 
                  max="400" 
                  value={position.y} 
                  onChange={handlePositionYChange} 
                />
                <span>{position.y}px</span>
              </label>
            </div>

            <div className="control-group">
              <label>
                Rotación:
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={rotation} 
                  onChange={handleRotationChange} 
                />
                <span>{rotation}°</span>
              </label>
            </div>

            <div className="control-group">
              <label>
                Escala:
                <input 
                  type="range" 
                  min="0.1" 
                  max="2" 
                  step="0.1" 
                  value={scale} 
                  onChange={handleScaleChange} 
                />
                <span>{scale.toFixed(1)}x</span>
              </label>
            </div>

            <button className="download-button" onClick={handleDownload}>
              Descargar Banner
            </button>
          </div>
        )}
      </div>

      <div className="preview-container" ref={containerRef}>
        <img 
          src={backgroundImage} 
          alt="Background" 
          className="template-image" 
        />
        
        {uploadedImage && (
          <img 
            src={uploadedImage} 
            alt="Uploaded" 
            className="uploaded-image" 
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`, // LÍNEA 136
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader; 
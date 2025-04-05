import React, { useEffect, useRef } from 'react';

const TemplateBanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Establecer el tamaño del canvas
    canvas.width = 800;
    canvas.height = 400;

    // Establecer fondo
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar un banner de estilo newsletter
    // Rectángulo superior
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, canvas.width, 100);

    // Título del banner
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NEWSLETTER SEMANAL', canvas.width / 2, 65);

    // Área para el contenido
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(50, 120, canvas.width - 100, canvas.height - 170);

    // Texto decorativo
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Coloca tu imagen aquí', canvas.width / 2, canvas.height / 2);

    // Círculo para indicar dónde va la imagen
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pie de página
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('www.miempresa.com', canvas.width / 2, canvas.height - 25);

    // Exportar canvas como imagen
    const templateImage = canvas.toDataURL('image/png');
    
    // Guardar la imagen en localStorage para usarla en la aplicación
    localStorage.setItem('templateImage', templateImage);
  }, []);

  return (
    <div style={{ display: 'none' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default TemplateBanner; 
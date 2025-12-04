const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Variables desde ConfigMap o valores por defecto
const bgColor = process.env.APP_COLOR || '#040811';
const title = process.env.APP_TITLE || 'Mi App con GitHub Flow + K8s';
const commit = process.env.GIT_COMMIT || 'desconocido';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: ${bgColor};
          color: #fff;
          font-family: 'Segoe UI', Arial, sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        h2 {
          font-size: 1.5rem;
          margin: 0.3rem 0;
        }
        p {
          font-size: 1rem;
          margin: 0.2rem 0;
        }
        footer {
          position: absolute;
          bottom: 10px;
          font-size: 0.9rem;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <h1>${title} 🚀</h1>
      <h2>Versión desplegada con Kubernetes</h2>
      <h2>WFB</h2>
      <p><strong>Commit:</strong> ${commit}</p>
      <p>Cambio de color automático vía ConfigMap</p>
      <footer>Powered by Express + K8s</footer>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
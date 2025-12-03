const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// NUEVO: leer color y título desde ConfigMap
const bgColor = process.env.APP_COLOR || '#1e64e6';
const title = process.env.APP_TITLE || 'Mi App con GitHub Flow + K8s';

app.get('/', (req, res) => {
  res.send(`
    <div style="background:${bgColor};height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;color:white;font-family:Arial">
      <h1>${title} 🚀</h1>
      <h2>Versión desplegada con Kubernetes</h2>
      <p>Commit: ${process.env.GIT_COMMIT || 'desconocido'}</p>
      <p>Cambio de color automático via ConfigMap</p>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

// Variables desde ConfigMap o valores por defecto
const bgColor = process.env.APP_COLOR || '#040811';
const title = process.env.APP_TITLE || 'Mi App con GitHub Flow + K8s';
const commit = process.env.GIT_COMMIT || 'desconocido';

app.get('/', (req, res) => {
  const hostname = os.hostname();
  const serverTime = new Date().toLocaleString('es-BO');

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
          background: ${bgColor};
          font-family: 'Segoe UI', Arial;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Fondo con animación */
        .bg-animado {
          position: absolute;
          width: 180%;
          height: 180%;
          background: radial-gradient(circle at 40% 40%, #ffffff22, transparent),
                      radial-gradient(circle at 70% 80%, #00e5ff22, transparent);
          animation: moveBg 10s infinite alternate ease-in-out;
          z-index: -1;
        }
        @keyframes moveBg {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(20deg) scale(1.15); }
        }

        .card {
          width: 90%;
          max-width: 650px;
          background: rgba(255, 255, 255, 0.12);
          padding: 35px;
          border-radius: 22px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          animation: fadeIn 1.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h1 { font-size: 2.6rem; margin-bottom: 8px; }
        h2 { font-size: 1.2rem; opacity: 0.9; }

        .tag {
          background: #00e5ff;
          color: #000;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: bold;
          display: inline-block;
          margin-top: 5px;
        }

        .info-box {
          margin-top: 25px;
          background: rgba(255,255,255,0.15);
          padding: 20px;
          border-radius: 14px;
          animation: levitar 3s infinite ease-in-out;
        }
        @keyframes levitar {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .info-box p { margin: 6px 0; font-size: 0.95rem; }

        /* Input dinámico */
        .input-box {
          margin-top: 25px;
          text-align: left;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          font-size: 1rem;
          outline: none;
          margin-top: 8px;
        }

        .resultado {
          margin-top: 15px;
          padding: 12px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          min-height: 40px;
          transition: all 0.3s ease;
        }

        .btn-refresh {
          margin-top: 25px;
          padding: 12px 20px;
          background: #00e5ff;
          color: #000;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
          font-size: 1rem;
        }
        .btn-refresh:hover {
          background: #fff;
          transform: scale(1.05);
        }

        footer {
          text-align: center;
          margin-top: 18px;
          opacity: 0.7;
          font-size: 0.9rem;
        }

      </style>
    </head>

    <body>

      <div class="bg-animado"></div>

      <div class="card">
        <h1>${title} 🚀</h1>
        <h2>Despliegue automatizado · CI/CD · Kubernetes</h2>
        <span class="tag">GitHub Flow</span>

        <div class="info-box">
          <p><strong>Commit:</strong> ${commit}</p>
          <p><strong>Hostname (Pod):</strong> ${hostname}</p>
          <p><strong>Hora del servidor:</strong> ${serverTime}</p>
          <p><strong>Color ConfigMap:</strong> ${bgColor}</p>
        </div>

        <!-- Input dinámico -->
        <div class="input-box">
          <label><strong>Escribe algo y lo mostraremos debajo:</strong></label>
          <input type="text" id="userInput" placeholder="Escribe algo aquí...">
          <div class="resultado" id="resultado"></div>
        </div>

        <button class="btn-refresh" onclick="location.reload()">🔄 Refrescar Página</button>

        <footer>Powered by Node.js · Express · Docker · Kubernetes</footer>
      </div>

      <script>
        // Mostrar texto en vivo
        const input = document.getElementById("userInput");
        const result = document.getElementById("resultado");

        input.addEventListener("input", () => {
          result.innerText = input.value === "" ? "" : input.value;
        });
      </script>

    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

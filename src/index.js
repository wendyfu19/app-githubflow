const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

// Variables desde ConfigMap o valores por defecto
const bgColor = process.env.APP_COLOR || '#040811';
const title = process.env.APP_TITLE || 'GitHub Flow & Canary Deployments';
const commit = process.env.GIT_COMMIT || 'desconocido';

app.get('/', (req, res) => {
  const hostname = os.hostname();
  const serverTime = new Date().toLocaleString('es-BO');

  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-dark: #040811;
            --primary-blue: #0a1a3a;
            --secondary-blue: #1a3a5f;
            --accent-orange: #ff6b35;
            --accent-green: #4ecdc4;
            --accent-yellow: #ffd166;
            --text-light: #f7f9fc;
            --text-gray: #b8c1d1;
            --danger-red: #ef476f;
            --success-green: #06d6a0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: ${bgColor};
            color: var(--text-light);
            line-height: 1.6;
            min-height: 100vh;
            background-image: 
              radial-gradient(circle at 15% 50%, rgba(26, 58, 95, 0.1) 0%, transparent 55%),
              radial-gradient(circle at 85% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 55%);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            text-align: center;
            padding: 40px 20px;
            margin-bottom: 30px;
            position: relative;
        }
        
        header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 4px;
            background: linear-gradient(90deg, var(--accent-orange), var(--accent-green));
            border-radius: 2px;
        }
        
        h1 {
            font-size: 3.2rem;
            margin-bottom: 10px;
            background: linear-gradient(90deg, var(--accent-orange), var(--accent-yellow));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .subtitle {
            font-size: 1.8rem;
            color: var(--accent-green);
            font-weight: 300;
            letter-spacing: 1px;
        }
        
        .intro-text {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 50px;
            font-size: 1.2rem;
            color: var(--text-gray);
            padding: 0 20px;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 60px;
        }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
        }
        
        .card {
            background-color: rgba(10, 26, 58, 0.8);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }
        
        .card-title {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid;
        }
        
        .github-card .card-title {
            color: var(--accent-orange);
            border-bottom-color: var(--accent-orange);
        }
        
        .canary-card .card-title {
            color: var(--accent-green);
            border-bottom-color: var(--accent-green);
        }
        
        .card-icon {
            font-size: 2rem;
            margin-right: 15px;
        }
        
        .card h2 {
            font-size: 2rem;
        }
        
        .steps-container {
            margin-top: 25px;
        }
        
        .step {
            display: flex;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .step:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 40px;
            background-color: var(--secondary-blue);
            border-radius: 50%;
            margin-right: 15px;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .github-card .step-number {
            background-color: var(--accent-orange);
            color: var(--primary-dark);
        }
        
        .canary-card .step-number {
            background-color: var(--accent-green);
            color: var(--primary-dark);
        }
        
        .step-content h3 {
            margin-bottom: 8px;
            color: var(--text-light);
        }
        
        .step-content p {
            color: var(--text-gray);
        }
        
        .comparison-section {
            background-color: rgba(26, 58, 95, 0.6);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 50px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .comparison-title {
            text-align: center;
            margin-bottom: 30px;
            color: var(--accent-yellow);
            font-size: 2rem;
        }
        
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .comparison-item {
            background-color: rgba(10, 26, 58, 0.8);
            padding: 25px;
            border-radius: 10px;
        }
        
        .comparison-item h3 {
            color: var(--accent-yellow);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .comparison-item i {
            margin-right: 10px;
        }
        
        footer {
            text-align: center;
            padding: 30px 20px;
            margin-top: 50px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-gray);
            font-size: 0.9rem;
        }
        
        .server-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
            margin-bottom: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            background-color: rgba(10, 26, 58, 0.8);
            padding: 12px 20px;
            border-radius: 8px;
        }
        
        .info-icon {
            margin-right: 10px;
            color: var(--accent-green);
        }
        
        .deployment-status {
            display: inline-block;
            background-color: var(--success-green);
            color: var(--primary-dark);
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
        }
        
        .highlight {
            color: var(--accent-yellow);
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>${title}</h1>
            <div class="subtitle">Orquestadores del Caos</div>
        </header>
        
        <div class="intro-text">
            Dos estrategias fundamentales en el mundo de DevOps para gestionar el desarrollo y despliegue de software de forma segura y eficiente.
        </div>
        
        <div class="main-content">
            <div class="card github-card">
                <div class="card-title">
                    <i class="card-icon fab fa-github"></i>
                    <h2>GitHub Flow</h2>
                </div>
                <p>Un flujo de trabajo liviano basado en ramas, diseñado para equipos que despliegan regularmente. Es simple, eficiente y perfecto para la integración continua.</p>
                
                <div class="steps-container">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Crea una rama</h3>
                            <p>Crea una nueva rama desde <span class="highlight">main</span> para cada funcionalidad, corrección o experimento.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Añade commits</h3>
                            <p>Realiza cambios en tu rama y haz commits regularmente con mensajes descriptivos.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Abre un Pull Request</h3>
                            <p>Cuando tu trabajo esté listo, abre un Pull Request para iniciar la discusión y revisión del código.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Revisa y despliega</h3>
                            <p>Después de la revisión, despliega los cambios para probarlos en un entorno antes de fusionar.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h3>Fusiona</h3>
                            <p>Una vez probado, fusiona el Pull Request en la rama principal. ¡Tu código ya está en producción!</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card canary-card">
                <div class="card-title">
                    <i class="card-icon fas fa-dove"></i>
                    <h2>Canary Deployment</h2>
                </div>
                <p>Una estrategia de despliegue que libera cambios gradualmente a un pequeño grupo de usuarios antes de hacerlo a toda la base de usuarios.</p>
                
                <div class="steps-container">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Prepara la nueva versión</h3>
                            <p>Prepara la nueva versión de tu aplicación junto con la versión actual en producción.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Despliega a un subconjunto</h3>
                            <p>Despliega la nueva versión a un pequeño porcentaje de usuarios o servidores (el "canario").</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Monitorea de cerca</h3>
                            <p>Vigila de cerca las métricas: rendimiento, errores y feedback de los usuarios del canario.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Amplía gradualmente</h3>
                            <p>Si todo va bien, aumenta gradualmente el tráfico dirigido a la nueva versión.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h3>Completa el despliegue o haz rollback</h3>
                            <p>Si las métricas son buenas, despliega al 100% de usuarios. Si hay problemas, haz rollback rápidamente.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="comparison-section">
            <h2 class="comparison-title">¿Por qué estos "Orquestadores del Caos"?</h2>
            <div class="comparison-grid">
                <div class="comparison-item">
                    <h3><i class="fas fa-shield-alt"></i> Reducción de riesgo</h3>
                    <p>Ambas estrategias minimizan el riesgo de introducir errores en producción. GitHub Flow mediante revisiones de código y Canary Deployment mediante despliegues graduales.</p>
                </div>
                
                <div class="comparison-item">
                    <h3><i class="fas fa-tachometer-alt"></i> Entrega continua</h3>
                    <p>Permiten lanzar nuevas funcionalidades de forma rápida y frecuente sin comprometer la estabilidad del sistema.</p>
                </div>
                
                <div class="comparison-item">
                    <h3><i class="fas fa-user-friends"></i> Feedback temprano</h3>
                    <p>Obtienes feedback de usuarios reales (Canary) o de revisores (GitHub Flow) antes de un lanzamiento completo.</p>
                </div>
                
                <div class="comparison-item">
                    <h3><i class="fas fa-undo-alt"></i> Recuperación rápida</h3>
                    <p>Ambos enfoques facilitan la identificación y corrección de problemas antes de que afecten a todos los usuarios.</p>
                </div>
            </div>
        </div>
        
        <footer>
            <div class="server-info">
                <div class="info-item">
                    <i class="info-icon fas fa-server"></i>
                    <span>Servidor: ${hostname}</span>
                </div>
                
                <div class="info-item">
                    <i class="info-icon far fa-clock"></i>
                    <span>Hora del servidor: ${serverTime}</span>
                </div>
                
                <div class="info-item">
                    <i class="info-icon fas fa-code-branch"></i>
                    <span>Commit: ${commit}</span>
                </div>
            </div>
            
            <p>Esta aplicación demuestra conceptos de DevOps en acción. Los colores pueden personalizarse mediante variables de entorno.</p>
            <div class="deployment-status">Estado: Despliegue Activo</div>
        </footer>
    </div>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
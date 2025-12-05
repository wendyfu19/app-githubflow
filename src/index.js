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

  // Variables para versión Canary (podrían venir de variables de entorno)
  const canaryVersion = process.env.CANARY_VERSION || 'v2.1';
  const canaryPercentage = process.env.CANARY_PERCENTAGE || '15%';
  
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${canaryVersion}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-dark: #040811;
            --primary-blue: #0a1a3a;
            --secondary-blue: #1a3a5f;
            --accent-orange: #ff6b35;
            --accent-green: #00d9c0; /* Cambiado para versión Canary */
            --accent-purple: #9d4edd; /* Nuevo color para versión Canary */
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
              radial-gradient(circle at 15% 50%, rgba(26, 58, 95, 0.15) 0%, transparent 55%),
              radial-gradient(circle at 85% 30%, rgba(157, 78, 221, 0.12) 0%, transparent 55%),
              radial-gradient(circle at 50% 80%, rgba(0, 217, 192, 0.05) 0%, transparent 40%);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .canary-banner {
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-green));
            color: var(--primary-dark);
            text-align: center;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            animation: pulse 2s infinite;
            box-shadow: 0 4px 15px rgba(157, 78, 221, 0.3);
        }
        
        @keyframes pulse {
            0% { opacity: 0.9; }
            50% { opacity: 1; }
            100% { opacity: 0.9; }
        }
        
        header {
            text-align: center;
            padding: 30px 20px;
            margin-bottom: 20px;
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
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-green)); /* Cambiado para Canary */
            border-radius: 2px;
        }
        
        h1 {
            font-size: 3.2rem;
            margin-bottom: 10px;
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-green)); /* Cambiado para Canary */
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .version-badge {
            display: inline-block;
            background-color: var(--accent-purple);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 1rem;
            margin-left: 10px;
            vertical-align: super;
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
            margin: 0 auto 40px;
            font-size: 1.2rem;
            color: var(--text-gray);
            padding: 0 20px;
            border-left: 3px solid var(--accent-purple);
            border-right: 3px solid var(--accent-purple);
            padding: 15px;
            border-radius: 10px;
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
            background-color: rgba(20, 30, 60, 0.85); /* Color más claro para Canary */
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid rgba(157, 78, 221, 0.2); /* Borde púrpura para Canary */
        }
        
        .card:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow: 0 15px 35px rgba(157, 78, 221, 0.2);
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
            color: var(--accent-purple); /* Cambiado a púrpura para Canary */
            border-bottom-color: var(--accent-purple);
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
            border-bottom: 1px solid rgba(157, 78, 221, 0.1); /* Cambiado para Canary */
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
            background-color: var(--accent-purple); /* Cambiado para Canary */
            color: white;
        }
        
        .step-content h3 {
            margin-bottom: 8px;
            color: var(--text-light);
        }
        
        .step-content p {
            color: var(--text-gray);
        }
        
        .new-feature-badge {
            display: inline-block;
            background-color: var(--accent-green);
            color: var(--primary-dark);
            font-size: 0.8rem;
            padding: 2px 8px;
            border-radius: 10px;
            margin-left: 8px;
            font-weight: bold;
        }
        
        .comparison-section {
            background: linear-gradient(135deg, rgba(26, 58, 95, 0.7), rgba(157, 78, 221, 0.1)); /* Gradiente con púrpura */
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 50px;
            border: 1px solid rgba(157, 78, 221, 0.2);
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
            background-color: rgba(20, 30, 60, 0.9);
            padding: 25px;
            border-radius: 10px;
            border-left: 4px solid var(--accent-purple);
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
            border-top: 1px solid rgba(157, 78, 221, 0.2);
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
            background-color: rgba(20, 30, 60, 0.9);
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid rgba(157, 78, 221, 0.2);
        }
        
        .info-icon {
            margin-right: 10px;
            color: var(--accent-green);
        }
        
        .deployment-status {
            display: inline-block;
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-green));
            color: var(--primary-dark);
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
            animation: pulse 2s infinite;
        }
        
        .highlight {
            color: var(--accent-green);
            font-weight: bold;
        }
        
        .canary-metrics {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .metric {
            text-align: center;
            padding: 15px;
            background-color: rgba(20, 30, 60, 0.8);
            border-radius: 10px;
            min-width: 150px;
        }
        
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--accent-purple);
        }
        
        .metric-label {
            font-size: 0.9rem;
            color: var(--text-gray);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="canary-banner">
            <i class="fas fa-dove"></i>
            <span>VERSIÓN CANARY ${canaryVersion} - Desplegado al ${canaryPercentage} de usuarios</span>
            <i class="fas fa-dove"></i>
        </div>
        
        <header>
            <h1>${title} <span class="version-badge">${canaryVersion}</span></h1>
            <div class="subtitle">Orquestadores del Caos <span class="new-feature-badge">NUEVO</span></div>
        </header>
        
        <div class="intro-text">
            <i class="fas fa-star" style="color: var(--accent-yellow); margin-right: 10px;"></i>
            ¡Esta es la versión mejorada! Dos estrategias fundamentales en el mundo de DevOps para gestionar el desarrollo y despliegue de software de forma segura y eficiente.
            <i class="fas fa-star" style="color: var(--accent-yellow); margin-left: 10px;"></i>
        </div>
        
        <div class="canary-metrics">
            <div class="metric">
                <div class="metric-value">${canaryPercentage}</div>
                <div class="metric-label">Tráfico Canary</div>
            </div>
            <div class="metric">
                <div class="metric-value">0.2%</div>
                <div class="metric-label">Tasa de error</div>
            </div>
            <div class="metric">
                <div class="metric-value">324ms</div>
                <div class="metric-label">Latencia promedio</div>
            </div>
            <div class="metric">
                <div class="metric-value">98.7%</div>
                <div class="metric-label">Satisfacción</div>
            </div>
        </div>
        
        <div class="main-content">
            <div class="card github-card">
                <div class="card-title">
                    <i class="card-icon fab fa-github"></i>
                    <h2>GitHub Flow <span class="new-feature-badge">MEJORADO</span></h2>
                </div>
                <p>Un flujo de trabajo liviano basado en ramas, diseñado para equipos que despliegan regularmente. Ahora con <span class="highlight">integración de revisiones automáticas</span>.</p>
                
                <div class="steps-container">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Crea una rama inteligente</h3>
                            <p>Crea una nueva rama desde <span class="highlight">main</span> con nombres sugeridos automáticamente por IA.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Añade commits con contexto</h3>
                            <p>Realiza cambios con mensajes descriptivos y <span class="highlight">vínculos automáticos a issues</span>.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Abre un Pull Request con preview</h3>
                            <p>Cuando tu trabajo esté listo, abre un PR con <span class="highlight">deploy preview automático</span>.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Revisión aumentada</h3>
                            <p>Revisiones de código con <span class="highlight">análisis automático de seguridad y calidad</span> antes de fusionar.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h3>Fusión y deploy automático</h3>
                            <p>Una vez aprobado, <span class="highlight">se fusiona y despliega automáticamente</span> con rollback en un clic.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card canary-card">
                <div class="card-title">
                    <i class="card-icon fas fa-dove"></i>
                    <h2>Canary Deployment Avanzado</h2>
                </div>
                <p>Estrategia de despliegue que ahora incluye <span class="highlight">machine learning para análisis predictivo</span> de riesgos antes del despliegue completo.</p>
                
                <div class="steps-container">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Análisis predictivo</h3>
                            <p>Analiza automáticamente el código para <span class="highlight">predecir posibles problemas</span> antes del despliegue.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Despliegue segmentado inteligente</h3>
                            <p>Despliega a usuarios específicos basado en <span class="highlight">perfil, ubicación o comportamiento</span>.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Monitoreo en tiempo real</h3>
                            <p>Vigila métricas con <span class="highlight">alertas automáticas y dashboards interactivos</span>.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Expansión automática regulada</h3>
                            <p>Si las métricas son óptimas, <span class="highlight">expande automáticamente según reglas predefinidas</span>.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h3>Retroalimentación de ciclo completo</h3>
                            <p>Si hay problemas, <span class="highlight">haz rollback y aprende automáticamente</span> para futuros despliegues.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="comparison-section">
            <h2 class="comparison-title">Innovaciones en los "Orquestadores del Caos" <span class="new-feature-badge">v2.1</span></h2>
            <div class="comparison-grid">
                <div class="comparison-item">
                    <h3><i class="fas fa-robot"></i> Automatización Inteligente</h3>
                    <p>Nuevas capacidades de IA que analizan automáticamente riesgos y optimizan los despliegues basándose en datos históricos.</p>
                </div>
                
                <div class="comparison-item">
                    <h3><i class="fas fa-bolt"></i> Velocidad Mejorada</h3>
                    <p>Procesos optimizados que reducen el tiempo de despliegue en un 40% mediante paralelización inteligente.</p>
                </div>
                
                <div class="comparison-item">
                    <h3><i class="fas fa-chart-network"></i> Análisis Predictivo</h3>
                    <p>Sistema que predice posibles problemas antes del despliegue usando machine learning y datos históricos.</p>
                </div>
                
                <div class="comparison-item">
                    <h3><i class="fas fa-user-shield"></i> Seguridad Proactiva</h3>
                    <p>Escaneo automático de vulnerabilidades en tiempo real durante el proceso de Canary Deployment.</p>
                </div>
            </div>
        </div>
        
        <footer>
            <div class="server-info">
                <div class="info-item">
                    <i class="info-icon fas fa-server"></i>
                    <span>Servidor Canary: ${hostname}</span>
                </div>
                
                <div class="info-item">
                    <i class="info-icon far fa-clock"></i>
                    <span>Hora del servidor: ${serverTime}</span>
                </div>
                
                <div class="info-item">
                    <i class="info-icon fas fa-code-branch"></i>
                    <span>Commit: ${commit}</span>
                </div>
                
                <div class="info-item">
                    <i class="info-icon fas fa-dove"></i>
                    <span>Versión: ${canaryVersion}</span>
                </div>
            </div>
            
            <p>Esta es la <span class="highlight">versión mejorada Canary</span> que demuestra el despliegue gradual en acción. Solo visible para el ${canaryPercentage} de usuarios.</p>
            <div class="deployment-status">🎯 ESTADO: DESPLIEGUE CANARY ACTIVO - Fase de monitoreo</div>
        </footer>
    </div>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
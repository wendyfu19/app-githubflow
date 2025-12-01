# Usamos una imagen ligera de Node
FROM node:20-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json primero (optimización de cache)
COPY package*.json ./

# Instalamos dependencias
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Puerto que exponemos
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]
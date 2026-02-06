FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# En dev, on copie le code mais on va surtout utiliser un volume
COPY . .

# On expose le port par défaut de Vite
EXPOSE 5173

# Commande pour lancer le serveur de dev
CMD ["npm", "run", "dev", "--", "--host"]
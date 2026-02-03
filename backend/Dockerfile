FROM node:18

# 1. On se place dans /app
WORKDIR /app

# 2. On copie le package.json du backend et on installe
COPY package*.json ./
RUN npm install

# 3. On copie tout le contenu du dossier backend vers /app
COPY . .

# 4. On s'assure que le dossier frontend est accessible 
# (On le copiera via le docker-compose ou une étape supplémentaire si besoin)

EXPOSE 5000

# 5. On lance le serveur qui est maintenant directement dans /app
CMD ["node", "server.js"]
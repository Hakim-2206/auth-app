# Utilise Node.js 22 comme base
FROM node:22

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement package.json et package-lock.json pour une installation optimisée
COPY package*.json ./

# Installer uniquement les dépendances en production
RUN npm install --production

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port 5000 pour l'API
EXPOSE 5000

# Lancer le serveur
CMD ["node", "server.js"]

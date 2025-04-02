# Étape 1 : Construire l'application React/Vite
FROM node:22 AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier tous les fichiers du frontend
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application
FROM nginx:alpine

# Copier les fichiers construits par Vite dans le répertoire de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80 (port par défaut de Nginx)
EXPOSE 80

# Lancer Nginx pour servir les fichiers statiques
CMD ["nginx", "-g", "daemon off;"]

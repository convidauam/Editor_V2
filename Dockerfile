# Etapa 1: Build
FROM node:22-bookworm-slim AS build

WORKDIR /app
ARG REACT_APP_START_URL
ENV REACT_APP_START_URL=$REACT_APP_START_URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY editor_convida/package.json editor_convida/package-lock.json ./
RUN npm ci --force

COPY editor_convida/ .
RUN npm run build

# Etapa 2: Producción
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN echo 'server { listen 80; server_name _; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Etapa 1: Build
FROM node:18-bookworm-slim AS build

WORKDIR /app
ARG REACT_APP_START_URL
ENV REACT_APP_START_URL=$REACT_APP_START_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Producción
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
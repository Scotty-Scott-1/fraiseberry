# --- Build Stage -------------------------------------------------------------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Nginx Stage -------------------------------------------------------------
FROM nginx:alpine

# Copy built frontend into Nginx's static directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy global nginx.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy server blocks
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

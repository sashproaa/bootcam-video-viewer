FROM node:13.12.0-alpine as build

WORKDIR /app/frontend
#COPY ~/bootcam-video-viewer/frontend/package.json ./
#COPY ./frontend/package-lock.json ./
#RUN npm ci --silent
#RUN npm run build
COPY ./frontend ./
RUN npm  install

#COPY ../frontend ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

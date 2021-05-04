FROM node:12.2.0-alpine

WORKDIR /app/frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

RUN npm install --silent

COPY .env .env

EXPOSE 3000



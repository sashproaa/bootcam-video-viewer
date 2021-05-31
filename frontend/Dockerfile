FROM node:lts-alpine

WORKDIR /app/frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY src src

COPY public public

COPY .env.example .env


EXPOSE 3000

CMD yarn start

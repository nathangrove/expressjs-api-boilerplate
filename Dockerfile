# version it..don't leave it to chance
FROM node:14.19.0-alpine

COPY --chown=node:node . /app

WORKDIR /app

USER node

RUN npm install

ENTRYPOINT npm start
# Base image
FROM node:18-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

RUN apt-get update 

RUN apt upgrade -y

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD ["dumb-init", "node","index.js"]
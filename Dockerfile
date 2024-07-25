FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN mv .env.docker .env

EXPOSE 3333

CMD [ "npm", "run", "dev" ]
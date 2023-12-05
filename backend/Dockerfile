FROM node:16.14-alpine

RUN npm install -g npm@8.12.2

WORKDIR /usr/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
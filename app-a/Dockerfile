FROM node:14-alpine

WORKDIR /usr/app

# This makes sure that npm install only occurs when package.json is changed
COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "node", "app.js" ]
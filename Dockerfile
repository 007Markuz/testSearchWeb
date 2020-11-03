FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./dist ./dist

RUN ls -sla

EXPOSE 80
CMD [ "node", "server.js" ]

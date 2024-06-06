FROM node:20-alpine

WORKDIR /app
VOLUME /app

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev"]
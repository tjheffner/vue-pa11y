FROM node:10-alpine

WORKDIR /app

# Add in bash so that Docksal can ssh into this container.
RUN apk add --no-cache bash

COPY package.json /app
RUN npm install
COPY . /app

CMD npm run dev

EXPOSE 8080

FROM node:16.13.0-alpine3.12

WORKDIR /app

# copy all json files to workdir
COPY package*.json ./


RUN npm install 

# copy everything to current directory
COPY . .

# run command
CMD node ./src/server.js 

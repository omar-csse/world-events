FROM node:lts
LABEL 'maintainer'='omar' 
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . /app
EXPOSE 8108
CMD node ./server/app.js
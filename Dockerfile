FROM node:lts-alpine
LABEL 'maintainer'='omar' 
WORKDIR /app
COPY ./package*.json ./
RUN npm install --only=production
COPY . /app
EXPOSE 8108
CMD node ./server/app.js
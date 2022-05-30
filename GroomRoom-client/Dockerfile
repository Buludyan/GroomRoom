FROM node:alpine

RUN apk add g++ make py3-pip

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV REACT_APP_BASE_URL=http://localhost:6060

CMD [ "npm", "start" ]
FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

ENV DB_URL=mongodb+srv://GroomRoom:GroomRoom@cluster0.6rbjg.mongodb.net/GroomRoom?retryWrites=true&w=majority
ENV PORT=6060
ENV JWT_ACCESS_SECRET=jwt-secret-key
ENV JWT_REFRESH_SECRET=jwt-refresh-secret-key   
ENV SMTP_HOST=smtp.gmail.com
ENV SMTP_PORT=587
ENV SMTP_USER=groomroomtest@gmail.com
ENV SMTP_PASSWORD=groomroom374

ENV API_URL=http://178.62.214.111:6060
ENV CLIENT_URL=http://178.62.214.111:3000
ENV API_KEY=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

EXPOSE 6060

CMD [ "npm", "start" ]
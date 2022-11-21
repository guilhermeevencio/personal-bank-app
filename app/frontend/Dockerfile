FROM node:latest

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

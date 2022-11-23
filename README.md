# Personal Bank App

O Personal Bank consiste em uma aplicação em que o usuário é capaz de se cadastrar, transferir fundos para outros usuários e visualizar seu histórico de transferências.

- Este projeto foi desenvolvido utilizando o `Node.js`, `Typescript` e `React`.
- Para lidar com o banco de dados, foi utilizado o `TypeORM` e o `Postgres`.


## Principais tecnologias utilizadas no `back-end`

- `Node.js`
- `Typescript`
- `Typeorm`
- `Postgres`
- `bcrypt`
- `Express`
- `JWT`
- `tsyringe`
- `uuid`

## Principais tecnologias utilizadas no `front-end`
- `React`
- `Typescript`
- `Vite`
- `Axios`
- `react-router-dom`

## Instruções para rodar a aplicação

### ⚠️ Para rodar a aplicação, precisaremos do Docker instalado! ⚠️

1 - Clone o repositório:
 - ```git clone git@github.com:guilhermeevencio/personal-bank-app.git```
 
2 - No terminal, acesse o diretório /app:
 - ```cd personal-bank-app/app```
 
3 - Rode o comando abaixo para subir os containers do Docker:
 - ```docker compose up -d```
 
4 - Acesse o terminal do container app-backend:
 - ```docker exec -it app-backend /bin/sh```

5 - Rode o seguinte comando para rodar as migrações do banco de dados:
 - ```npm run typeorm migration:run````
 
6 - Acesse a porta 3000 do localhost para utilizar a aplicação:
 - ```http://localhost:3000/```

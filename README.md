# Projeto Blogs API

# Contexto

O objetivo do projeto foi arquitetar e desenvolver uma API **REST** que faça **CRUD (Create, Read, Update e Delete)** de posts de blog. A API segue a arquitetura **MSC (Models, Service e Controllers)**, e se comunica com um banco de dados  **MySQL**  através do **ORM Sequelize**.

## Tecnologias usadas
* Node.js;
* Express.js;
* JWT(JSON Web Token);
* Sequelize (ORM);
* MySQL;

## Instalando Dependências

* Clone o repositório:
```bash
git clone git@github.com:caiquequaresmasilva/projeto-trybe-blogs-api.git
``` 

* Entre na pasta do repositório clonado e instale as dependências:

```bash
cd projeto-trybe-blogs-api
npm install
``` 


## Executando a aplicação


Para rodar a API, é necessário configurar as variáveis de ambiente no arquivo `.env`

```
MYSQL_USER=user # Usuário de acesso ao banco de dados
MYSQL_PASSWORD=userPassword # Senha do usuário
HOSTNAME=dbHost # Host do banco de dados
PORT=3001 # Porta de comunicação da API
JWT_SECRET=safeSecret #Chave para autenticação de usuário do JWT
``` 
---

* Em seguida, crie o banco de dados e suas tabelas, via Sequelize, com o script
```bash
npm run prestart
``` 

* Para popular o banco de dados com as informações do diretório `seeders`:
```bash
npm run seed
``` 

* Para deletar o banco de dados:
```bash
npm run drop
``` 
---

* Para rodar a API, faça:
```bash
npm start
``` 

A API pode ser acessada pelo endereço http://localhost:3001/, ou por outra porta configurada.

---
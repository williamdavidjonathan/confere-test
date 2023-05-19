
## Description

### CONFERE - Criação de API para o teste do confere.

## Installation

```bash
$ npm install
```
## Setting MySQL Database

### **O ARQUIVO DE INICIALIZAÇÃO DO BANCO ESTÁ NA PASTA QUERY**

## Setting .env file
```bash
#DATABASE
HOST= host //HOST DO MYSQL
PORT= port //PORTA DO MYSQL
USER= user //USUARIO DO BANCO DE DADOS
PASS= password //SENHA DO BANCO DE DADOS
DB_NAME= confere //NOME DO BANCO DE DADOS
```

**AO UTILIZAR O DOCKER SET MYSQL VARIABLES IN DOCKERFILE**

## SWAGGER

**A DOCUMENTAÇÃO SWAGGER ESTÁ NA ROTA /api**

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

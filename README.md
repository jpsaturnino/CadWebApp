# CadWebApp

## Sobre

Sistema para cadastro, listagem e manipulação dos dados de clientes cadastrados no sistema. Foi desenvolvido como teste para um processo seletivo e seguido os requisitos necessários.

### Features

- Adicionar múltiplos endereços no cadastro de um cliente.
- Adicionar múltiplos telefones no cadastro de um cliente.
- Listagem de todos os clientes cadastrados no banco de dados.
- Pesquisa de clientes cadastrados no banco de dados a partir do nome.
- Edição dos dados de um cliente.
- Remoção de determinado cliente.
- Vizualização dos dados de determinado cliente.

## Desenvolvido com

- NodeJS
- ReactJS
- MySql

## Instalação

1. Clone o repositório

```sh
 git clone https://github.com/jpsaturnino/CadWebApp.git
```

```sh
cd CadWebApp
```

2. Acesse via terminal os diretórios frontend e backend, e execute em cada diretório a linha de comando para instalar as dependências da aplicação:

```sh
npm install
```

### Banco de Dados

_É nescessário ter o MySql server instalado e executando_

1. Vá em `./backend/src/model/Database.js`
2. Nas linhas `13-18` verifique e coloque as informções que condizem com seu MySql

## Executando

1. Acesse via terminal o diretório frontend e execute:

```sh
npm start || yarn start
```

2. Acesse via terminal o diretório backend e execute:

```sh
npm nodemon ./src/index.js || yarn nodemon ./src/index.js
```

Ao executar o passo 1. dessa etapa, uma aba deve abrir no navegador executando o projeto, caso não ocorra acesse com:

http://localhost:3000

_As portas da aplicação estão separadas em:_

- `3000` para o frontend
- `3344` para o backend

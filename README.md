# 📚 Projeto Pontes de Papel
---

Esta é uma API RESTful desenvolvida com TypeScript, criada para gerenciar o empréstimo e a doação de livros voltados a crianças em situação de vulnerabilidade social.

O projeto tem como objetivo promover o acesso à leitura e à educação, permitindo que usuários cadastrem, consultem, atualizem e removam informações sobre livros disponíveis para doação ou empréstimo.

A API oferece operações completas de CRUD (Create, Read, Update, Delete) e pode servir como base para o desenvolvimento de uma aplicação social voltada à inclusão educacional e incentivo à leitura infantil.

---

## 🧠 Arquitetura

O projeto segue os princípios da **Clean Architecture**, separando responsabilidades de forma clara entre camadas:

```
├── src
│   ├── controllers/
│   ├── detabase/
│   ├── img/
│   ├── middlewares/
│   ├── models/
|   ├── repository/
|   ├── routes/
|   ├── services/
|   ├── tests/
│   └── app.ts

```

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [Jest](https://jestjs.io/) - Testes
- [Supertest](https://www.npmjs.com/package/supertest) - Testes de integração

---

## 🎯 Objetivos do Projeto

---
## 📂 Estrutura de Testes

```
├── src
│   └── test
│       ├── unit/              
│       └── integration/
|               └── book/ 


```
## 📋 Cobertura de Testes

Criar livro (POST /books)

Listar livros (GET /books)

Atualizar livro (PUT /books/:id)

Excluir livro (DELETE /books/:id)


## ✅ Testes Realizados
1. Criar Livro (POST /books)
![post/books](<src/img/Captura de tela 2025-10-27 210553.png>)


Ambos os testes foram executados com sucesso usando Jest e Supertest.

```
```
### 📋 Cobertura de Testes de usuario

1. Registro de Usuário (POST /auth/register)
![auth/register](<src/img/Captura de tela 2025-10-27 210845.png>)

```

### 🔧 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. Instale as dependências:
    ```bash
    npm install

3. Execute a API:
    ```bash
    npx ts-node-dev src/index.ts

4. Acesse:
    ```bash
    http://localhost:3000/api/books

👩‍💻 Desenvolvido por

Ingred Conceição – Desenvolvedora Fullstack em formação
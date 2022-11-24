<a href="./LICENSE">![GitHub](https://img.shields.io/github/license/pedro-afonso/chat-app-frontend?style=plastic)</a>
![GitHub repo size](https://img.shields.io/github/repo-size/pedro-afonso/chat-app-frontend?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/pedro-afonso/chat-app-frontend?color=yellow&style=plastic)

<h1 align="center">Projeto Chat App</h1>

<br />

# :pushpin: Índice de conteúdos

- [Screenshots do Projeto](#camera_flash-screenshots-do-projeto)
- [Sobre o Projeto](#monocle_face-sobre-o-projeto)
- [Tecnologias](#globe_with_meridians-tecnologias-usadas)
- [Features](#triangular_flag_on_post-features)
- [Instalação](#question-como-instalar-e-executar-o-projeto)
- [Autor](#closed_book-autor)

</br>

---

# :camera_flash: Screenshots do Projeto

![APP_FULLSCREEN](https://user-images.githubusercontent.com/50973575/203847038-ed899369-fc18-4ca2-96c8-aa8313484c6e.png)

<img src='https://user-images.githubusercontent.com/50973575/203847033-928cd84a-2301-4d81-9ffd-b0adcc293e8b.png' width='160px' > <img src='https://user-images.githubusercontent.com/50973575/203847037-3c88cd19-fb3b-42ff-a046-b9d274c42b20.png' width='160px' > <img src='https://user-images.githubusercontent.com/50973575/203847040-7394e32d-6ba9-4e48-968a-0f4930cdaa25.png' width='160px' > <img src='https://user-images.githubusercontent.com/50973575/203847041-ed238bec-9717-450b-b551-53d8862151b8.png' width='160px' > <img src='https://user-images.githubusercontent.com/50973575/203847044-780f0526-3c45-4ae0-a575-0c1eda4c6c28.png' width='160px' > <img src='https://user-images.githubusercontent.com/50973575/203847662-e458909a-6810-46b4-aa9f-8220f40a5253.png' width='160px' >

---

# :monocle_face: Sobre o Projeto

Este projeto tem o objetivo de facilitar a comunicação entre pessoas em tempo real, proporcionando uma experiência melhor para o cliente.

<br />

---

# :globe_with_meridians: Tecnologias Usadas

## Frontend

✅ [React](https://reactjs.org/) - Biblioteca JS.

✅ [Typescript](https://www.typescriptlang.org) - Para fazer a tipagem

✅ [Material UI](https://mui.com) - Biblioteca de estilos.

✅ [Redux Toolkit](https://redux-toolkit.js.org) - Conjunto de ferramentas para simplificar o desenvolvimento Redux

✅ [Axios](https://axios-http.com) - Biblioteca usada para fazer as requisições http.

✅ [Socket.IO](https://socket.io) - Usado para fazer a comunicação bidirecional dos dados em tempo real.

✅ [Lints] — ESlint/Prettier/EditorConfig

## Backend

✅ [NodeJS](https://nodejs.org/en/) - Ambiente de desenvolvimento javascript.

✅ [Typescript](https://www.typescriptlang.org) - Para fazer a tipagem

✅ [Express](https://expressjs.com) - Framework usado para construir a API.

✅ [Multer](https://github.com/expressjs/multer#readme) - Usado como middleware para lidar com dados do tipo multipart/form-data.

✅ [Socket.IO](https://socket.io) - Usado para fazer a comunicação bidirecional dos dados em tempo real.

✅ [Cloudinary](https://cloudinary.com) - Usado para fazer o upload de imagens.

✅ [Mongoose](https://mongoosejs.com) - Biblioteca usada para criar as conecções com o MongoDB.

✅ [MongoDB](https://www.mongodb.com) - Sistema gerenciador de banco de dados noSQL.

✅ [Lints] — ESlint/Prettier/EditorConfig

<br />

---

# :triangular_flag_on_post: Features

- [x] Criar uma conta.
- [x] O usuário pode adicionar uma imagem ao seu avatar.
- [x] Autenticação com json web token.
- [x] Criar chat um para um.
- [x] Criar chat em grupo.
- [x] Notificações de novas mensagens.
- [x] Indica quando um usuário está digitando em um chat.
- [x] Recebe e atualiza as mensagens em tempo real.
- [x] Listar todos o chats em que o usuário é membro.
- [x] Campo para buscar por usuários através do nome ou email.
- [x] Editar o nome e os membros do chat em grupo.
- [x] Layout responsivo.

<br />

---

# :question: Como instalar e executar o projeto

<br />

## Acessando direto pelo site:

- Você pode clicar nesse [link](https://pedro-afonso-chat-app.netlify.app) e acessar a aplicação que está hospedada na plataforma da Netlify.

<br />

## Executar na máquina local:

(certifique-se de ter instalado na sua máquina o [Node](https://nodejs.org/en/), ter uma conta no [mongoDB Atlas](https://www.mongodb.com) e uma conta no [Cloudinary](https://cloudinary.com))

1. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

```bash
git clone https://github.com/pedro-afonso/chat-app-frontend.git
```

2. Depois de concluído, execute os seguintes comandos para iniciar:

```bash
cd chat-app-frontend/
```

Para instalar as dependências:

```bash
npm install
```

Você precisa criar um arquivo .env e adicionar a variável

```bash
VITE_APP_API_CHAT_URL=http://localhost:5000
```

A variável VITE_APP_API_CHAT_URL é usada como url base da api e para configurar o socket.io-client.

Com isso já é possível iniciar o frontend web da aplicação

```bash
npm run dev
```

mas para utilizar a aplicação é necessário instalar e iniciar o servidor backend

3. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

```bash
git clone https://github.com/pedro-afonso/chat-app-backend.git
```

2. Depois de concluído, execute os seguintes comandos para iniciar:

```bash
cd chat-app-backend/
```

Para instalar as dependências:

```bash
npm install
```

Você precisa criar um arquivo .env e adicionar as variáveis

```bash
PORT=5000
## Variáveis de configuração do mongoDB
DB_MONGO_URI=

## Caracteres aleatórios para criptografar as senhas (ex.: sauhs1ua2h)
JWT_SECRET=

## Variáveis de configuração do cloudinary
CLOUD_NAME=
API_KEY=
API_SECRET=
```

Com isso já é possível iniciar o servidor backend da aplicação

```bash
npm run server
```

4. Por fim, abra a pasta clonada em seu editor de códigos favorito e faça as suas alterações! xD

<br />

---

# :closed_book: Autor

Feito por [Pedro Afonso](https://github.com/pedro-afonso).

### :link: LinkedIn: https://www.linkedin.com/in/pedro-a-fonso/

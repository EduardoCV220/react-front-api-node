# PixelApp — Frontend com React Router + Vite + API Node.js

Este projeto é um frontend moderno desenvolvido em **React** com **React Router v7**, construído com **Vite** e integrado a uma API em **Node.js + MySQL**. O sistema é uma base para aplicações protegidas com autenticação via JWT, controle de sessão por cookies HTTP-only, e rotas privadas.

---

## 🚀 Tecnologias utilizadas

- **React** (v18+)
- **React Router Dom v7**
- **TypeScript**
- **TailwindCSS**
- **SweetAlert2** (para feedbacks e confirmação de ações)
- **Axios** (com suporte a cookies - `withCredentials`)
- **Vite** (ambiente de desenvolvimento rápido)

---

## 🔐 Funcionalidades principais

- Autenticação de usuários com **JWT** (armazenado via cookies seguros).
- Roteamento protegido com carregamento (`loader`) e redirecionamento de usuários não autenticados.
- Layout dinâmico com navegação (NavBar) apenas em páginas privadas.
- CRUD de produtos com:
  - Listagem em tabela.
  - Filtros por **código** ou **descrição**.
  - Cadastro e edição via modal.
  - Exclusão com confirmação.
- Integração com backend Node.js (Express + MySQL) utilizando controllers e models organizados.

---

## 📂 Estrutura de Pastas (Frontend)

src/
├── components/
│ ├── Nav.tsx # Navegação entre páginas privadas
├── routes/
│ ├── Login.tsx # Tela de login
│ ├── private/
│ ├──├── Produto.tsx # Tela de produtos
│ ├──├── editarProduto.tsx # Modal de edição de produtos
│ ├──├── home.tsx
│ ├──├── cadastrarProduto.tsx Tela de Cadastro produtos
│── layouts/
│ └── \_\_layout.tsx # Layout com <Outlet /> e Nav para rotas seguras
├── services/
│ └── api.ts # Configuração base do Axios
├── routes.ts
└── root.tsx

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

# Projeto MiniBlog - Processo Seletivo

## **Deploy**

O projeto está hospedado na Vercel e pode ser acessado através do link [**Miniblog Oper**](https://projeto-oper.vercel.app/)

Banco de dados hospedado no [**PlanetScale**](https://planetscale.com/)

## Tecnologias utilizadas

- NextJS 13 com App Dir
- Typescript
- Tailwind
- Shadcn-ui
- React Hook Form
- Prisma
- MySQL
- ZOD
- Next Auth
- Docker

## Funcionalidades adicionais

- Autenticação com Github
- Paginação pelo servidor
- Página 404 para artigos não encontrados
- Tratamento de imagens e blur durante fetch
- Middleware para proteção de rotas autenticadas
- Criação de uma simples dashboard onde é possível ver artigos comentados

## Como rodar o projeto

- Clone o repositório
- Copie o arquivo `.env.example` para um arquivo `.env`

## Comandos Linux:

Você pode usar o comando completo abaixo para rodar o projeto no Linux:

```bash
npm install && sudo docker-compose up -d && npm run build && npm run start
```

Ou usar `npm run prepare:linux` que rodará os mesmos comandos acima.

## Comandos Windows:

Você pode usar o comando completo abaixo para rodar o projeto no Windows:

```bash
npm install && docker-compose up -d && npm run build && npm run start
```

Ou usar `npm run prepare:windows` que rodará os mesmos comandos acima.

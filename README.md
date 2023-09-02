# Projeto MiniBlog - Processo Seletivo

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
- Tratamento de imagens e blur durante fetch

## Como rodar o projeto

- Clone o repositório
- Copie o arquivo `.env.example` para `.env`

Linux:
```bash
npm install && sudo docker-compose up -d && npx prisma db push && npm run dev
```

Windows:
```bash
npm install && docker-compose up -d && npx prisma db push && npm run dev
```

Se precisar também utilize o comando `npx prisma generate` para gerar as tipagens do prisma.
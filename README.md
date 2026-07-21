# TaskHub

Workspace moderno para equipes com Kanban, calendário, chat, dashboard e base para IA em tempo real.

## Stack

Next.js 15, React 19, TypeScript, Tailwind, Prisma/PostgreSQL, Supabase Auth, Zustand, React Query e Socket.io (cliente preparado).

## Executar localmente

1. Copie `.env.example` para `.env` e preencha as credenciais.
2. Instale as dependências: `npm install`.
3. Crie o banco PostgreSQL e execute `npx prisma generate` seguido de `npx prisma db push`.
4. Inicie: `npm run dev`.
5. Abra `http://localhost:3000`.

## Supabase e autenticação

Crie um projeto Supabase, habilite Email/Password e Google em **Authentication > Providers**, depois informe `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. O cliente em `lib/supabase/client.ts` está preparado para os fluxos de login, cadastro, recuperação e OAuth.

## APIs

- `GET /api/tasks?projectId=` lista tarefas com relações.
- `POST /api/tasks` cria tarefas (`title`, `projectId`, `columnId`, `priority`, `dueDate`).
- `POST /api/ai` recebe `{ prompt }` e usa OpenAI quando `OPENAI_API_KEY` estiver configurada.

## Tempo real

Para Socket.io em produção, execute um serviço Node separado (por exemplo, Railway/Render) e aponte `NEXT_PUBLIC_SOCKET_URL` para ele. Use canais por `teamId` e valide o JWT do Supabase no handshake. A Vercel é indicada para o frontend/API serverless, mas não para manter conexões Socket.io persistentes.

## Deploy Vercel

Suba o repositório para GitHub, importe-o na Vercel e configure as variáveis do `.env.example`. Use Supabase Postgres ou Neon como `DATABASE_URL`, rode `npx prisma db push` no banco de produção e configure a URL de redirecionamento da Vercel no Supabase Auth.

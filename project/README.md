# user-service

Serviço responsável pelo cadastro e gerenciamento de usuários da rede social.

## Tecnologias

- NestJS
- Prisma ORM + PostgreSQL
- bcrypt (hash de senha)
- Clean Architecture + DDD
- passport-jwt (verificação de token RS256)

## Variáveis de ambiente

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/users_db
```

## Rodando localmente

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

A chave pública do `auth-service` deve estar em `public.key` na raiz do projeto.

## Endpoints

### `POST /users`
Cadastro de novo usuário. Rota pública.

**Body:**
```json
{
  "name": "Felipe",
  "email": "felipe@email.com",
  "password": "senhaForte123"
}
```

**Resposta `201`:**
```json
{
  "id": "uuid",
  "name": "Felipe",
  "email": "felipe@email.com",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### `GET /users/me`
Retorna os dados do usuário autenticado. Rota protegida.

**Header:**
```
Authorization: Bearer <access_token>
```

**Resposta `200`:**
```json
{
  "userId": "uuid",
  "email": "felipe@email.com"
}
```

---

### `GET /users/by-email/:email`
Busca usuário pelo email. **Rota interna** — usada pelo `auth-service`. Não deve ser exposta pelo API Gateway.

## Arquitetura

```
src/
  shared/
    auth/
      jwt.strategy.ts   ← valida JWT com a chave pública do auth-service
      auth.module.ts
    DataBaseModule.ts
    prisma.service.ts
  user/
    application/
      use-cases/        ← lógica de negócio isolada
    domain/
      entities/         ← User com value objects (Email, Name)
      repositories/     ← interface IUserRepository
    infrastructure/
      database/         ← implementação Prisma do repositório
      http/             ← controllers e DTOs
      module/           ← UserModule
```


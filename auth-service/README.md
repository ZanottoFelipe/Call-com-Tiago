# auth-service

Serviço responsável pela autenticação da rede social. Emite e valida tokens JWT com algoritmo RS256 (chave assimétrica).

## Tecnologias

- NestJS
- Prisma ORM + PostgreSQL
- `@nestjs/jwt` com RS256
- bcrypt (verificação de senha)
- axios (comunicação com user-service)

## Variáveis de ambiente

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/auth_db
USER_SERVICE_URL=http://localhost:3000
PORT=3001
```

## Chaves RSA

As chaves **não são commitadas** (estão no `.gitignore`). Para gerar:

```bash
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
```

A `public.key` deve ser copiada para todos os serviços que precisam verificar tokens.

## Rodando localmente

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

## Endpoints

### `POST /auth/login`
Autentica o usuário e retorna os tokens.

**Body:**
```json
{
  "email": "felipe@email.com",
  "password": "senhaForte123"
}
```

**Resposta `200`:**
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "uuid"
}
```

---

### `POST /auth/refresh`
Renova o `access_token` usando o `refresh_token`. O token antigo é **revogado** (rotação).

**Body:**
```json
{
  "refreshToken": "uuid"
}
```

**Resposta `200`:**
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "novo-uuid"
}
```

## Como funciona o JWT assimétrico

```
auth-service  →  assina com private.key  →  access_token
user-service  →  verifica com public.key →  válido/inválido
post-service  →  verifica com public.key →  válido/inválido
```

O `access_token` expira em **15 minutos**. O `refresh_token` expira em **7 dias** e fica salvo no banco para poder ser revogado.

## Banco de dados

```prisma
model RefreshToken {
  id        String    @id @default(uuid())
  token     String    @unique
  userId    String    // referência lógica ao user-service
  expiresAt DateTime
  revokedAt DateTime? // null = válido
  createdAt DateTime  @default(now())
}
```

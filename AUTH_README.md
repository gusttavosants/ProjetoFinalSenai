# Autenticação JWT - Guia de Uso

## 🔐 Configuração Realizada

### 1. **Módulo de Autenticação (Auth)**
   - Estratégia JWT com Passport
   - Endpoints de login
   - Guards para proteger rotas

### 2. **Rotas Protegidas**
   - ✅ `POST /course` - Protegido ✅
   - ✅ `PUT /course/:id` - Protegido ✅
   - ✅ `DELETE /course/:id` - Protegido ✅
   - ✅ `GET /course` - Público (sem autenticação)

### 3. **Entidade Collaborator Atualizada**
   - `id` - PrimaryKey
   - `nome` - Nome do colaborador
   - `email` - Email único (usado para login)
   - `senha` - Senha hash com bcrypt
   - `ativo` - Status do colaborador

## 🚀 Como Usar

### 1. Criar um Colaborador (Manualmente - Query)

**Opção A: Usar o Seed Script**
```bash
npm run build
node dist/seed.js
```

**Opção B: Via SQL (Manual)**
```sql
INSERT INTO collaborator (nome, email, senha, ativo) VALUES 
('Administrador', 'admin@example.com', 'HASH_BCRYPT_AQUI', true);
```

Para gerar o hash, você pode usar a CLI do Node:
```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('sua_senha_aqui', 10).then(hash => console.log(hash))"
```

### 2. Fazer Login (Obter Token JWT)

**Requisição:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "senha": "senha123"
  }'
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "collaborator": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@example.com"
  }
}
```

### 3. Usar o Token para Acessar Rotas Protegidas

**Criar um Curso (POST - Protegido):**
```bash
curl -X POST http://localhost:3000/course \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT_AQUI" \
  -d '{
    "nome": "Python Avançado",
    "descricao": "Aprenda Python em nível avançado",
    "preco": 199.99,
    "status": true
  }'
```

**Atualizar um Curso (PUT - Protegido):**
```bash
curl -X PUT http://localhost:3000/course/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT_AQUI" \
  -d '{
    "nome": "Python Expert",
    "preco": 249.99
  }'
```

**Deletar um Curso (DELETE - Protegido):**
```bash
curl -X DELETE http://localhost:3000/course/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT_AQUI"
```

**Listar Cursos (GET - Público):**
```bash
curl http://localhost:3000/course
```

## 📋 Variáveis de Ambiente

Crie um arquivo `.env`:
```env
JWT_SECRET=seu-secret-key-muito-seguro-aqui
PORT=3000
```

Se não configurar `JWT_SECRET`, ele usará o padrão (⚠️ não recomendado em produção).

## 🔄 Fluxo de Autenticação

```
1. Colaborador envia email + senha → POST /auth/login
2. Sistema valida credenciais e gera JWT
3. Colaborador recebe token válido por 24h
4. Para acessar rotas protegidas, envia: Authorization: Bearer <token>
5. JWT Strategy valida o token em cada requisição
```

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|--------|
| `401 Unauthorized` | Token inválido/expirado | Faça login novamente |
| `401 Unauthorized` (no header) | Falta Authorization header | Adicione `Authorization: Bearer <token>` |
| `Email ou senha inválidos` | Credenciais erradas | Verifique email e senha |
| `Colaborador inativo` | Email existe mas status é `false` | Ative o colaborador no banco |

## 📝 Próximos Passos (Opcional)

- [ ] Adicionar endpoint de criação de colaboradores (com validações)
- [ ] Implementar refresh tokens
- [ ] Adicionar roles/permissões (admin, editor, etc)
- [ ] Proteger outras rotas (enrollment, collaborator)
- [ ] Adicionar decorador customizado `@CurrentUser()`

---

**Status:** ✅ Autenticação JWT configurada e pronta para uso!

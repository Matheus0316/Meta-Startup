# Segurança de Senhas - Maia Advocacia

## 🔐 Implementação de Hash de Senhas

Este projeto implementa hash seguro de senhas usando **bcrypt** com salt de 10 rounds, seguindo as melhores práticas de segurança.

## 📋 Funcionalidades Implementadas

### ✅ Hash de Senhas
- **Algoritmo**: bcrypt com salt de 10 rounds
- **Implementação**: Classe utilitária `PasswordUtil`
- **Segurança**: Senhas nunca são armazenadas em texto plano

### ✅ Hash de Senhas Flexível
- **Formato**: Qualquer senha é aceita (sem restrições de formato)
- **Segurança**: Todas as senhas são hasheadas com bcrypt independente do formato

### ✅ Endpoints de Autenticação
- `POST /auth/login` - Login com verificação de hash
- `POST /auth/register` - Registro com validação e hash automático


## 🚀 Como Usar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Testar Endpoints

#### Registro de Usuário
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "MinhaSenh@123"
}
```

#### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "MinhaSenh@123"
}
```

## 🔧 Arquivos Modificados

### Novos Arquivos
- `src/utils/password.util.ts` - Utilitário para hash e comparação de senhas
- `src/validators/password.validator.ts` - Validador de força de senha

### Arquivos Atualizados
- `src/auth/auth.service.ts` - Implementação de hash e validação
- `src/auth/auth.controller.ts` - Endpoint de registro
- `package.json` - Dependências bcrypt

## 🛡️ Benefícios de Segurança

1. **Proteção contra vazamentos**: Senhas hasheadas são inúteis se o banco for comprometido
2. **Salt único**: Cada senha tem um salt único, prevenindo rainbow table attacks
3. **Validação forte**: Força senhas complexas que são mais difíceis de quebrar
4. **Comparação segura**: bcrypt.compare() previne timing attacks

## ⚠️ Importante

- **Nunca** armazene senhas em texto plano
- **Sempre** valide a força da senha antes de hashear
- **Teste** os endpoints após a implementação

## 📊 Exemplo de Força de Senha

| Senha | Força | Status |
|-------|--------|--------|
| `123456` | 0% | ❌ Muito fraca |
| `password` | 15% | ❌ Fraca |
| `Password123` | 75% | ⚠️ Média |
| `MinhaSenh@123` | 100% | ✅ Forte |


---

**Implementado seguindo as melhores práticas do projeto MVP Colab ONG's Backend**

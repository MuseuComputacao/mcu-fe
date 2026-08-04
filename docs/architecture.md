# Organização do frontend

Este documento resume as responsabilidades observadas no frontend sem alterar o comportamento da aplicação.

## Fluxo principal

```text
App.tsx
  └── NavigationContainer + Stack.Navigator
        ├── Home
        ├── autenticação (Admin, AddUsers, ResetPassword)
        └── painel (Dashboard, Users, Items, AddItems)

pages ── usam ── services ── usam ── services/api.ts ── HTTP JSON ── MCU Core
  │                              └── utils.tsx recupera os cabeçalhos de sessão
  └── components compartilhados (Sidebar, Dropdown, Progress)
```

## Navegação

Os nomes das telas registrados em `App.tsx` precisam corresponder às chaves de `src/router/index.tsx`. Os caminhos de deep linking observados são:

| Tela | Caminho |
| --- | --- |
| Home | `/` |
| Admin | `/admin` |
| ResetPassword | `/admin/reset-password` |
| Dashboard | `/admin/dashboard` |
| Users | `/admin/users` |
| AddUsers | `/admin/users/add` |
| Items | `/admin/items` |
| AddItems | `/admin/items/add` |

## Serviços HTTP

- `UserServices`: login, logout, cadastro, atualização e remoção de usuários.
- `ItemService`: listagem e criação de itens.
- `RoleService`: consulta dos papéis disponíveis.
- `api.ts`: instância Axios compartilhada pelos serviços.

O cliente envia os cabeçalhos de Devise Token Auth recuperados de `AsyncStorage`. Mudanças em rotas, envelopes de payload ou nomes de cabeçalhos devem ser acompanhadas por atualização do contrato da API e dos chamadores correspondentes.

## Pontos de manutenção

- A URL base efetivamente usada pelo Axios está fixa em `src/services/api.ts`; a variável `BASE_API` presente nos arquivos `.env.*` ainda não é consumida.
- A tela inicial contém o iframe do site público. A substituição desse fluxo exige decisão de produto e validação do conteúdo de destino.
- Não há suíte de testes ou lint configurados nos scripts atuais do `package.json`; registre validação manual e limitações no checkpoint de cada mudança.

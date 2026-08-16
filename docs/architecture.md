# Organização do frontend

Este documento resume as responsabilidades observadas no frontend sem alterar o comportamento da aplicação.

## Fluxo principal

```text
App.tsx
  └── NavigationContainer (linking = src/router/index.tsx)
        └── Stack.Navigator
              ├── público: Home, About, VirtualTour, Posts, Contact, Sponsor, Volunteer
              └── autenticação/administração: Admin, ResetPassword, Dashboard,
                    Users, AddUsers, Items, AddItems

pages ── usam ── services ── usam ── services/api.ts ── HTTP JSON ── MCU Core
  │                              └── utils.tsx recupera os cabeçalhos de sessão
  └── components compartilhados (Sidebar, Dropdown, Progress)
```

`src/pages/index.tsx` reexporta as telas consumidas pelo `Stack.Navigator`. As
seis telas públicas internalizadas têm componentes próprios em `src/pages/`;
as telas administrativas e de autenticação existentes continuam no mesmo
stack.

## Navegação

Os nomes das telas registrados em `App.tsx` correspondem às chaves de
`src/router/index.tsx`. O `NavigationContainer` recebe esse objeto de linking,
que atualmente declara somente o prefixo local `http://localhost:19006`. Os
valores de `config.screens` não têm barra final; os sufixos públicos preservados
para acesso web são mostrados na última coluna:

| Tela | `config.screens` | URL pública |
| --- | --- |
| Home | `''` | `/` |
| About | `about` | `/about/` |
| VirtualTour | `virtual-tour` | `/virtual-tour/` |
| Posts | `posts` | `/posts/` |
| Contact | `contact` | `/contact/` |
| Sponsor | `sponsor` | `/sponsor/` |
| Volunteer | `volunteer` | `/volunteer/` |
| Admin | `admin` | `/admin` |
| ResetPassword | `admin/reset-password` | `/admin/reset-password` |
| Dashboard | `admin/dashboard` | `/admin/dashboard` |
| Users | `admin/users` | `/admin/users` |
| AddUsers | `admin/users/add` | `/admin/users/add` |
| Items | `admin/items` | `/admin/items` |
| AddItems | `admin/items/add` | `/admin/items/add` |
| NotFound | `*` | qualquer caminho não mapeado |

### Conteúdo público e fallback

- A Home oferece links nativos para `/about/`, `/virtual-tour/`, `/posts/`,
  `/contact/`, `/sponsor/` e `/volunteer/`. O mesmo componente ainda renderiza
  um `iframe` para `https://museucomputacao.github.io` abaixo desses links.
- `/posts/` mantém localmente uma lista de 12 registros com título, descrição,
  autor, data, tema e `legacyPath`. A busca normaliza acentos e caixa e combina
  com o filtro de tema; a ação de leitura abre
  `https://museucomputacao.github.io` concatenado ao `legacyPath`. Os corpos dos
  artigos continuam no fallback Jekyll.
- `/contact/`, `/sponsor/` e `/volunteer/` são telas informativas. Cada uma
  preserva o canal público legado como uma URL externa e usa
  `Linking.openURL` a partir de um `Pressable` com papel de link. Não há campos
  de entrada, coleta ou submissão implementados nessas telas; destino,
  responsabilidade e demais decisões institucionais não são definidos pelo
  frontend.

O iframe geral ainda é parte do fluxo da Home. Sua remoção depende de smoke e
paridade verificáveis por rota — incluindo acesso direto, reload,
responsividade, console/rede e compatibilidade dos canais legados — e não é
declarada por esta documentação.

## Serviços HTTP

- `UserServices`: login, logout, cadastro, atualização e remoção de usuários.
- `ItemService`: listagem e criação de itens.
- `RoleService`: consulta dos papéis disponíveis.
- `api.ts`: instância Axios compartilhada pelos serviços.

O cliente envia os cabeçalhos de Devise Token Auth recuperados de `AsyncStorage`. Mudanças em rotas, envelopes de payload ou nomes de cabeçalhos devem ser acompanhadas por atualização do contrato da API e dos chamadores correspondentes.

## Pontos de manutenção

- A URL base efetivamente usada pelo Axios está fixa em `src/services/api.ts`; a variável `BASE_API` presente nos arquivos `.env.*` ainda não é consumida.
- A Home ainda contém o iframe do site público. A substituição desse fluxo exige validação de paridade e smoke por rota, além das decisões de conteúdo e compatibilidade já registradas.
- Não há suíte de testes ou lint configurados nos scripts atuais do `package.json`; registre validação manual e limitações no checkpoint de cada mudança.

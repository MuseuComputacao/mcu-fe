# MCU-FE — Painel do Museu da Computação da UFRJ

Aplicação web/móvel usada para autenticação de administradores e gerenciamento dos itens, usuários e papéis do museu. O projeto usa React Native com Expo e é executado no navegador por meio do React Native Web.

## Stack observada

As versões abaixo descrevem o checkout atual. Esta tarefa apenas documenta o estado existente; não atualiza dependências.

- React Native 0.64.3
- Expo ~44.0.0
- React 17.0.1
- React Native Web 0.17.1
- TypeScript ~4.3.5
- Yarn como gerenciador de pacotes

## Executar localmente

Com Node.js e Yarn compatíveis instalados:

```bash
yarn install --frozen-lockfile
yarn web
```

O painel ficará disponível em `http://localhost:19006/`.

Com Docker:

```bash
docker compose config
docker compose up --build
```

O container executa o mesmo comando `yarn web` e expõe a porta `19006`.

## Scripts disponíveis

| Comando | Uso |
| --- | --- |
| `yarn start` | Iniciar o Expo |
| `yarn web` | Iniciar o Expo para a web |
| `yarn android` | Iniciar o Expo para Android |
| `yarn ios` | Iniciar o Expo para iOS |
| `yarn eject` | Ejetar o projeto Expo; requer decisão própria |

O `package.json` não define atualmente um script de testes ou lint. A verificação mínima desta aplicação é iniciar o Expo e percorrer os fluxos afetados no ambiente local.

## Organização do código

- `App.tsx`: registra o `NavigationContainer` e as telas do stack principal.
- `src/router/index.tsx`: define os prefixes e os caminhos de deep linking.
- `src/pages/`: telas do painel, autenticação e página inicial.
- `src/components/`: componentes visuais reutilizáveis, como sidebar e dropdown.
- `src/services/`: chamadas HTTP agrupadas por domínio (`UserServices`, `ItemService` e `RoleService`).
- `src/utils/utils.tsx`: recuperação dos cabeçalhos de autenticação armazenados localmente.

Uma visão dos fluxos e limites do cliente está em [`docs/architecture.md`](docs/architecture.md).

## API e configuração

Os serviços usam a instância Axios de [`src/services/api.ts`](src/services/api.ts). Os arquivos `.env.development` e `.env.production` declaram `BASE_API`, mas o cliente atual ainda mantém a URL base diretamente no serviço Axios. Essa divergência é uma pendência de configuração e não foi alterada nesta tarefa.

Após o login, os dados de sessão são armazenados em `AsyncStorage` na chave `@user`. As requisições autenticadas recuperam `access-token`, `uid` e `client` desse registro.

A página `Home` atualmente incorpora o site público por iframe. A remoção desse vínculo é uma tarefa de produto separada deste trabalho documental.

## Convenções de Git

Branches e mensagens de commit devem usar inglês:

- Branches: `feat/branch-name`, `fix/branch-name`, `docs/branch-name`
- Commits: `feat(context): message`, `fix(context): message`, `docs(context): message`, `tests(context): message`

Antes de abrir um pull request, registre o comando usado para validar a aplicação e qualquer limitação encontrada.

# ToDo

Lista de tarefas com backend em Node.js/Express e frontend em React (Vite).

As tarefas ficam em memória, então são perdidas quando o servidor reinicia.

## Estrutura

```
back/src/   API REST (Express)
front/      Interface web (React + Vite)
```

## Como rodar

Pré-requisito: Node.js 20 ou superior.

### Backend

Na raiz do projeto:

```bash
npm install
npm run dev
```

A API sobe em `http://localhost:3000`. Para usar outra porta, crie um arquivo `.env` na raiz com `PORT=<porta>`.

### Frontend

Em outro terminal:

```bash
cd front
npm install
npm run dev
```

Acesse `http://localhost:5173`. O Vite repassa as requisições de `/tarefas` para a API em `localhost:3000`.

## API

| Método | Rota            | Descrição                                   |
| ------ | --------------- | ------------------------------------------- |
| GET    | `/tarefas`      | Lista todas as tarefas                      |
| GET    | `/tarefas/:id`  | Busca uma tarefa                            |
| POST   | `/tarefas`      | Cria uma tarefa (`nome`, `descricao`)       |
| PUT    | `/tarefas/:id`  | Atualiza `nome`, `descricao` e/ou `status`  |
| DELETE | `/tarefas/:id`  | Remove uma tarefa                           |

Toda tarefa é criada com status `fazer`. Os status válidos são `fazer`, `fazendo` e `pronto`.

# Especificação de Requisitos de Software (SRS)
**Projeto** Plataforma RH
**Versão** 1.0
**Data** 02/06/2026

## 1. Introdução
### 1.1 Propósito
Este documento descreve os requisitos funcionais e não funcionais para o Módulo de Currículos e Vagas da Plataforma de RH. O objetivo deste módulo é permitir que candidatos gerenciem suas informações profissionais e que a administração visualize esses dados.

### 1.2 Escopo
O sistema compreende o desenvolvimento de uma interface frontend em Angular integrada a um backend simulado (json-server). As funcionalidades incluem o CRUD completo de currículos, vinculação de dados por ID de usuário e interface administrativa para gestão.

---

## 2. Descrição Geral

## 3. Requisitos do Sistema

### 3.1 Requisitos Funcionais (RF)

### 3.1 Requisitos Não-Funcionais (RNF)

## 4. Interface de Dados e Modelagem do Sistema

### 4.1 Diagramas

#### 4.1.1 Diagrama de Uso
#### 4.1.2 Diagrama de Classe
#### 4.1.3 Diagrama de Fluxo

## 5. Critérios de Aceitação

1.  **Operação CRUD:** É possível criar, ler, atualizar e excluir um registro no `db.json` através da interface?
2.  **Navegação:** As rotas configuradas levam aos componentes corretos sem erros de console?
3.  **Feedback:** O usuário recebe uma confirmação (ex: MatSnackBar) ao salvar um currículo?
4.  **Consistência:** Os dados exibidos na listagem correspondem exatamente ao que está no backend simulado?

## 6. Configuração do Ambiente

## 7. Como executar o projeto

- Certifique-se de ter o Node.js instalado.
- Instale as dependências do frontend:
  ```bash
  npm install
  ```
- Inicie o backend simulado com `json-server` a partir da raiz do projeto:
  ```bash
  json-server --watch backend/db.json --port 3007
  ```
- Em outro terminal, execute o frontend Angular:
  ```bash
  npm start
  ```
- Abra o navegador em `http://localhost:4200`.

## 8. Rotas principais do módulo de currículos

- `/curriculos` — Lista geral de currículos cadastrados.
- `/curriculos/novo` — Formulário para cadastrar um novo currículo.
- `/curriculos/editar/:id` — Formulário para editar um currículo existente.
- `/curriculos/:id` — Visualização detalhada de um currículo.
- `/meu-curriculo` — Página de visualização do currículo do usuário simulado.

## 9. Observações do novo módulo

- O backend simulado usa o recurso `curriculos` em `backend/db.json`.
- A aplicação já conta com um serviço Angular para CRUD de currículos em `src/app/core/services/curriculo.service.ts`.
- O formulário de currículo utiliza formulários reativos e validação básica de campos.
- O módulo mantém a mesma lógica de gestão de dados já aplicada ao módulo de vagas.


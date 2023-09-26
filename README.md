# Star Fleet - Frontend 🌌🖖

Este projeto é um frontend construído com React e TypeScript para os fãs de Star Trek. Ele oferece uma interface intuitiva para visualizar posts, informações sobre planetas (usando a [STAPI - Star Trek API](https://stapi.co/api)), e quizzes. Este projeto foi desenvolvido como parte do MVP 3 da pós-graduação da PUC-Rio.

## 🚀 Funcionalidades

- **Visualização de Posts**: Os usuários podem escrever/editar/deletar posts relacionados ao universo de Star Trek.
- **Detalhes dos Planetas**: Através da integração com a STAPI, é possível obter informações detalhadas sobre diversos planetas do universo de Star Trek e uma vizualização em 3D do mesmo.
- **Quizzes**: Desafie seus conhecimentos sobre Star Trek respondendo quizzes.

## 🧰 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [STAPI - Star Trek API](https://stapi.co/api)


## 🐳 Executando o Projeto com Docker

```bash
# Construir a imagem
docker build -t nome-da-imagem .

# Rodar o contêiner
docker run -p 3000:3000 nome-da-imagem
```
## Configuração das Variáveis de Ambiente

1. Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
2. Preencha as variáveis de ambiente no arquivo `.env` conforme necessário. Por exemplo, defina a URL base da API do backend.

```env
VITE_API_URL=YOUR_BACKEND_API_URL_HERE
```
## Caso esteja rodando no WSL2

Se você estiver usando o WSL2, pode ser necessário utilizar o IP interno do contêiner Docker para que o front-end se conecte ao back-end. Siga os passos abaixo:

Construa e rode seu contêiner do back-end.

Identifique o nome ou ID do contêiner do back-end usando:

```bash
docker ps
```

Descubra o IP interno do contêiner do back-end:

```bash
docker inspect <CONTAINER_NAME_OR_ID> | jq -r '.[0].NetworkSettings.IPAddress'
```
Substitua <CONTAINER_NAME_OR_ID> pelo nome ou ID do contêiner obtido.

Use o IP obtido para configurar a variável de ambiente no seu arquivo .env para o front-end:

```env
VITE_API_URL=http://<CONTAINER_IP>:5000
```
Substitua <CONTAINER_IP> pelo IP obtido no passo 3.

Agora siga os passos normais para construir e rodar o contêiner do front-end.

## Desenvolvimento Local

Se você deseja executar o projeto localmente sem Docker:

```bash

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

A aplicação irá se conectar ao backend.

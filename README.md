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

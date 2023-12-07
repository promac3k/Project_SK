// nao esquecer de criar o arquivo .env na raiz do projeto
// entra no caminho backend/ 
// iniciar o projecto com o 'npm run dev' ou 'npm start'

// EXPRESS
const express = require('express');

// LER O FICHEIRO .ENV
require('dotenv/config');

// Modulos Locais com routas
const myRoute = require('./routes/myRoute.js');

// Inicialização Express e ler a porta do ficheiro env
const app = express();
const PORT = process.env.PORT;

// Middlewares 
app.use(express.json());
//app.use(express.urlencoded({ extended: false }))

// Codigo Front-end, html, css, js
app.use(express.static('./www/static'))


// Rota principal serão escritas aqui , ou seja todas as rotas iniciam com /api/v1/
app.use('/', myRoute);

// Server Listen Along with Database 
// connection(in case of data persistence) 
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

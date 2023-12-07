// Lembre-se de criar o arquivo .env na raiz do projeto
// Entre no diretório backend/
// Inicie o projeto com 'npm run dev' ou 'npm start'

// Importa o módulo Express
const express = require('express');

// Lê o arquivo .env e carrega as variáveis de ambiente
require('dotenv/config');

// Importa o módulo de rotas local
const myRoute = require('./routes/myRoute.js');

// Inicializa o Express e lê a porta do arquivo .env
const app = express();
const PORT = process.env.PORT;

// Adiciona o middleware para parsear o corpo das requisições como JSON
app.use(express.json());
// Adiciona o middleware para parsear o corpo das requisições como dados de formulário
// app.use(express.urlencoded({ extended: false }))

// Serve arquivos estáticos do diretório './www/static'
app.use(express.static('./www/static'))

// Adiciona as rotas do módulo 'myRoute' ao app
// Todas as rotas definidas em 'myRoute' serão prefixadas com '/'
app.use('/', myRoute);

// Inicia o servidor e escuta na porta especificada
// Em caso de erro, loga o erro no console
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});
// Lembre-se de criar o arquivo .env na raiz do projeto
// Entre no diretório backend/
// Inicie o projeto com 'npm run dev' ou 'npm start'

// Importa os módulos necessários
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);

// Lê o arquivo .env e carrega as variáveis de ambiente
require('dotenv/config');

// Importa o módulo de rotas local
const myRoute = require('./routes/myRoute.js');

// Inicializa o Express e lê a porta do arquivo .env
const app = express();
const PORT = process.env.PORT;

const options = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    createDatabaseTable: true,
    endConnectionOnClose: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

const sessionStore = new MySQLStore(options);


// Iniciar session
app.use(session({
    secret: 'secret',
    name: "session_id",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        maxAge: 60 * 60 * 10000,
        sameSite: true,
    },
}));



// Adiciona o middleware para parsear o corpo das requisições como JSON
app.use(express.json());
// Adiciona o middleware para parsear o corpo das requisições como dados de formulário
app.use(express.urlencoded({ extended: true }))

// Serve arquivos estáticos do diretório './www/static'
app.use(express.static('./www/static'))

app.use(cookieParser());

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
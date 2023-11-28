const mysql = require("mysql2/promise")
const { router } = require("../user")

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

// Testar a conexão
connection.getConnection()
    // O método .getConnection() retorna uma Promise que representa a tentativa de obter uma conexão.
    .then(() => console.log("Conexão bem-sucedida ao banco de dados"))
    .catch(err => {
        console.error("Erro ao conectar ao banco de dados:", err.message)
    })

module.exports = connection
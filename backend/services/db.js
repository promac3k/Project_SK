// Importa o módulo mysql2/promise, que é uma biblioteca para trabalhar com MySQL usando Promises
const mysql = require('mysql2/promise')
// Importa o módulo de configuração local
const config = require('../config')

// Define uma função assíncrona para executar queries SQL
// Esta função cria uma nova conexão com o banco de dados cada vez que é chamada
// A conexão é automaticamente fechada após 60 segundos (conforme definido no arquivo de configuração)
 async function query(sql, params) {
    // Cria uma nova conexão com o banco de dados
    const connection =  await mysql.createConnection(config.db)
    // Executa a query SQL e retorna os resultados
    const [results,] =  await connection.execute(sql, params)
    connection.end();

    return results
}

// Define uma função assíncrona para testar a função de query
// Esta função executa uma query SQL para selecionar todos os registros da tabela 'alunos'
 async function testQuery() {
    const results =  await query("select * from alunos")
    // Exibe os resultados da query no console em formato de tabela
    console.table(results)
}

// Executa a função de teste
// Esta linha está comentada, então a função de teste não será executada
//testQuery()

// Exporta a função de query para que ela possa ser importada e usada em outros arquivos
module.exports = {
    query,
}
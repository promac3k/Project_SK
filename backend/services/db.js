const mysql = require('mysql2/promise');
const config = require('../config');

// Criamos um metodo para as queries, so aqui é que abre a ligação mysql, lembrando que é automatico o fecho em 60s
// ficheiro config
async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

// Só um metodo para testes
async function testQuery() {
    const results = await query("select * from alunos");
    console.table(results);
}

// executar a função de teste anterior
//testQuery()

module.exports = {
    query,
}

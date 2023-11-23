const http = require('http');
const mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 3306;

try {
    // Cria a conexão com o banco de dados
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'mydb'
    });

    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to the database.');
    });
} catch (error) {
    console.error(`Failed to connect to the database: ${error}`);
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

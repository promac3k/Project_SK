// nao esquecer de criar o arquivo .env na raiz do projeto
// entra no caminho backend/ 
// iniciar o projecto com o 'node src/server.js' ou 'npm start'

require("dotenv").config()
const app = require("./app")

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Estou Vivo Port: ${PORT}`))

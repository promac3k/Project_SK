const express = require("express")
const router = require("./router")

const app = express()

app.use(router)
// Aqui você pode adicionar mais configurações para o app, como middlewares, rotas, etc.

module.exports = app
const express = require("express")
const bcrypt = require("bcrypt")
const router = express()
const connection = require("./models/connection")

// Verifica se a importação ocorreu corretamente
console.log("Conexão importada com sucesso:", connection)



let users = []

router.set("view-engine", "ejs")
router.use(express.urlencoded({ extended: false }))

router.post("/login", async (req, res) => {
    console.log(req.body.name)
    try {
        const username = req.body.name
        const password = req.body.password
        // Verificar se o usuário existe na base de dados
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).send("Usuário não encontrado")
        }
        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).send("Senha incorreta")
        }

        // Autenticação bem-sucedida
        res.status(200).send("Autenticação bem-sucedida")
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro no servidor")
    }
});

module.exports = router
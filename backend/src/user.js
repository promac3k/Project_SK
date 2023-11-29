const express = require("express")
const bcrypt = require("bcrypt")
const router = express()
const connection = require("./models/connection")
const nodemailer = require("nodemailer")

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
})




//Gmail api
// Configurando o transporte de e-mail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "projetosk81@gmail.com",
        pass: "TuacotaEgrande"
    }
})

router.post("/contact", (req, res) => {

    const user_email = req.body.email
    const user_cabecalho = req.body.cabecalho
    const user_mensagem = req.body.text_mail

    // Verificar se a propriedade email não está definida ou é undefined
    if (!user_email ||!user_cabecalho || !user_mensagem) { 
        return res.status(400).json({ error: "Os campos são todos obrigatorios" })
    }

    // Configurando as opções de e-mail com base nos dados do formulário
    const mailOptions = {
        from: user_email,
        to: "projetosk81@gmail.com",
        subject: user_cabecalho,
        text: user_mensagem
    }

    // Enviando o e-mail
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error)
            res.status(500).send("Erro ao enviar o e-mail.")
        } else {
            console.log("Email enviado: ' + info.response")
            res.status(200).send("E-mail enviado com sucesso.")
        }
    })

    console.log(user_email, user_cabecalho)
})

module.exports = router
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
    // Capture the input fields
    let username = request.body.name;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/pages/index.html');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
})




//Gmail api
// Configurando o transporte de e-mail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "projetosk81@gmail.com",
        pass: "txbz jxba jfrq ialn"
    }
})

router.post("/contact", (req, res) => {



    const user_email = req.body.email
    const user_cabecalho = req.body.cabecalho
    const user_mensagem = req.body.text_mail

    // Verificar se a propriedade email não está definida ou é undefined
    if (!user_email || !user_cabecalho || !user_mensagem) { 
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
            res.redirect("http://localhost:3333/login.html")
            
        }
    })



    console.log(user_email, user_cabecalho)
})

module.exports = router
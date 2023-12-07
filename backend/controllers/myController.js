// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const email = require('../services/email'); // Módulo para enviar emails
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos

const login = false; // Variável para controlar o estado de login

// Métodos para serem executados nas rotas
const get_index = (req, res) => {
    // Se o usuário estiver logado, envia o arquivo index.html
    // Caso contrário, envia o arquivo login.html
    if (login) {
        res.sendFile(path.join(__dirname, '..', 'www/index.html'))
    } else {
        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'))
    }
}

const get_login = (req, res) => {
    // Envia o arquivo login.html
    res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'))
}


const post_login = (req, res) => {
    //res.send("Hello, This was a post Request");
    let username = request.body.name
    let password = request.body.password
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true
                request.session.username = username
                // Redirect to home page
                response.redirect('/index.html')
            } else {
                response.send('Incorrect Username and/or Password!')
            }
            response.end()
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}

// Método para lidar com a rota GET para /contacts
const get_contacts = (req, res) => {
    // Envia o arquivo contact.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/contact.html'))
}

// Método para lidar com a rota POST para /contact
const post_contact = (req, res) => {
    // Extrai o email, cabeçalho e mensagem do corpo da requisição
    const user_email = req.body.email
    const user_cabecalho = req.body.cabecalho
    const user_mensagem = req.body.text_mail

    // Loga os valores recebidos
    console.log('user_email >>> ' + user_email)
    console.log('user_cabecalho >>> ' + user_cabecalho)
    console.log('user_mensagem >>> ' + user_mensagem)

    // Se algum dos campos estiver vazio, retorna um erro
    if (!user_email || !user_cabecalho || !user_mensagem) {
        return res.status(400).json({ error: "Os campos são todos obrigatorios" })
    }

    // Define as opções do email a ser enviado
    const mailOptions = {
        from: user_email,
        to: process.env.EMAIL_TO,
        subject: user_cabecalho,
        text: 'From : ' + user_email + "\n" + "subject: " + user_cabecalho + "\n message:" + user_mensagem
    }

    // Tenta enviar o email
    email.sendMail(mailOptions, function (error) {
        if (error) {
            // Se houver um erro, loga o erro e retorna uma mensagem de erro
            console.log(error)
            res.status(500).send("Erro ao enviar o e-mail")
        } else {
            // Se o email for enviado com sucesso, loga uma mensagem de sucesso e retorna uma mensagem de sucesso
            console.log("Email enviado: ' + info.response")
            res.status(200).send("E-mail enviado com sucesso!")
        }
    })

    // Loga o email e o cabeçalho
    console.log(user_email, user_cabecalho)
}

// Método para lidar com a rota GET para /eventos
const get_eventos = (req, res) => {
    // Envia o arquivo eventos.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/eventos.html'))
}

// Método para lidar com a rota GET para /profile
const get_profile = (req, res) => {
    // Envia o arquivo profile.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/profile.html'))
}

// Método para lidar com a rota GET para /blocoA
const get_blocoA = (req, res) => {
    // Envia o arquivo blocoA.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoA.html'))
}

// Método para lidar com a rota GET para /blocoB
const get_blocoB = (req, res) => {
    // Envia o arquivo blocoB.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoB.html'))
}

// Método para lidar com a rota GET para /blocoC
const get_blocoC = (req, res) => {
    // Envia o arquivo blocoC.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoC.html'))
}

// Método para lidar com a rota GET para /blocoD
const get_blocoD = (req, res) => {
    // Envia o arquivo blocoD.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoD.html'))
}

// Método para lidar com a rota GET para /blocoE
const get_blocoE = (req, res) => {
    // Envia o arquivo blocoE.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoE.html'))
}

// Método para lidar com a rota GET para /blocoF
const get_blocoF = (req, res) => {
    // Envia o arquivo blocoF.html como resposta
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoF.html'))
}

// Exporta todos os métodos como um objeto para serem usados em outros arquivos
module.exports = {
    get_index,
    get_login,
    post_login,
    get_contacts,
    post_contact,
    get_eventos,
    get_profile,
    get_blocoA,
    get_blocoB,
    get_blocoC,
    get_blocoD,
    get_blocoE,
    get_blocoF
}
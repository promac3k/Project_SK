// Modulos locais necessarios
const connection = require('../services/db');
const email = require('../services/email');
const path = require('path');

const login = false;


// Metodos para serem excutados nas rotas
const get_index = (req, res) => {
    //console.log('login >>> ' + login)
    
    if (login) {
        res.sendFile(path.join(__dirname, '..', 'www/index.html'))
    } else {
        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'))
    }

}

const get_login = (req, res) => {
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

const get_contacts = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/contact.html'))  
}

const post_contact = (req, res) => {
    const user_email = req.body.email
    const user_cabecalho = req.body.cabecalho
    const user_mensagem = req.body.text_mail

    console.log('user_email >>> ' + user_email)
    console.log('user_cabecalho >>> ' + user_cabecalho)
    console.log('user_mensagem >>> ' + user_mensagem)

    if (!user_email || !user_cabecalho || !user_mensagem) {
        return res.status(400).json({ error: "Os campos são todos obrigatorios" })
    }

    const mailOptions = {
        from: user_email,
        to: process.env.EMAIL_TO,
        subject: user_cabecalho,
        text: 'From : ' + user_email + "\n" + "subject: " + user_cabecalho + "\n message:" + user_mensagem
    }

    email.sendMail(mailOptions, function (error) {
        if (error) {

            console.log(error)
            res.status(500).send("Erro ao enviar o e-mail")


        } else {

            console.log("Email enviado: ' + info.response")
            res.status(200).send("E-mail enviado com sucesso!")

        }
    })

    console.log(user_email, user_cabecalho)
}

const get_eventos = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/eventos.html'))  
}

const get_profile = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/profile.html'))  
}

const get_blocoA = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoA.html'))  
}

const get_blocoB = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoB.html'))  
}

const get_blocoC = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoC.html'))  
}

const get_blocoD = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoD.html'))  
}

const get_blocoE = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoE.html'))  
}

const get_blocoF = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoF.html'))  
}



// Export of all methods as object 
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
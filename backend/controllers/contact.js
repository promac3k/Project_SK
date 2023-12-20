// Importa os módulos locais necessários
const email = require('../services/email'); // Módulo para enviar emails
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const string = require("string-sanitizer"); // Módulo para sanitizar strings


//Contact pages
// Método para lidar com a rota GET para /contacts
const get_contacts = (req, res) => {
    console.log("get_contacts >>>>> " + req.session.loggedin);

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
    //console.log('user_email >>> ' + user_email)
    //console.log('user_cabecalho >>> ' + user_cabecalho)
    //console.log('user_mensagem >>> ' + user_mensagem)

    // Se algum dos campos estiver vazio, retorna um erro
    if (!user_email || !user_cabecalho || !user_mensagem) {
        return res.status(400).send("Os campos são todos obrigatorios");
    }

    if (string.validate.isEmail(user_email) === false) {
        return res.status(404).send('Por favor, insira um email valido!');

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
            return res.status(500).send("Erro ao enviar o e-mail")
        } else {
            // Se o email for enviado com sucesso, loga uma mensagem de sucesso e retorna uma mensagem de sucesso
            console.log("Email enviado: ' + info.response")
            return res.status(200).send("E-mail enviado com sucesso!")
        }
    })

    // Loga o email e o cabeçalho
    console.log(user_email, user_cabecalho)
}

// Exporta todos os métodos como um objeto para serem usados em outros arquivos
module.exports = {
    get_contacts,
    post_contact,
}

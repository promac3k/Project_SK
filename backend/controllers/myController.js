// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const email = require('../services/email'); // Módulo para enviar emails
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const string = require("string-sanitizer");



// Métodos para serem executados nas rotas
const get_index = (req, res) => {

    console.log("get_index >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Output username
        var cookie = req.cookies.user;
        console.log(cookie);
        if (cookie === undefined) {
            res.cookie("user", req.session.user);
        }
        res.sendFile(path.join(__dirname, '..', 'www/index.html'));
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }
}


const get_login = (req, res) => {
    // Envia o arquivo login.html
    console.log("get_login >>>>> " + req.session.loggedin);
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, '..', 'www/index.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }
}


// aluno1@example.com
// 098f6bcd4621d373cade4e832627b4f6
const post_login = async (req, res) => {
    // Captura os campos de entrada do formulário
    let email = req.body.email;
    let password = req.body.password;

    // Se algum dos campos estiver vazio, retorna um erro
    if (!email || !password) {
        return res.status(400).send("Os campos são todos obrigatorios");
    }

    if (string.validate.isEmail(email) === false) {
        return res.status(404).send('Por favor, insira um email valido!');

    }

    /*if (string.validate.isPassword6to15(password) === false) {

        return res.status(404).send('Por favor, insira uma senha valida!');

    }*/

    console.log(email, password);
    // Garante que os campos de entrada existem e nao estao vazios
    if (email && password) {

        const result = await connection.query('SELECT * FROM alunos WHERE email_alunos = ? AND pass_alunos = ?', [email, password])
        //console.table(result[0]);
        //console.log(result.length);
        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.user = email;
            req.session.save(function (err) {
                if (err) return next(err);
            });
            res.cookie("user", result[0].nome_alunos);
            res.cookie("email_aluno", result[0].email_alunos);
            res.cookie("turma_aluno", result[0].turma_alunos);
            res.cookie("curso_aluno", result[0].cursos_id_cursos);
            res.cookie("ano_aluno", result[0].ano_alunos);

            res.status(200).send("E-mail enviado com sucesso!")

        }
        else {
            return res.status(404).send('Email ou senha incorretos!');

        };

    }
}

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
    console.log('user_email >>> ' + user_email)
    console.log('user_cabecalho >>> ' + user_cabecalho)
    console.log('user_mensagem >>> ' + user_mensagem)

    // Se algum dos campos estiver vazio, retorna um erro
    if (!user_email || !user_cabecalho || !user_mensagem) {
        return res.status(400).json({ error: "Os campos são todos obrigatorios" })
    }

    if (string.validate.isEmail(user_email) === false) {

        console.log("email invalido");

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
            console.log(error)
            return res.status(500).send("Erro ao enviar o e-mail")
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
    console.log("get_eventos >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo eventos.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/eventos.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /profile
const get_profile = (req, res) => {
    console.log("get_profile >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo profile.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/profile.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }

}

// Método para lidar com a rota GET para /blocoA
const get_blocoA = (req, res) => {
    console.log("get_blocoA >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoA.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoA.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoB
const get_blocoB = (req, res) => {
    console.log("get_blocoB >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoB.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoB.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoC
const get_blocoC = (req, res) => {
    console.log("get_blocoC >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoC.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoC.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoD
const get_blocoD = (req, res) => {
    console.log("get_blocoD >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoD.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoD.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoE
const get_blocoE = (req, res) => {
    console.log("get_blocoE >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoE.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoE.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoF
const get_blocoF = (req, res) => {
    console.log("get_blocoF >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoF.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/blocos/blocoF.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }

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
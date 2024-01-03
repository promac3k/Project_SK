// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const cookie_bcrypt = require('../services/cookie_bcrypt'); // Módulo para criptografar cookies

//Login Page
// Métodos para serem executados nas rotas
const get_index = (req, res) => {

    console.log("get_index >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {

        if (req.cookies.user) {
            //const decryptedUser = cookie_bcrypt.decrypt(req.cookies.user);
            //console.log("get_index >>>>> " + JSON.parse(decryptedUser));
            var cookie = cookie_bcrypt.decrypt(req.cookies.user);
            console.log(cookie);
        }

        if (cookie === undefined) {
            res.cookie("user", req.session.user);
        }

        res.sendFile(path.join(__dirname, '..', 'www/index.html'));

    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }
}

const get_logout = (req, res) => {

    console.log("get_logout >>>>> " + req.session.loggedin);

    req.session.destroy();
    res.clearCookie('user');
    res.clearCookie('id');
    res.clearCookie('id_prof');
    res.clearCookie('connect.sid');
    res.redirect('/');
}


const get_simulacao = (req, res) => {
    console.log("get_simulacao >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo eventos.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/simulacao.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}

const get_emails = async (req, res) => {
    console.log("get_emails >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        const id_aluno = cookie_bcrypt.decrypt(req.cookies.id);
        //console.log(id_aluno);

        try {
            const [db_alunos] = await connection.query(`SELECT * FROM alunos where id_alunos = ? `, [id_aluno]);
            const email_aluno = db_alunos.email_aluno;

            const db_emails = await connection.query(`SELECT * FROM emails where \`to\` = ? `, [email_aluno]);

            //console.log(db_emails);

            // Create an array of emails
            const emails = db_emails.map(email => ({
                id: email.id_email,
                from: email.from,
                subject: email.subject,
                text: email.text
            }));

            //console.log(emails);

            res.json(emails);

        } catch (err) {
            console.error(err);
            res.status(500).send('Ocorreu um erro ao buscar os emails.');
        }

    } else {
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }
}

const post_delete_email = async (req, res) => {

    console.log("delete_email >>>>> " + req.session.loggedin);

    if (!req.session.loggedin) {
        return res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }

    const { id, from, subject, text } = req.body;

    //console.log(id, from, subject, text);

    try {
        // First, select the email from the database
        const [db_emails] = await connection.query(`SELECT * FROM emails WHERE id_email = ?`, [id]);

        if (!db_emails || db_emails.length === 0) {
            return res.status(400).send('Nenhum email encontrado com o ID fornecido.');
        }

        const { from: from2, subject: subject2, text: text2 } = db_emails;

        //console.log(from2, subject2, text2);

        // Check if the email exists and the data matches
        if (from2 === from && subject2 === subject && text2 === text) {
            
            //console.log("Email matches");

            // If the data matches, delete the email
            await connection.query(`DELETE FROM emails WHERE id_email = ?`, [id]);

            return res.json({
                status: 'success',
                message: 'Email deleted'
            });
        } else {
            // If the data does not match, send an error response
            return res.status(400).send('Os dados fornecidos não correspondem ao email existente.');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Ocorreu um erro ao deletar o email.');
    }
}


const get_decrypt_user = (req, res) => {

    if (req.cookies.user) {
        const decryptedUser = cookie_bcrypt.decrypt(req.cookies.user);
        res.json(JSON.parse(decryptedUser));
    } else {
        res.status(400).send('No user cookie found');
    }

}


// Exporta todos os métodos como um objeto para serem usados em outros arquivos
module.exports = {
    get_index,
    get_logout,
    get_simulacao,
    get_emails,
    post_delete_email,
    get_decrypt_user
}
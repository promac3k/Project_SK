// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const string = require("string-sanitizer"); // Módulo para sanitizar strings
const bcrypt = require('../services/bcrypt'); // Módulo para criptografar senhas


//Login Page
// Métodos para serem executados nas rotas
const get_index = (req, res) => {

    console.log("get_index >>>>> " + req.session.loggedin);
    if (req.cookies.user) {
        console.log("get_index >>>>> " + JSON.parse(req.cookies.user));
    }

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

const get_logout = (req, res) => {

    console.log("get_logout >>>>> " + req.session.loggedin);

    req.session.destroy();
    res.clearCookie('user');
    res.clearCookie('connect.sid');
    res.redirect('/');
}

const post_change_password = async (req, res) => {

    const { pass_antiga, pass_nova, pass_confirme } = req.body;

    if (!pass_antiga || !pass_nova || !pass_confirme) {
        return res.status(400).send("Os campos são todos obrigatorios");
    }

    if (string.validate.isPassword6to15(pass_antiga) === false) {
        return res.status(404).send('Por favor, insira uma senha valida!');
    }

    if (string.validate.isPassword6to15(pass_nova) === false) {
        return res.status(404).send('Por favor, insira uma senha valida, com 6 a 15 caracteres e um caracter especial!');
    }

    if (string.validate.isPassword6to15(pass_confirme) === false) {
        return res.status(404).send('Por favor, insira uma senha valida, com 6 a 15 caracteres e um caracter especial!');
    }

    const result = await connection.query('SELECT pass_aluno FROM alunos WHERE email_aluno = ?', [req.session.user]);

    if (result.length > 0) {

        const db = result[0];
        const result_pass = await bcrypt.comparePasswords(pass_antiga, db.pass_aluno);

        if (result_pass) {

            if (pass_antiga === pass_nova) {
                return res.status(404).send('A nova senha não pode ser igual a antiga!');
            }

            if (pass_nova === pass_confirme) {

                const hash = await bcrypt.hashPassword(pass_nova);
                const result = await connection.query('UPDATE alunos SET pass_aluno = ? WHERE email_aluno = ?', [hash, req.session.user]);

                if (result.affectedRows > 0) {
                    console.log(">>>>> Senha alterada com sucesso!");
                    return res.status(200).send("Senha alterada com sucesso!");
                } else {
                    return res.status(404).send('Erro ao alterar a senha!');
                }

            } else {
                return res.status(404).send('As senhas não correspondem!');
            }

        } else {
            return res.status(404).send('Senha incorreta!');
        }
    }

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


// Exporta todos os métodos como um objeto para serem usados em outros arquivos
module.exports = {
    get_index,
    get_logout,
    post_change_password,
    get_eventos,
}
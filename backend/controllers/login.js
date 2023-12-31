// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const string = require("string-sanitizer"); // Módulo para sanitizar strings
const bcrypt = require('../services/bcrypt'); // Módulo para criptografar senhas
const cookie_bcrypt = require('../services/cookie_bcrypt'); // Módulo para criptografar cookies


const get_login = (req, res) => {
    // Envia o arquivo login.html
    console.log("get_login >>>>> " + req.session.loggedin);
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, '..', 'www/index.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }
}

const post_login = async (req, res) => {
    // Captura os campos de entrada do formulário
    let email = req.body.email;
    let password = req.body.password;

    //const hash = await bcrypt.hashPassword(password);
    //console.log(hash);


    // Se algum dos campos estiver vazio, retorna um erro
    if (!email || !password) {
        return res.status(400).send("Os campos são todos obrigatorios");
    }
    // Verificar se o email é válido
    if (string.validate.isEmail(email) === false) {
        return res.status(404).send('Por favor, insira um email/senha valido!');
    }
    // Verificar se a senha é válida
    if (string.validate.isPassword6to15(password) === false) {
        return res.status(404).send('Por favor, insira uma email/senha valida!');
    }

    tipo = null;

    if (email.includes('professores.ips.pt')) {
        tipo = 1;
        //console.log(email, password);
        // Garante que os campos de entrada existem e nao estao vazios
        if (email && password) {

            const result = await connection.query(`SELECT * FROM professores where email_prof = ? `, [email]);
            //console.table(result[0]);
            //console.log(result.length);
            if (result.length > 0) {

                const db = result[0];
                const result_pass = await bcrypt.comparePasswords(password, db.pass_prof);

                if (result_pass) {

                    req.session.loggedin = true;
                    req.session.user = email;
                    req.session.save(function (err) {
                        if (err) return next(err);
                    });


                    const user = { nome: db.nome_prof, email: db.email_prof, tipo: tipo }
                    const id = db.id_prof;

                    var id_encrypted = cookie_bcrypt.encrypt(id.toString());

                    res.cookie("user", cookie_bcrypt.encrypt(JSON.stringify(user)));
                    res.cookie("id_prof", id_encrypted);
                    res.status(200).send("Login efetuado com sucesso!")

                } else {
                    return res.status(404).send('Email ou senha incorretos!');
                };
            }
            else {
                return res.status(404).send('Email ou senha incorretos!');
            };
        }
    } else {
        tipo = 0;
        //console.log(email, password);
        // Garante que os campos de entrada existem e nao estao vazios
        if (email && password) {

            const result = await connection.query('SELECT alunos.*, cursos.nome_curso FROM alunos LEFT JOIN cursos ON alunos.cursos_id_cursos = cursos.id_cursos WHERE email_aluno = ?', [email])
            //console.table(result[0]);
            //console.log(result.length);
            if (result.length > 0) {

                const db = result[0];
                const result_pass = await bcrypt.comparePasswords(password, db.pass_aluno);

                if (result_pass) {

                    req.session.loggedin = true;
                    req.session.user = email;
                    req.session.save(function (err) {
                        if (err) return next(err);
                    });


                    const user = { nome: db.nome_aluno, email: db.email_aluno, turma: db.turma_aluno, curso: db.nome_curso, ano: db.ano_aluno, escola: db.escola, tipo: tipo }
                    const id = db.id_alunos;

                    var id_encrypted = cookie_bcrypt.encrypt(id.toString());

                    res.cookie("user", cookie_bcrypt.encrypt(JSON.stringify(user)));
                    res.cookie("id", id_encrypted);
                    //console.log("decrypted id: ", cookie_bcrypt.decrypt(id_encrypted));
                    res.status(200).send("Login efetuado com sucesso!")

                } else {
                    return res.status(404).send('Email ou senha incorretos!');
                };
            }
            else {
                return res.status(404).send('Email ou senha incorretos!');
            };
        }
    }
}

module.exports = {
    get_login,
    post_login
}
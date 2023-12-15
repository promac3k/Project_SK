// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const email = require('../services/email'); // Módulo para enviar emails
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

    /*bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log(`Hash: ${hash}`);
    });*/

    // Se algum dos campos estiver vazio, retorna um erro
    if (!email || !password) {
        return res.status(400).send("Os campos são todos obrigatorios");
    }

    if (string.validate.isEmail(email) === false) {
        return res.status(404).send('Por favor, insira um email/senha valido!');
    }

    if (string.validate.isPassword6to15(password) === false) {
        return res.status(404).send('Por favor, insira uma email/senha valida!');
    }

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

                const user = {nome: db.nome_aluno, email: db.email_aluno, turma: db.turma_aluno, curso: db.nome_curso, ano: db.ano_aluno }
                const id = db.id_alunos;
                res.cookie("user", JSON.stringify(user));
                res.cookie("id", id);
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

//Profile pages
// Método para lidar com a rota GET para /profile
const get_profile = async (req, res) => {
    console.log("get_profile >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo profile.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/profile.html'));
        const id_aluno = req.cookies.id;

        const inscritas = await connection.query('SELECT * FROM inscritas  WHERE alunos_id_alunos = ?', [id_aluno]);
        console.table(inscritas[0]);
        //console.log(inscritas.length);

        const db_inscritas = inscritas[0];
        const id_inscritas = db_inscritas.disciplina_id_disc;
        //console.log(id_inscritas);

        const disciplinas = await connection.query('SELECT * FROM disciplina WHERE id_disc = ?', [id_inscritas]);
        console.table(disciplinas[0]);

        const presencas = await connection.query('SELECT * FROM presenças WHERE alunos_id_alunos = ? and disciplina_id_disc', [id_aluno], [id_inscritas]);
        console.table(presencas[0]);

        const db_presencas = presencas[0];
        const id_horario = db_presencas.horarios_id_horario;

        const horario = await connection.query('SELECT * FROM horario WHERE id_horario = ?', [id_horario]);
        console.table(horario[0]);


        const result = await connection.query('SELECT * FROM alunos ')
        console.table(result[0]);
        console.log(result.length);


    
        // Process the 'result' data and generate the HTML content for the timetable
        const timetableHTML = generateTimetableHTML(result);
      
        console.log(timetableHTML);
        return timetableHTML;
    
        //get_horario();
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }

}

function generateTimetableHTML(data) {
    // Implement logic to generate HTML based on the 'data' received from the database
    // You need to iterate through the data and construct the HTML accordingly
    // Example:
    const timetableRows = data.map(row => `<tr><td>${row.time}</td><td>${row.monday}</td>...</tr>`);

    // Construct the entire timetable table HTML
    const timetableHTML = `
        <table class="table_alunos">
            <tr class="tr_alunos">
                <th>Horas</th>
                <th>Segunda</th>
                <!-- Add other days of the week headers -->
            </tr>
            ${timetableRows.join('')}
        </table>
    `;

    return timetableHTML;
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
    get_logout,
    get_login,
    post_login,
    post_change_password,
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
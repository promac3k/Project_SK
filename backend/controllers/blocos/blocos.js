const connection = require('../../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const email = require('../../services/email'); // Módulo para enviar emails


// Método para lidar com a rota GET para /blocoA
const get_blocoA = (req, res) => {
    console.log("get_blocoA >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoA.html como resposta
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/blocos/blocoA.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoB
const get_blocoB = (req, res) => {
    console.log("get_blocoB >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoB.html como resposta
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/blocos/blocoB.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoC
const get_blocoC = (req, res) => {
    console.log("get_blocoC >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoC.html como resposta
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/blocos/blocoC.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoD
const get_blocoD = (req, res) => {
    console.log("get_blocoD >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoD.html como resposta
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/blocos/blocoD.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoE
const get_blocoE = (req, res) => {
    console.log("get_blocoE >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoE.html como resposta
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/blocos/blocoE.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }


}

// Método para lidar com a rota GET para /blocoF
const get_blocoF = (req, res) => {
    console.log("get_blocoF >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo blocoF.html como resposta
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/blocos/blocoF.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }

}

const post_bloco_ids = async (req, res) => {
    console.log("post_bloco_ids >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        try {

            const { bloco, sala, dia } = req.body;
            //console.log("bloco: " + bloco);
            //console.log("sala: " + sala);
            //console.log("dia: " + dia);

            const horario = await connection.query(`
                SELECT 
                    hs.dia_semana, 
                    hs.hora_salas AS hora_sala, 
                    hs.fimh_salas AS fimh_sala, 
                    d.nome_disc, 
                    p.nome_prof, 
                    c.nome_curso
                FROM horario_salas hs
                JOIN salas s ON hs.salas_id_salas = s.id_salas
                JOIN disciplina d ON hs.disciplina_id_disc = d.id_disc
                JOIN professores p ON d.professores_id_prof = p.id_prof
                JOIN cursos c ON d.cursos_id_cursos = c.id_cursos
                WHERE s.bloco_salas = ? AND s.numero_salas = ? AND hs.data_salas = ?
            `, [bloco, sala, dia]);


            // Criar um objeto para armazenar os horários organizados por dia da semana e hora do dia
            const horariosOrganizados = {
                segunda: {},
                terca: {},
                quarta: {},
                quinta: {},
                sexta: {},
                sabado: {}
            };

            for (let db_horario of horario) {
                const dia = db_horario.dia_semana;
                const inicio_hora = db_horario.hora_sala;
                const fim_hora = db_horario.fimh_sala;
                const aula = db_horario.nome_disc;
                const nome_prof = db_horario.nome_prof;
                const curso = db_horario.nome_curso;

                // Verificar se horariosOrganizados[dia] existe, se não, criar um objeto vazio
                if (!horariosOrganizados[dia]) {
                    horariosOrganizados[dia] = {};
                }

                // Adicionar os dados ao objeto horariosOrganizados
                if (!horariosOrganizados[dia][inicio_hora]) {
                    horariosOrganizados[dia][inicio_hora] = [];
                }
                horariosOrganizados[dia][inicio_hora].push({
                    aula: aula,
                    nome_prof: nome_prof,
                    fim_hora: fim_hora,
                    curso: curso

                });
            }

            //console.log(horariosOrganizados);

            // Enviar os dados organizados como resposta
            res.json(horariosOrganizados);

        } catch (err) {
            console.error(err);
            res.status(500).send('Ocorreu um erro ao buscar o horario.');
        }
    } else {
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }

}

const get_disciplinas = async (req, res) => {


    if (req.session.loggedin) {
        const id_prof = req.cookies.id_prof;
        //console.log(id_prof);

        const result = await connection.query(`SELECT * FROM disciplina where professores_id_prof = ? `, [id_prof])

        const materias = result.map(db => db.nome_disc);

        //console.log(materias);

        res.json(materias);

    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }
}

const get_cursos = async (req, res) => {


    if (req.session.loggedin) {

        const id_prof = req.cookies.id_prof;
        //console.log(id_prof);
        const disciplinaSelecionada = req.query.disciplina; // Obter a disciplina selecionada a partir do parâmetro de consulta

        const result = await connection.query(`
            SELECT disciplina.*, cursos.nome_curso 
            FROM disciplina 
            INNER JOIN cursos ON disciplina.cursos_id_cursos = cursos.id_cursos 
            WHERE disciplina.professores_id_prof = ? AND disciplina.nome_disc = ?
        `, [id_prof, disciplinaSelecionada]);

        const cursos = result.map(db => db.nome_curso);


        res.json(cursos);

    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }
}

const post_marcar = async (req, res) => {

    console.log("post_bloco_ids >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        try {

            const id_prof = req.cookies.id_prof;

            const result = await connection.query(`SELECT * FROM professores where id_prof = ? `, [id_prof]);
            const db_prof = result[0];
            const nome_prof = db_prof.nome_prof;

            const { disciplina, curso, horarioInicial, horarioFinal, bloco_, sala, dia, semana_ } = req.body;

            console.log("disciplina: " + disciplina);
            console.log("curso: " + curso);
            console.log("horarioInicial: " + horarioInicial);
            console.log("horarioFinal: " + horarioFinal);
            console.log("bloco_: " + bloco_);
            console.log("sala: " + sala);
            console.log("dia: " + dia);
            console.log("semana: " + semana_);

            const result2 = await connection.query(`SELECT * FROM salas where bloco_salas = ? AND numero_salas = ? `, [bloco_, sala]);
            const db_sala = result2[0];
            const id_sala = db_sala.id_salas;


            // Primeiro, verifique se já existe um horário nesse dia e horário
            const checkResult = await connection.query(`
                SELECT * FROM horario_salas 
                WHERE salas_id_salas = ? AND data_salas = ? AND ((hora_salas <= ? AND fimh_salas > ?) OR (hora_salas < ? AND fimh_salas >= ?))
            `, [id_sala, dia, horarioInicial, horarioInicial, horarioFinal, horarioFinal]);


            if (checkResult.length > 0) {
                // Se já existe um horário nesse dia e horário, não insira um novo horário
                console.log('Já existe um horário nesse dia e horário');
                return res.status(400).send('Já existe uma reserva nessas horas');
            } else {

                const result3 = await connection.query(`SELECT * FROM cursos where nome_curso = ? `, [curso]);
                const db_curso = result3[0];
                const id_curso = db_curso.id_cursos;

                const result4 = await connection.query(`SELECT * FROM alunos where cursos_id_cursos = ? `, [id_curso]);
                //console.log(result4);
                const db_alunos = result4;
                //console.log(db_alunos);
                const email_alunos = db_alunos.map(db => db.email_aluno);
                //console.log(email_alunos);

                // Se não existe um horário nesse dia e horário, insira um novo horário
                const result = await connection.query(`SELECT * FROM disciplina where nome_disc = ? AND cursos_id_cursos = ? `, [disciplina, id_curso]);
                const db_disc = result[0];
                const id_disc = db_disc.id_disc;

                const result2 = await connection.query(`SELECT * FROM salas where bloco_salas = ? AND numero_salas = ? `, [bloco_, sala]);
                const db_sala = result2[0];
                const id_sala = db_sala.id_salas;

                // Itera sobre os endereços de e-mail
                email_alunos.forEach(email_aluno => {
                    // Define as opções do e-mail
                    const mailOptions = {
                        from: process.env.EMAIL_TO,
                        to: email_aluno,
                        subject: 'Mudança de sala',
                        text: 'A aula de ' + disciplina + ", vai ser na sala " + sala + " do " + bloco_ + " no dia " + dia + " das " + horarioInicial + " às " + horarioFinal + " horas." + "\n" + "Cumprimentos, " + "\n" + nome_prof
                    }

                    // Tenta enviar o e-mail
                    email.sendMail(mailOptions, function (error) {
                        if (error) {
                            // Se houver um erro, loga o erro
                            console.log('Erro ao enviar o e-mail: ', error);
                        } else {
                            // Se o e-mail for enviado com sucesso, loga uma mensagem de sucesso
                            console.log('Email enviado com sucesso para: ' + email_aluno);
                        }
                    });
                });

                const query = 'INSERT INTO horario_salas (disciplina_id_disc, salas_id_salas, data_salas, dia_semana, hora_salas, fimh_salas) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(query, [id_disc, id_sala, dia, semana_, horarioInicial, horarioFinal], function (error, results, fields) {
                    if (error) {
                        console.error('Erro ao inserir: ', error);
                        res.status(500).send('Ocorreu um erro ao inserir o horario.');
                    } else {
                        console.log('Inserido com sucesso');
                        res.status(200).send('Horario inserido com sucesso!');
                    }
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Ocorreu um erro ao buscar o horario.');
        }
    } else {
        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }
}

module.exports = {
    get_blocoA,
    get_blocoB,
    get_blocoC,
    get_blocoD,
    get_blocoE,
    get_blocoF,
    post_bloco_ids,
    get_disciplinas,
    get_cursos,
    post_marcar
}
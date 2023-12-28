// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const string = require("string-sanitizer"); // Módulo para sanitizar strings
const bcrypt = require('../services/bcrypt'); // Módulo para criptografar senhas


//Profile pages
// Método para lidar com a rota GET para /profile
const get_profile = (req, res) => {
    console.log("get_profile >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo profile.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/profile.html'));

    } else {
        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }
}

const get_horarios = async (req, res) => {
    if (!req.session.loggedin) {
        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }
    try {

        if (req.cookies.id) {
            const id_aluno = req.cookies.id;
            const query = `
            SELECT 
                horario.dia_semana, 
                horario.hora_salas, 
                horario.fimh_salas, 
                disciplina.nome_disc AS aula, 
                professores.nome_prof, 
                salas.numero_salas AS nr_sala, 
                salas.bloco_salas 
            FROM horario 
            JOIN disciplina ON horario.disciplina_id_disc = disciplina.id_disc 
            JOIN professores ON disciplina.professores_id_prof = professores.id_prof 
            JOIN salas ON horario.salas_id_salas = salas.id_salas 
            WHERE horario.aluno_id = ?
            `;
            const horarios = await connection.query(query, [id_aluno]);

            // Criar um objeto para armazenar os horários organizados por dia da semana e hora do dia
            const horariosOrganizados = {
                segunda: {},
                terca: {},
                quarta: {},
                quinta: {},
                sexta: {},
                sabado: {}
            };

            for (let db_horario of horarios) {
                const dia = db_horario.dia_semana;
                const inicio_hora = db_horario.hora_salas;
                const fim_hora = db_horario.fimh_salas;
                const aula = db_horario.aula;
                const nome_prof = db_horario.nome_prof;
                const nr_sala = db_horario.nr_sala;
                const bloco_sala = db_horario.bloco_salas;

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
                    nr_sala: nr_sala,
                    bloco_sala: bloco_sala,
                    fim_hora: fim_hora
                });
            }

            // Enviar os dados organizados como resposta
            res.json(horariosOrganizados);
        }
        if (req.cookies.id_prof) {

            const id_prof = req.cookies.id_prof;
            
            const query = `
            SELECT 
                horario_prof.dia_semana, 
                horario_prof.hora_salas, 
                horario_prof.fimh_salas, 
                disciplina.nome_disc,
                cursos.nome_curso,
                salas.numero_salas, 
                salas.bloco_salas 
            FROM horario_prof 
            JOIN disciplina ON horario_prof.disciplina_id_disc = disciplina.id_disc
            JOIN cursos ON disciplina.cursos_id_cursos = id_cursos
            JOIN salas ON horario_prof.salas_id_salas = id_salas 
            WHERE horario_prof.Prof_id = ?
            `;
            const horarios = await connection.query(query, [id_prof]);


            // Criar um objeto para armazenar os horários organizados por dia da semana e hora do dia
            const horariosOrganizados = {
                segunda: {},
                terca: {},
                quarta: {},
                quinta: {},
                sexta: {},
                sabado: {}
            };

            for (let db_horario of horarios) {
                const dia = db_horario.dia_semana;
                const inicio_hora = db_horario.hora_salas;
                const fim_hora = db_horario.fimh_salas;
                const aula = db_horario.nome_disc;
                const curso = db_horario.nome_curso;
                const nr_sala = db_horario.numero_salas;
                const bloco_sala = db_horario.bloco_salas;

                //console.log(dia, inicio_hora, fim_hora, aula, curso, nr_sala, bloco_sala);


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
                    fim_hora: fim_hora,
                    curso: curso,
                    nr_sala: nr_sala,
                    bloco_sala: bloco_sala

                });
            }

            //console.log(horariosOrganizados);

            // Enviar os dados organizados como resposta
            res.json(horariosOrganizados);


        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Ocorreu um erro ao buscar o horario.');
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


    if (req.cookies.id) {
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
    if (req.cookies.id_prof) {

        const result = await connection.query('SELECT pass_prof FROM professores WHERE email_prof = ?', [req.session.user]);

        if (result.length > 0) {

            const db = result[0];
            const result_pass = await bcrypt.comparePasswords(pass_antiga, db.pass_prof);

            if (result_pass) {

                if (pass_antiga === pass_nova) {
                    return res.status(404).send('A nova senha não pode ser igual a antiga!');
                }

                if (pass_nova === pass_confirme) {

                    const hash = await bcrypt.hashPassword(pass_nova);
                    const result = await connection.query('UPDATE professores SET pass_prof = ? WHERE email_prof = ?', [hash, req.session.user]);

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
}

module.exports = {
    get_profile,
    get_horarios,
    post_change_password
}

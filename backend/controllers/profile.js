// Importa os módulos locais necessários
const connection = require('../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos


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
        const id_aluno = req.cookies.id;
        const horarios = await connection.query('SELECT * FROM horario WHERE aluno_id = ?', [id_aluno]);

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

            const disciplina = await connection.query('SELECT * FROM disciplina WHERE id_disc = ?', [db_horario.disciplina_id_disc]);
            const db_disciplina = disciplina[0];
            const aula = db_disciplina.nome_disc;

            const professore = await connection.query('SELECT * FROM professores WHERE id_prof = ?', [db_disciplina.professores_id_prof]);
            const db_professore = professore[0];
            const nome_prof = db_professore.nome_prof;

            const sala = await connection.query('SELECT * FROM salas WHERE id_salas = ?', [db_horario.salas_id_salas]);
            const db_sala = sala[0];
            const nr_sala = db_sala.numero_salas;
            const bloco_sala = db_sala.bloco_salas;

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


    } catch (err) {
        console.error(err);
        res.status(500).send('Ocorreu um erro ao buscar o horario.');
    }
}

module.exports = {
    get_profile,
    get_horarios
}

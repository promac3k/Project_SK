const connection = require('../../services/db'); // Módulo para conexão com o banco de dados
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos


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
        
        const result = await connection.query(`SELECT * FROM disciplina`);

        const materias = result.map(db => db.nome_disc);

        //console.log(materias);

        res.json(materias);

    } else {

        res.sendFile(path.join(__dirname, '..', '..', 'www/pages/login.html'));
    }
}

const get_cursos = async (req, res) => {


    if (req.session.loggedin) {

        const result = await connection.query(`SELECT * FROM cursos`);

        const cursos = result.map(db => db.nome_curso);

        //console.log(cursos);

        res.json(cursos);

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
    get_cursos
}
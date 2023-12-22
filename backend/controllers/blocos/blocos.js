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

        res.sendFile(path.join(__dirname,'..', '..', 'www/pages/login.html'));
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

module.exports = {
    get_blocoA,
    get_blocoB,
    get_blocoC,
    get_blocoD,
    get_blocoE,
    get_blocoF
}
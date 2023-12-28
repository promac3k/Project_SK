// Importa os módulos locais necessários
const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos


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
    res.clearCookie('id');
    res.clearCookie('id_prof');
    res.clearCookie('connect.sid');
    res.redirect('/');
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

const get_simulacao = (req, res) => {
    console.log("get_simulacao >>>>> " + req.session.loggedin);

    if (req.session.loggedin) {
        // Envia o arquivo eventos.html como resposta
        res.sendFile(path.join(__dirname, '..', 'www/pages/simulacao.html'))
    } else {

        res.sendFile(path.join(__dirname, '..', 'www/pages/login.html'));
    }


}
// Exporta todos os métodos como um objeto para serem usados em outros arquivos
module.exports = {
    get_index,
    get_logout,
    get_eventos,
    get_simulacao
}
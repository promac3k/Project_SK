// Importa o objeto Router do módulo Express
const { Router } = require('express');

// Importa o módulo local Controllers
const index = require('../controllers/index');
const login = require('../controllers/login');
const contact = require('../controllers/contact');
const profile = require('../controllers/profile');
const blocos = require('../controllers/blocos/blocos');

// Inicializa um novo router
const router = Router();

// Define as rotas para o router
router.get('/', index.get_index); // Rota para a página inicial

router.get('/logout', index.get_logout); // Rota para o logout (GET)

router.get('/login', login.get_login); // Rota para a página de login (GET)

router.post('/login', login.post_login); // Rota para a página de login (POST)

router.post('/change-password', profile.post_change_password); // Rota para a página de mudança de senha (POST)

router.get('/contact', contact.get_contacts); // Rota para a página de contatos (GET)

router.post('/contact', contact.post_contact); // Rota para a página de contatos (POST)

router.get('/eventos', index.get_eventos); // Rota para a página de eventos

router.get('/perfil', profile.get_profile); // Rota para a página de perfil

router.get('/perfil/horarios', profile.get_horarios); // Rota para a página sobre

router.get('/blocos/blocoA', blocos.get_blocoA); // Rota para a página do bloco A

router.get('/blocos/blocoB', blocos.get_blocoB); // Rota para a página do bloco B

router.get('/blocos/blocoC', blocos.get_blocoC); // Rota para a página do bloco C

router.get('/blocos/blocoD', blocos.get_blocoD); // Rota para a página do bloco D

router.get('/blocos/blocoE', blocos.get_blocoE); // Rota para a página do bloco E

router.get('/blocos/blocoF', blocos.get_blocoF); // Rota para a página do bloco F

router.get('/simulacao', index.get_simulacao); // Rota para simulação


// Exporta o router para que ele possa ser importado e usado em outros arquivos
module.exports = router;
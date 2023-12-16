// Importa o objeto Router do módulo Express
const { Router } = require('express');

// Importa o módulo local myController
const myController = require('../controllers/myController');

// Inicializa um novo router
const router = Router();

// Define as rotas para o router
// Cada rota é associada a um método do objeto myController
router.get('/', myController.get_index); // Rota para a página inicial

router.get('/logout', myController.get_logout); // Rota para o logout (GET)

router.get('/login', myController.get_login); // Rota para a página de login (GET)

router.post('/login', myController.post_login); // Rota para a página de login (POST)

router.post('/change-password', myController.post_change_password); // Rota para a página de mudança de senha (POST)

router.get('/contact', myController.get_contacts); // Rota para a página de contatos (GET)

router.post('/contact', myController.post_contact); // Rota para a página de contatos (POST)

router.get('/eventos', myController.get_eventos); // Rota para a página de eventos

router.get('/perfil', myController.get_profile); // Rota para a página de perfil

router.get('/perfil/horarios', myController.get_horarios); // Rota para a página sobre

router.get('/blocos/blocoA', myController.get_blocoA); // Rota para a página do bloco A

router.get('/blocos/blocoB', myController.get_blocoB); // Rota para a página do bloco B

router.get('/blocos/blocoC', myController.get_blocoC); // Rota para a página do bloco C

router.get('/blocos/blocoD', myController.get_blocoD); // Rota para a página do bloco D

router.get('/blocos/blocoE', myController.get_blocoE); // Rota para a página do bloco E

router.get('/blocos/blocoF', myController.get_blocoF); // Rota para a página do bloco F

// Exporta o router para que ele possa ser importado e usado em outros arquivos
module.exports = router;
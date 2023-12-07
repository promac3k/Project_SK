// Modulo Express 
const { Router } = require('express');

// Modulos locais necessarios
const myController = require('../controllers/myController');

// Inicializar Routas
const router = Router();

// as rotas e os metodos de cada uma vem do ficheiro myController.js
router.get('/', myController.get_index); // 

router.get('/login', myController.get_login);

router.post('/login', myController.post_login);

router.get('/contact', myController.get_contacts);

router.post('/contact', myController.post_contact);

router.get('/eventos', myController.get_eventos);

router.get('/perfil', myController.get_profile);

router.get('/blocos/blocoA', myController.get_blocoA);

router.get('/blocos/blocoB', myController.get_blocoB);

router.get('/blocos/blocoC', myController.get_blocoC);

router.get('/blocos/blocoD', myController.get_blocoD);

router.get('/blocos/blocoE', myController.get_blocoE);

router.get('/blocos/blocoF', myController.get_blocoF);



module.exports = router;
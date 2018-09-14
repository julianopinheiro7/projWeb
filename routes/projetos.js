const express = require('express');
const router = express.Router();

const projetoController = require('../controllers/projetoController');

router.get('/', projetoController.list);
router.post('/add', projetoController.save);
router.get('/delete/:id', projetoController.delete);

router.get('/update/:id', projetoController.edit);
router.post('/update/:id', projetoController.update);

module.exports = router;
const express = require('express');
const router = express.Router();
const { addFavorito, removeFavorito, getFavoritos } = require('../controllers/favoritoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, addFavorito);
router.delete('/:itemId', authMiddleware, removeFavorito);
router.get('/', authMiddleware, getFavoritos);

module.exports = router;

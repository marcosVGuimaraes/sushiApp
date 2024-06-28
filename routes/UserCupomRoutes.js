const express = require('express');
const router = express.Router();
const { getCupomsUser, ofertarCupomAUsuario } = require('../controllers/userCupomController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, ofertarCupomAUsuario);
router.get('/', authMiddleware, getCupomsUser);

module.exports = router;

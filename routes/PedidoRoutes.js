// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const { criarPedido, obterPedidoPorId, atualizarStatusPedido } = require('../controllers/PedidoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, criarPedido);
router.get('/:id', authMiddleware, obterPedidoPorId);
router.put('/:id/status', authMiddleware, atualizarStatusPedido);

module.exports = router;

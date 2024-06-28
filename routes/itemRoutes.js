// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getAllItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { authMiddleware, adminOrEmployeeMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAllItems);
router.post('/', authMiddleware, adminOrEmployeeMiddleware, createItem);
router.put('/:id', authMiddleware, adminOrEmployeeMiddleware, updateItem);
router.delete('/:id', authMiddleware, adminOrEmployeeMiddleware, deleteItem);

module.exports = router;

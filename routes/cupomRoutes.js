// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCupoms, createCupom, updateCupom, deleteCupom} = require('../controllers/cupomController');
const { authMiddleware, adminOrEmployeeMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAllCupoms);
router.post('/', authMiddleware, adminOrEmployeeMiddleware, createCupom);
router.put('/:id', authMiddleware, adminOrEmployeeMiddleware, updateCupom);
router.delete('/:id', authMiddleware, adminOrEmployeeMiddleware, deleteCupom);

module.exports = router;

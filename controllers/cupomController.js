// controllers/cupomController.js
const Cupom = require('../models/Cupom');
const generateCouponCode = require('../utils/generateCouponCode');
const UserCupom = require('../models/UserCupom');
const User = require('../models/User');

exports.getAllCupoms = async (req, res) => {
    try {
        const cupoms = await Cupom.findAll();
        res.send(cupoms);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.createCupom = async (req, res) => {
    try {
        const { descricao, tipoDesconto, valorDesconto, dtExpiracao } = req.body;

        // Gerar um código de cupom único
        const codigo = await generateCouponCode();

        const novoCupom = await Cupom.create({
            descricao,
            codigo,
            tipoDesconto,
            valorDesconto,
            dtExpiracao,
            ativo: true // Por padrão, o cupom é criado como ativo
        });

        res.status(201).send(novoCupom);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateCupom = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, valorDesconto, tipoDesconto, dtExpiracao } = req.body;
        const cupom = await Cupom.findByPk(id);
        if (!cupom) return res.status(404).send('Cupom not found');

        cupom.code = code;
        cupom.valorDesconto = valorDesconto;
        cupom.tipoDesconto = tipoDesconto;
        cupom.dtExpiracao = dtExpiracao;
        await cupom.save();

        res.send(cupom);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.deleteCupom = async (req, res) => {
    try {
        const { id } = req.params;
        const cupom = await Cupom.findByPk(id);
        if (!cupom) return res.status(404).send('Cupom not found');

        await cupom.destroy();
        res.send({ message: 'Cupom deleted successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
};


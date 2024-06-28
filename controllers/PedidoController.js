const Pedido = require('../models/Pedido');
const PedidoItem = require('../models/ItemPedido');
const Item = require('../models/Item');
const Cupom = require('../models/Cupom');
const Joi = require('joi');

// Definir esquema de validação para os pedidos
const pedidoSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            itemId: Joi.number().integer().positive().required(),
            quantidade: Joi.number().integer().positive().required()
        })
    ).min(1).required(),
    cupomId: Joi.number().integer().positive().optional()
});

exports.criarPedido = async (req, res) => {
    // Validar dados de entrada
    const { error } = pedidoSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const { items, cupomId } = req.body; // items: [{ itemId, quantidade }]
        let consumoTotal = 0;
        let valorDesconto = 0;

        // Calcular o consumo total
        for (const item of items) {
            const menuItem = await Item.findByPk(item.itemId);
            if (!menuItem) {
                return res.status(400).send(`Item com id ${item.itemId} não encontrado`);
            }
            consumoTotal += menuItem.preco * item.quantidade;
        }

        // Aplicar desconto do cupom, se fornecido
        if (cupomId) {
            const cupom = await Cupom.findByPk(cupomId);
            if (cupom) {
                if (cupom.tipoDesconto === 'percentual') {
                    valorDesconto = consumoTotal * (cupom.valorDesconto / 100);
                } else if (cupom.tipoDesconto === 'fixo') {
                    valorDesconto = cupom.valorDesconto;
                }
            }
        }

        const total = consumoTotal - valorDesconto;

        // Criar Pedido
        const pedido = await Pedido.create({ 
            usuarioId: req.user.id, 
            consumoTotal, 
            valorDesconto, 
            total, 
            cupomId 
        });

        // Criar PedidoItems
        for (const item of items) {
            await PedidoItem.create({ pedidoId: pedido.id, itemId: item.itemId, quantidade: item.quantidade });
        }

        res.status(201).send(pedido);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.obterPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id, {
            include: [{
                model: PedidoItem,
                include: [Item]
            }]
        });
        if (!pedido) return res.status(404).send('Pedido não encontrado');
        res.send(pedido);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.atualizarStatusPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return res.status(404).send('Pedido não encontrado');

        pedido.status = status;
        await pedido.save();

        res.send(pedido);
    } catch (err) {
        res.status(400).send(err.message);
    }
};


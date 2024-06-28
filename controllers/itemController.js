// controllers/itemController.js
const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.send(items);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.createItem = async (req, res) => {
    try {
        const { nome, descricao, preco, status } = req.body;
        const item = await Item.create({ nome, descricao, preco, status  });
        res.status(201).send(item);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, status } = req.body;
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).send('Item not found');

        item.name = name;
        item.description = description;
        item.price = price;
        item.status = status;
        await item.save();

        res.send(item);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).send('Item not found');

        await item.destroy();
        res.send({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// models/ItemPedido.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./Item');
const Pedido = require('./Pedido');

class ItemPedido extends Model { }

ItemPedido.init({
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: Item,
            key: 'id'
        },
        pedidoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Pedido,
                key: 'id'
            }
        }
    }
}, { sequelize, modelName: 'itemPedido' });

module.exports = ItemPedido;

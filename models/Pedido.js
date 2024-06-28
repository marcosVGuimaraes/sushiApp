// models/Pedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Cupom = require('./Cupom');
const UserCupom = require('./UserCupom');

const Pedido = sequelize.define('Pedido', {
    consumoTotal: { type: DataTypes.FLOAT, allowNull: false },
    valorDesconto: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.FLOAT, allowNull: false },
    dataCompra: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    status: {
        type: DataTypes.ENUM('criado', 'em preparo', 'entregue', 'finalizado', 'cancelado'),
        defaultValue: 'criado'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    userCupomId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserCupom,
            key: 'id'
        }
    }
});

module.exports = Pedido;

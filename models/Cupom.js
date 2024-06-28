// models/Cupom.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cupom extends Model {}

Cupom.init({
  descricao: DataTypes.STRING,
  codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
  tipoDesconto: DataTypes.ENUM('percentual', 'fixo'),
  valorDesconto: DataTypes.FLOAT,
  dtExpiracao: DataTypes.DATE,
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize, modelName: 'cupom' });

module.exports = Cupom;

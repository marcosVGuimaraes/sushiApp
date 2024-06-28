// models/Item.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Item extends Model {}

Item.init({
  nome: DataTypes.STRING,
  descricao: DataTypes.STRING,
  preco: DataTypes.FLOAT,
  status: DataTypes.ENUM('disponivel', 'temporariamente indisponivel', 'indisponivel')
}, { sequelize, modelName: 'item' });

module.exports = Item;


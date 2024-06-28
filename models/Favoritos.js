// models/Favoritos.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

class Favoritos extends Model {}

Favoritos.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  itemId: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'favoritos' });

module.exports = Favoritos;

// models/UserCupom.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Cupom = require('./Cupom');

class UserCupom extends Model { }

UserCupom.init({
  status: {
    type: DataTypes.ENUM('ativo', 'usado', 'expirado'),
    allowNull: false,
    defaultValue: 'ativo'
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  cupomId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cupom,
      key: 'id'
    },

  }
}, { sequelize, modelName: 'userCupom' });

module.exports = UserCupom;
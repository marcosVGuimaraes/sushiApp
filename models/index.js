const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Item = require('./Item');
const Favoritos = require('./Favoritos');
const ItemPedido = require('./ItemPedido');
const Cupom = require('./Cupom');
const UserCupom = require('./UserCupom');
const Pedido = require('./Pedido');

// Definir associações
User.hasMany(Favoritos, { foreignKey: 'userId' });
Favoritos.belongsTo(User, { foreignKey: 'userId' });

Item.hasMany(Favoritos, { foreignKey: 'itemId' });
Favoritos.belongsTo(Item, { foreignKey: 'itemId' });

User.hasMany(UserCupom, { foreignKey: 'userId' });
UserCupom.belongsTo(User, { foreignKey: 'userId' });

Cupom.hasMany(UserCupom, { foreignKey: 'cupomId' });
UserCupom.belongsTo(Cupom, { foreignKey: 'cupomId' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Item.hasMany(ItemPedido, { foreignKey: 'itemId' });
ItemPedido.belongsTo(Item, { foreignKey: 'itemId' });

Pedido.belongsTo(UserCupom, { foreignKey: 'userCupomId' });
UserCupom.hasOne(Pedido, { foreignKey: 'userCupomId' });

module.exports = {
  sequelize,
  User,  
  Item,
  Favoritos,
  Cupom,
  UserCupom,     
  Pedido,
  ItemPedido
};
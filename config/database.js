const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sushuiApp.db'
});

module.exports = sequelize;

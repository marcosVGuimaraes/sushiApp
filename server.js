const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cupomRoutes = require('./routes/cupomRoutes');
const pedidoRoutes = require('./routes/PedidoRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const userCupomRoutes = require('./routes/UserCupomRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cupons', cupomRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/userCupomRoutes', userCupomRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.log('Error syncing database:', err);
});
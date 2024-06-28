// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    try {
        const { nome, email, senha, telefone } = req.body;
        const user = await User.create({ nome, email, senha, telefone });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const { nome, email, senha, telefone } = req.body;
        const perfil = "admin";
        const user = await User.create({ nome, email, senha, telefone, perfil });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).send('Invalid Email or Password');

        const validPassword = await bcrypt.compare(senha, user.senha);
        if (!validPassword) return res.status(400).send('Invalid Email or Password');

        const token = generateToken(user.id, user.perfil);
        res.send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

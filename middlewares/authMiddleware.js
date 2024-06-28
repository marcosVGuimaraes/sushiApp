const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

const adminOrEmployeeMiddleware = (req, res, next) => {
    const { role } = req.user;
    console.log(role);
    if (role === 'admin' || role === 'funcionario') {
        next();
    } else {
        res.status(403).send('Acesso negado!');
    }
};

module.exports = { authMiddleware, adminOrEmployeeMiddleware };

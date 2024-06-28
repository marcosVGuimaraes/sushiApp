// utils/generateCouponCode.js
const crypto = require('crypto');
const Cupom = require('../models/Cupom');

const generateCouponCode = async () => {
    let isUnique = false;
    let code = '';

    while (!isUnique) {
        // Gerar código alfanumérico de 8 dígitos
        code = crypto.randomBytes(4).toString('hex');

        // Verificar se o código é único entre os cupons ativos
        const existingCoupon = await Cupom.findOne({ where: { codigo: code, ativo: true } });

        if (!existingCoupon) {
            isUnique = true;
        }
    }

    return code;
};

module.exports = generateCouponCode;

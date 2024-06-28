const { UserCupom, Cupom } = require('../models');

// Função para salvar um novo userCoupon
exports.getCupomsUser = async (req, res) => {
    const userId = req.user.id; // Pegando o ID do usuário logado através do token JWT
  
    try {
      // Busca todos os userCoupons associados ao usuário
      const userCoupons = await UserCupom.findAll({
        where: {
          userId
        },
        include: {
          model: Cupom,
          attributes: ['id', 'codigo', 'descricao', 'tipoDesconto', 'valorDesconto', 'dtExpiracao']
        }
      }); 
  
      res.status(200).json(userCoupons);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }
  
  exports.ofertarCupomAUsuario = async (req, res) => {
      try {
          const { userId, cupomId } = req.body;
          await UserCupom.create({ userId, cupomId });
          res.status(200).json({msg: 'Cupom associado ao usuário com sucesso'});
          console.log('Cupom associado ao usuário com sucesso');
      } catch (err) {
        res.status(400).send(err.message);
          console.error('Erro ao associar cupom ao usuário: ', err);
      }
  };

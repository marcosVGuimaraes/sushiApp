const { Favoritos, Item } = require('../models');

exports.addFavorito = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    const favorito = await Favoritos.create({ userId, itemId });
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item aos favoritos' });
  }
};

exports.removeFavorito = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    await Favoritos.destroy({ where: { userId, itemId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover item dos favoritos' });
  }
};

exports.getFavoritos = async (req, res) => {
  try {
    const userId = req.user.id;
    const favoritos = await Favoritos.findAll({
      where: { userId },
      include: {
        model: Item,
        attributes: ['id', 'nome', 'descricao', 'preco', 'status']
      }
    });
    res.status(200).json(favoritos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};



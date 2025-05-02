const basketService = require("./basket.service");

exports.addToBasket = async (req, res) => {
  try {
    const basket = await basketService.addToBasket(req.body.userId, req.body.item);
    res.status(200).json(basket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBasket = async (req, res) => {
  try {
    const basket = await basketService.getBasketByUser(req.params.userId);
    res.status(200).json(basket || {});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const basket = await basketService.removeItem(userId, itemId, size);
    res.status(200).json(basket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const basket = await basketService.updateItem(userId, itemId, size, quantity);
    res.status(200).json(basket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.clearBasket = async (req, res) => {
  try {
    const basket = await basketService.clearBasket(req.params.userId);
    res.status(200).json(basket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

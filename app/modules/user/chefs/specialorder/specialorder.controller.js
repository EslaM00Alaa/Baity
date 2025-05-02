const service = require("./specialorder.service");

exports.addOrder = async (req, res) => {
  try {
    const order = await service.addOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrdersNotDone = async (req, res) => {
  try {
    const orders = await service.getUserOrdersNotDone(req.params.userId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getChefOrdersNotDone = async (req, res) => {
  try {
    const orders = await service.getChefOrdersNotDone(req.params.chefId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    const order = await service.changeOrderStatus(req.params.id, req.body.status);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addReplayToOrder = async (req, res) => {
  try {
    const order = await service.addReplayToOrder(req.params.id, req.body.replay);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await service.deleteOrder(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

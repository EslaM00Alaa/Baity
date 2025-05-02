const SpecialOrder = require("./specialorder.schema");

exports.addOrder = async (data) => {
  return await SpecialOrder.create(data);
};

exports.getUserOrdersNotDone = async (userId) => {
  return await SpecialOrder.find({ user: userId, status: { $ne: "done" } });
};

exports.getChefOrdersNotDone = async (chefId) => {
  return await SpecialOrder.find({ chef: chefId, status: { $ne: "done" } });
};

exports.changeOrderStatus = async (orderId, status) => {
  return await SpecialOrder.findByIdAndUpdate(orderId, { status }, { new: true });
};

exports.addReplayToOrder = async (orderId, replay) => {
  return await SpecialOrder.findByIdAndUpdate(orderId, { replay }, { new: true });
};

exports.deleteOrder = async (orderId) => {
  return await SpecialOrder.findByIdAndDelete(orderId);
};

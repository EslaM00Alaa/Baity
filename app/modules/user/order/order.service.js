const Order = require("./order.service");

exports.createOrder = async (data) => {
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = new Order({ ...data, total });
  return await order.save();
};

exports.getAllOrders = async () => {
  return await Order.find().populate("user items.itemId");
};

exports.getOrderById = async (id) => {
  return await Order.findById(id).populate("user items.itemId");
};

exports.getUserOrdersNotDone = async (userId) => {
  return await Order.find({
    user: userId,
    status: { $ne: "done" },
  }).populate("items.itemId");
};

exports.updateOrderStatus = async (orderId, newStatus) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: newStatus },
    { new: true }
  );
};

exports.deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

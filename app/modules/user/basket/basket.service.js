const Basket = require("./basket.schema");

// Helper: Recalculate total
const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

exports.addToBasket = async (userId, item) => {
  let basket = await Basket.findOne({ user: userId });

  if (!basket) {
    basket = new Basket({ user: userId, items: [item] });
  } else {
    const existingItem = basket.items.find(
      (i) => i.itemId.toString() === item.itemId && i.size === item.size
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      basket.items.push(item);
    }
  }

  basket.total = calculateTotal(basket.items);
  return await basket.save();
};

exports.getBasketByUser = async (userId) => {
  return await Basket.findOne({ user: userId }).populate("items.itemId");
};

exports.removeItem = async (userId, itemId, size) => {
  const basket = await Basket.findOne({ user: userId });
  if (!basket) throw new Error("Basket not found");

  basket.items = basket.items.filter(
    (i) => !(i.itemId.toString() === itemId && i.size === size)
  );

  basket.total = calculateTotal(basket.items);
  return await basket.save();
};

exports.updateItem = async (userId, itemId, size, quantity) => {
  const basket = await Basket.findOne({ user: userId });
  if (!basket) throw new Error("Basket not found");

  const item = basket.items.find(
    (i) => i.itemId.toString() === itemId && i.size === size
  );
  if (!item) throw new Error("Item not found");

  item.quantity = quantity;
  basket.total = calculateTotal(basket.items);
  return await basket.save();
};

exports.clearBasket = async (userId) => {
  const basket = await Basket.findOne({ user: userId });
  if (!basket) throw new Error("Basket not found");

  basket.items = [];
  basket.total = 0;
  return await basket.save();
};

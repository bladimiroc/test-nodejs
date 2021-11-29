const db = require("../config/db");
const Inventory = db.inventory;

const increaseInventory = async (data) => {
  const inventoryProduct = await Inventory.findOne({
    where: {
      productId: data.productId,
    },
  });
  if (inventoryProduct === null || inventoryProduct === undefined) {
    data.stock = data.quantity;
    await Inventory.create(data);
  } else {
    inventoryProduct.stock += data.quantity;
    await inventoryProduct.save();
  }
};

const decreaseInventory = async (data) => {
  const inventoryProduct = await Inventory.findOne({
    where: {
      productId: data.productId,
    },
  });

  if (inventoryProduct !== undefined) {
    inventoryProduct.stock -= data.quantity;
    await inventoryProduct.save();
  }
};

const verifyQuantityAvailable = async (productId, quantity) => {
  const inventoryProduct = await Inventory.findOne({
    where: {
      id: productId,
    },
  });
  let answer = {};

  if (inventoryProduct === null || inventoryProduct === undefined) {
    answer.available = false;
  } else {
    answer.available = inventoryProduct.stock >= quantity ? true : false;
  }
  return answer;
};

module.exports = {
  increaseInventory,
  decreaseInventory,
  verifyQuantityAvailable,
};

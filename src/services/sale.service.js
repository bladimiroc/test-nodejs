const db = require("../config/db");
const Sale = db.sale;
const inventoryService = require("./inventory.service");
const buyService = require("./buy.service");

const getAll = async () => {
  return Sale.findAll();
};

const add = async (data) => {
  const answer = {};
  try {
    const validation = await buyService.validationSale(data);
    if (!validation.available) {
      answer.message = validation.message;
      answer.registered = false;
      return answer;
    }

    await Sale.create(data);

    await inventoryService.decreaseInventory(data);

    await buyService.registerQuantitySold(data);

    answer.message = "Sale was added successfully";
    answer.registered = true;
  } catch (err) { 
    throw new Error(err);
  }

  return answer;
};

module.exports = {
  add,
  getAll,
};

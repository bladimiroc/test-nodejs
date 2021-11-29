const { Op } = require("sequelize");
const db = require("../config/db");
const Buy = db.buy;
const productService = require("./product.service");
const inventoryService = require("./inventory.service");

const LIMIT_BY_MONTH = 30;

const addBuy = async (data) => {
  const answer = {};

  try {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const quantityBoughtMonth = await Buy.sum("quantity", {
      where: {
        productId: data.productId,
        date_buy: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    if ((quantityBoughtMonth + data.quantity) <= LIMIT_BY_MONTH) {
      const product = await productService.getById(data.productId);
      if (product === null || product === undefined) {
        await productService.add({
          id: data.productId,
          name: data.product_name,
        });
      }
      data.quantity_available = data.quantity;
      await Buy.create(data);

      await inventoryService.increaseInventory(data);

      answer.message = "Buy was added successfully";
      answer.registered = true;
    } else {
      answer.message = `Limit to buy per month is ${LIMIT_BY_MONTH} and will be exceeded`;
      answer.registered = false;
    }
  } catch (err) {
    throw new Error(err);
  }

  return answer;
};

const getAll = async () => {
  return Buy.findAll();
};

const registerQuantitySold = async (data) => {
  const products = await Buy.findAll({
    where: {
      productId: data.productId,
      quantity_available: {
        [Op.gt]: 0
      }
    },
    order: [
      ['date_buy', 'DESC'],
      ['id', 'ASC']
    ]
  });

  let quantity = data.quantity;
  let index = 0;
  while (quantity > 0) {
    let product = products[index];
    if (product.quantity_available >= quantity) {
      product.quantity_available -= quantity;
      quantity = 0;
    } else {
      quantity -= product.quantity_available;
      product.quantity_available = 0;
    }
    index++;
    await product.save();
  }
};

const validationSale = async (data) => {
  const products = await Buy.findAll({
    where: {
      productId: data.productId,
      quantity_available: {
        [Op.gt]: 0
      }
    },
    order: [
      ['date_buy', 'DESC'],
      ['id', 'ASC']
    ],
    raw: true
  });

  let answer = {};
  if (products.length === 0) {
    answer.message = "No stock available";
    answer.available = false;
    return answer;
  } else {
    const sum = products.map(item => item.quantity_available).reduce((prev, next) => prev + next);
    if (sum < data.quantity) {
      answer.message = "The available stock is less";
      answer.available = false;
      return answer;
    }
  }

  const datesale = new Date(data.date_sale)
  const datebuy = new Date(products[0].date_buy)
  if (datebuy <= datesale) {
    answer.message = '';
    answer.available = true;
  } else {
    answer.message = "No stock available for date";
    answer.available = false;
  }
  return answer;
};

module.exports = {
  addBuy,
  getAll,
  registerQuantitySold,
  validationSale,
};

const db = require("../config/db");
const Product = db.product;

const getAll = async () => {
  return Product.findAll();
};

const add = async (data) => {
  await Product.create(data);
  return data;
};

const getById = async (productId) => {
  return Product.findOne({
    where: {
      id: productId,
    },
  });
};

module.exports = {
  getAll,
  add,
  getById,
};

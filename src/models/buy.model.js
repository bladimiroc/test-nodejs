// const config = require('../config/config');
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataType) => {
  const Buy = sequelize.define("buy", {
    date_buy: {
      type: DataType.DATE,
      default: new Date(),
    },
    quantity: {
      type: DataType.INTEGER,
    },
    product_name: {
      type: DataType.STRING,
      default: "",
    },
    quantity_available: {
      type: DataType.INTEGER,
    },
  });
  return Buy;
};

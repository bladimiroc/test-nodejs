const config = require("../config/config");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataType) => {
  const Sale = sequelize.define("sale", {
    date_sale: {
      type: DataType.DATE,
    },
    quantity: {
      type: DataType.INTEGER,
    },
    product_name: {
      type: DataType.STRING,
      default: "",
    },
  });
  return Sale;
};

const config = require("../config/config");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataType) => {
  const Product = sequelize.define("product", {
    name: {
      type: DataType.STRING,
      default: "",
    },
  });
  return Product;
};

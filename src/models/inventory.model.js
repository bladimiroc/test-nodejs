// const config = require('../config/config');
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataType) => {
  const Inventory = sequelize.define("inventory", {
    stock: {
      type: DataType.INTEGER,
      default: 0,
    },
    last_update: {
      type: DataType.DATE,
      default: new Date(),
    },
  });
  return Inventory;
};

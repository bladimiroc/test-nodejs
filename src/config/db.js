const config = require("./config");
const Sequilize = require("sequelize");

const sequelize = new Sequilize(
  config.POSTGRESQL_DB, config.POSTGRESQL_USER, config.POSTGRESQL_PASSWORD, {

    host: config.POSTGRESQL_HOST,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

  });

const db = {};
db.Sequilize = Sequilize;
db.sequelize = sequelize;

db.product = require("../models/product.model")(sequelize, Sequilize);
db.buy = require("../models/buy.model")(sequelize, Sequilize);
db.sale = require("../models/sale.model")(sequelize, Sequilize);
db.inventory = require("../models/inventory.model")(sequelize, Sequilize);

db.product.hasMany(db.buy, { foriegnKey: "product_id" });
db.product.hasMany(db.sale, { foriegnKey: "product_id" });
db.product.hasMany(db.inventory, { foriegnKey: "product_id" });

module.exports = db;

var express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/config/db');
db.sequelize.sync();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (res, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Max-Age", "86400");
  next();
});

const productRouter = require('./src/routes/product.route');
const buyRouter = require('./src/routes/buy.route');
const saleRouter = require('./src/routes/sale.route');

app.use('/product', productRouter);
app.use('/buy', buyRouter);
app.use('/sale', saleRouter);

app.listen(3003, () => {
  console.log("Server is listening on port 3003");
});

module.exports = app;

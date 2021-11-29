const express = require("express");
const router = express.Router();
const productService = require("../services/product.service");

router.get("/get-all", async (req, res) => {
  try {
    const data = await productService.getAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

router.post("/save", async (req, res) => {
  try {
    await productService.add(req.body);
    return res.status(200).send({ message: "Product was added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

module.exports = router;

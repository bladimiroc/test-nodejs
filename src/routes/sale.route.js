const express = require("express");
const router = express.Router();
const saleService = require("../services/sale.service");

router.get("/get-all", async (req, res) => {
  try {
    const data = await saleService.getAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

router.post("/register", async (req, res) => {
  try {
    const answer = await saleService.add(req.body);
    return res.status(200).send(answer);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

module.exports = router;

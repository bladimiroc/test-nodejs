const express = require("express");
const router = express.Router();
const buyService = require("../services/buy.service");

router.post("/register", async (req, res) => {
  try {
    const data = await buyService.addBuy(req.body);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const data = await buyService.getAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

module.exports = router;

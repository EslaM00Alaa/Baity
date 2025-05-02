const express = require("express");
const router = express.Router();
const controller = require("./basket.controller");

router.post("/add", controller.addToBasket);
router.get("/:userId", controller.getBasket);
router.put("/remove", controller.removeItem);
router.put("/update", controller.updateItem);
router.delete("/clear/:userId", controller.clearBasket);

module.exports = router;

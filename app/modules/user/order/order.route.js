const express = require("express");
const router = express.Router();
const controller = require("./order.controller");

router.post("/", controller.addOrder);
router.get("/", controller.getAllOrders);
router.get("/user/:userId", controller.getUserOrdersNotDone);
router.get("/:id", controller.getOrderById);
router.patch("/status/:id", controller.changeStatus);
router.delete("/:id", controller.deleteOrder);

module.exports = router;

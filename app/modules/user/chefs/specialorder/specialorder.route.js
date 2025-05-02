const express = require("express");
const router = express.Router();
const controller = require("./specialorder.controller");

router.post("/add", controller.addOrder);
router.get("/user/:userId/not-done", controller.getUserOrdersNotDone);
router.get("/chef/:chefId/not-done", controller.getChefOrdersNotDone);
router.put("/status/:id", controller.changeOrderStatus);
router.put("/replay/:id", controller.addReplayToOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;

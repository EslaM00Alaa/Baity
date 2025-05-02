const express = require("express");
const router = express.Router();
const controller = require("./meal.route");

router.post("/add", controller.addMeal);
router.get("/chef/:chefId", controller.getMealsByChefId);
router.delete("/:id", controller.deleteMeal);
router.put("/:id", controller.updateMeal);

module.exports = router;

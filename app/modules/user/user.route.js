const express = require("express");
const router = express.Router();
const authController = require("./user.controller");

const { uploadFile } = require("../../shared/middleware/uploads");
const checkRole = require("../../shared/middleware/checkRole");



router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);
router.post("/check-code", authController.checkCode);
router.post("/change-password", authController.changePassword);


router.post("/add",checkRole(["admin"]),uploadFile("chefs").single("image"), authController.addChef);

// Make chef premium
router.patch("/make-premium/:chefId",checkRole(["admin"]), authController.makeChefPremium);

// Delete chef
router.delete("/delete/:chefId",checkRole(["admin"]), authController.deleteChef);



router.patch("/update",checkRole(["chef"]),uploadFile("chefs").single("image"), authController.updateChef);

// Get all chefs
router.get("/all",checkRole(["admin"]), authController.getAllChefs);



router.get("/city/:city",checkRole(["admin","user","chef"]), authController.getChefsByCity);

// Get premium chefs
router.get("/premium",checkRole(["admin","user","chef"]), authController.getPremiumChefs);
















module.exports = router;

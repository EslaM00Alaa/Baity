const express = require("express");
const router = express.Router();
const feedbackController = require("./feedback.controller");

// POST: Add feedback
router.post("/", feedbackController.addFeedback);

// GET: Get all feedbacks for a chef
router.get("/:chefId", feedbackController.getFeedbacksForChef);

// DELETE: Delete a feedback by chef and feedback ID
router.delete("/:chefId/:feedbackId", feedbackController.deleteFeedback);

// GET: Get average rate for a chef
router.get("/avg/:chefId", feedbackController.getAverageRate);

module.exports = router;

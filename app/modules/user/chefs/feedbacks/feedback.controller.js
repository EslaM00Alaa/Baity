const feedbackService = require("./feedback.service");

// Add feedback
const addFeedback = async (req, res) => {
  try {
    const { comment, rate, userId, chefId } = req.body;
    const feedback = await feedbackService.addFeedback({ comment, rate, userId, chefId });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all feedbacks for a chef
const getFeedbacksForChef = async (req, res) => {
  try {
    const { chefId } = req.params;
    const feedbacks = await feedbackService.getAllFeedbacksForChef(chefId);
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const { chefId, feedbackId } = req.params;
    const deleted = await feedbackService.deleteFeedback(chefId, feedbackId);
    res.status(200).json({ message: "Feedback deleted", deleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get average rating for a chef
const getAverageRate = async (req, res) => {
  try {
    const { chefId } = req.params;
    const avg = await feedbackService.getAverageRateForChef(chefId);
    res.status(200).json({ avgRate: avg });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addFeedback,
  getFeedbacksForChef,
  deleteFeedback,
  getAverageRate,
};

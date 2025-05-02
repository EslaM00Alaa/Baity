const Feedback = require("./feedbacks.scema");
const User = require("../../user.service");
const mongoose = require("mongoose");

// 1. Add feedback
const addFeedback = async ({ comment, rate, userId, chefId }) => {
  // Optional: Check if user and chef exist
  const userExists = await User.findById(userId);
  const chefExists = await User.findById(chefId);

  if (!userExists || !chefExists || chefExists.role !== "chef") {
    throw new Error("Invalid user or chef");
  }

  const feedback = new Feedback({
    comment,
    rate,
    user: userId,
    chef: chefId,
  });

  return await feedback.save();
};

// 2. Get all feedbacks for a chef
const getAllFeedbacksForChef = async (chefId) => {
  return await Feedback.find({ chef: chefId }).populate("user", "name");
};

// 3. Delete feedback by chefId and feedbackId
const deleteFeedback = async (chefId, feedbackId) => {
  const feedback = await Feedback.findOneAndDelete({
    _id: feedbackId,
    chef: chefId,
  });

  if (!feedback) {
    throw new Error("Feedback not found or unauthorized");
  }

  return feedback;
};

// 4. Get average rate for a chef
const getAverageRateForChef = async (chefId) => {
  const result = await Feedback.aggregate([
    { $match: { chef: new mongoose.Types.ObjectId(chefId) } },
    {
      $group: {
        _id: "$chef",
        avgRate: { $avg: "$rate" },
      },
    },
  ]);

  return result[0]?.avgRate || 0;
};

module.exports = {
  addFeedback,
  getAllFeedbacksForChef,
  deleteFeedback,
  getAverageRateForChef,
};

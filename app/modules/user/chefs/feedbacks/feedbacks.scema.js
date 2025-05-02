const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
    rate: {
      type: Number,
      required: [true, "Rate is required"],
      min: 2,
      max: 10,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;

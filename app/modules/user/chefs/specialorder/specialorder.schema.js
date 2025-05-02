const mongoose = require("mongoose");

const specialOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    orderMessage: {
      type: String,
      required: [true, "Order message is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["under_review", "preparing", "delivery", "done"],
      default: "under_review",
    },
    replay: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const SpecialOrder = mongoose.model("SpecialOrder", specialOrderSchema);

module.exports = SpecialOrder;

const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    cover: {
      type: String,
      required: [true, "Cover image is required"],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, "Images are required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    components: {
      type: [String],
      required: [true, "Components are required"],
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prices: [
      {
        size: {
          type: String,
          required: [true, "Size is required"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;

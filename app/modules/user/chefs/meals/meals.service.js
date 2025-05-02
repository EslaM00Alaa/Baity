const Meal = require("./meals.schema");

exports.addMeal = async (data) => {
  return await Meal.create(data);
};

exports.getMealsByChefId = async (chefId) => {
  return await Meal.find({ chef: chefId });
};

exports.deleteMeal = async (mealId) => {
  return await Meal.findByIdAndDelete(mealId);
};

exports.updateMeal = async (mealId, updateData) => {
  return await Meal.findByIdAndUpdate(mealId, updateData, { new: true });
};

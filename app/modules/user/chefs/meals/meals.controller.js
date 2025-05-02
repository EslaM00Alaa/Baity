const service = require("./meals.service");

exports.addMeal = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Cover and images are required" });
    }
    
    // Set the first file as the cover
    req.body.cover = `/uploads/chefs/${req.files[0].filename}`;
    
    // Store all images except the cover
    req.body.images = req.files.slice(1).map(file => `/uploads/chefs/${file.filename}`);
    
    const meal = await service.addMeal(req.body);
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMealsByChefId = async (req, res) => {
  try {
    const meals = await service.getMealsByChefId(req.params.chefId);
    res.status(200).json(meals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    await service.deleteMeal(req.params.id);
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Cover and images are required" });
    }
    
    // Set the first file as the cover
    req.body.cover = `/uploads/chefs/${req.files[0].filename}`;
    
    // Store all images except the cover
    req.body.images = req.files.slice(1).map(file => `/uploads/chefs/${file.filename}`);
    
    const updatedMeal = await service.updateMeal(req.params.id, req.body);
    res.status(200).json(updatedMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

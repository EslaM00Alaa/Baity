const authService = require("./user.service");


const signUp = async (req, res) => {
  try {
    const result = await authService.signUp(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const {email,password} = req.body;
    const result = await authService.login(email,password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkCode = async (req, res) => {
  try {
    const result = await authService.checkCode(req.body.email, req.body.code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await authService.changePassword(req.body.email, req.body.newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const addChef = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cover is required" });
    }

    req.body.cover = `/uploads/chefs/${req.file.filename}`;

    const chef = await chefService.addChef(req.body);
    res.status(201).json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Make chef premium
const makeChefPremium = async (req, res) => {
  try {
    const updatedChef = await chefService.makeChefPremium(req.params.chefId);
    if (!updatedChef) return res.status(404).json({ message: "Chef not found" });
    res.json(updatedChef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Update chef info
const updateChef = async (req, res) => {
  try {
    if (req.file) {
      req.body.cover = `/uploads/chefs/${req.file.filename}`;
    }
    const updatedChef = await chefService.updateChef(req.params.chefId, req.body);
    if (!updatedChef) return res.status(404).json({ message: "Chef not found" });
    res.json(updatedChef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. Delete chef
const deleteChef = async (req, res) => {
  try {
    const deletedChef = await chefService.deleteChef(req.params.chefId);
    if (!deletedChef) return res.status(404).json({ message: "Chef not found" });
    res.json({ message: "Chef deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. Get all chefs
const getAllChefs = async (req, res) => {
  try {
    const chefs = await chefService.getAllChefs();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Get chefs by city
const getChefsByCity = async (req, res) => {
  try {
    const chefs = await chefService.getChefsByCity(req.params.city);
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Get premium chefs
const getPremiumChefs = async (req, res) => {
  try {
    const chefs = await chefService.getPremiumChefs();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};












module.exports = {
  signUp,
  login,
  forgotPassword,
  checkCode,
  changePassword,
  addChef,
  makeChefPremium,
  updateChef,
  deleteChef,
  getAllChefs,
  getChefsByCity,
  getPremiumChefs,
};

const User = require("../../modules/user/user.schema");
const sendMail = require("../../shared/utils/sendEmail");
const { generateToken } = require("../../shared/utils/token");
const bcrypt = require("bcrypt"); // to hash
const crypto = require("crypto"); // to genrate random number   4char to OTP




const signUp = async (userData) => {
  const { name, email,phone, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = new User({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  return { token ,email: newUser.email, name: newUser.name };
};

/**
 * Login user
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return { token, email: user.email, name: user.name};
};

/**
 * Forgot Password - Send verification code
 */
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate a random verification code
  const verificationCode = crypto.randomInt(1000, 9999).toString();

  // Save the code in the user document
  user.verificationCode = verificationCode;
  await user.save();

  // Send email with the code
  await sendMail(user.email, `Your verification code is: ${verificationCode}`);

  return { message: "Verification code sent to email" };
};

/**
 * Check Verification Code
 */
const checkCode = async (email, code) => {
  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  user.isVerified =  user.verificationCode == code;
  await user.save()

  return { message: "Code verified successfully", email: user.email };
};

/**
 * Change Password using verification code
 */
const changePassword = async (email, newPassword) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if(!user.isVerified)
  {
    throw new Error("You Cant Change Password");
  }
  // Hash the new password

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.verificationCode = null; // Clear verification code after successful change
  user.isVerified=false;
  await user.save();

  return { message: "Password updated successfully" };
};






const addChef = async (chefData) => {
  chefData.role = "chef";
  const chef = new User(chefData);
  return await chef.save();
};

// 2. Make chef premium by ID
const makeChefPremium = async (chefId) => {
  return await User.findByIdAndUpdate(
    chefId,
    { isPriem: true },
    { new: true }
  );
};

// 3. Update chef by ID (only allowed fields)
const updateChef = async (chefId, updateData) => {
  const allowedFields = ["name", "cover", "pio", "city"];
  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  return await User.findOneAndUpdate(
    { _id: chefId, role: "chef" },
    filteredData,
    { new: true }
  );
};

// 4. Delete chef by ID
const deleteChef = async (chefId) => {
  return await User.findOneAndDelete({ _id: chefId, role: "chef" });
};

// 5. Get all chefs
const getAllChefs = async () => {
  return await User.find({ role: "chef" });
};

// 6. Get chefs by city
const getChefsByCity = async (city) => {
  return await User.find({ role: "chef", city });
};

// 7. Get premium chefs
const getPremiumChefs = async () => {
  return await User.find({ role: "chef", isPriem: true });
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

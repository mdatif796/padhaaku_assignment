const User = require("../models/user");

// creating user

module.exports.create_user = async (req, res) => {
  const { name, email } = req.body;

  try {
    // if name and email is empty
    if (!name || !email) {
      return res.status(500).json({
        message: "Name and Email are mandotory.",
      });
    }

    // first check if that user exist ?
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        message: "User already exist!",
      });
    }

    await User.create({ name, email });

    return res.status(200).json({
      message: "Successful user sign-up.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

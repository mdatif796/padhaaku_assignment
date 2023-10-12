const Post = require("../models/post");
const User = require("../models/user");

module.exports.create_post = async (req, res) => {
  const { user, content } = req.body;

  if (!user || !content) {
    return res.status(500).json({
      message: "UserId and post content are mandatory",
    });
  }

  try {
    // first find out if the user exist
    let postUser = await User.findById(user);

    if (!postUser) {
      return res.status(500).json({
        message: "User not exist ",
      });
    }

    await Post.create({ user, content });

    return res.status(200).json({
      message: "Successfully created.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

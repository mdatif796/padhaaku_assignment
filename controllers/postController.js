const Post = require("../models/post");
const User = require("../models/user");

module.exports.create_post = async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(500).json({
      message: "UserId and post content are mandatory",
    });
  }

  try {
    // first find out if the user exist
    let postUser = await User.findById(userId);

    if (!postUser) {
      return res.status(500).json({
        message: "User not exist ",
      });
    }

    await Post.create({ user: userId, content: content });

    return res.status(200).json({
      message: "Successfully created.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports.delete_post = async (req, res) => {
  if (req.params.postId.length < 24) {
    return res.status(500).json({
      message: "Enter correct post id",
    });
  }

  try {
    // first find the post by the id
    let post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(500).json({
        message: "Post not found.",
      });
    }

    await Post.findByIdAndDelete(req.params.postId);

    return res.status(200).json({
      message: "Successful post deletion",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports.get_user_posts = async (req, res) => {
  if (req.params.userId.length < 24) {
    return res.status(500).json({
      message: "Enter correct user id",
    });
  }
  try {
    // first find if the user exist or not
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(500).json({
        message: "User not exist",
      });
    }

    let posts = await Post.find({ user: req.params.userId });
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

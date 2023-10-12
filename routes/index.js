const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/signup", userController.create_user);

router.post("/posts", postController.create_post);

router.delete("/deletepost/:postId", postController.delete_post);

module.exports = router;

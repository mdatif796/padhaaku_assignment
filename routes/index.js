const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.create_user);

module.exports = router;

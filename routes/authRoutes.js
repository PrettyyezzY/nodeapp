const express = require("express");
const userController = require('../controllers/userController')
const router = express.Router();

router.get("/login", userController.user_login);

router.get("/callback", userController.user_callback);

router.get("/logout", userController.user_logout);

router.get('/user',userController.user_profile);

module.exports = router;
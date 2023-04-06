const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");
const { checkRefererEmbed } = require("../middlewares");

router.get("/fanpage", mainController.fanpage);
router.get("/login", mainController.loginPage);
router.get("/", mainController.home);


module.exports = router;

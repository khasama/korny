const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");
const { checkRefererEmbed } = require("../middlewares");

router.get("/", mainController.home);


module.exports = router;

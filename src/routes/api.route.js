const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");
const { checkRefererEmbed } = require("../middlewares");

router.get("/images", apiController.getImages);


module.exports = router;

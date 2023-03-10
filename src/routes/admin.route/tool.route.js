const express = require("express");
const router = express.Router();

const { ToolController } = require("../../controllers/admin.controller");

router.get("/fanpage", ToolController.fanpagePage);
router.post("/fanpage", ToolController.getImagesOfFanpage);
// router.post("/logout", AuthController.logout);
// router.post("/refresh-token", AuthController.refreshToken);



module.exports = router;
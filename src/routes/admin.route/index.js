const express = require("express");
const router = express.Router();
const { AdminController, MovieController } = require("../../controllers/admin.controller");
// const MovieRoute = require("./movie.route");
// const ServerRoute = require("./server.route");
const ImageRoute = require("./image.route");
const FanpageRoute = require("./fanpage.route");
const UserRoute = require("./user.route");
const ToolRoute = require("./tool.route");

router.use("/image", ImageRoute);
router.use("/fanpage", FanpageRoute);
router.use("/user", UserRoute);
router.use("/tool", ToolRoute);
router.get("/", AdminController.dashboard);

module.exports = router;

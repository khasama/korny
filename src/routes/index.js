const express = require("express");
const router = express.Router();
const mainRoute = require("./main.route");
const mediaRoute = require("./media.route");
const adminRoute = require("./admin.route");
// const authRoute = require("./auth.route");
const apiRoute = require("./api.route");

// const LogintController = require("../controllers/login.controller");

// const { verifyAdmin } = require("../middlewares");

router.use("/api/v1", apiRoute);
router.use("/media", mediaRoute);
// router.use("/manga", mangaRoute);
// router.get("/login", LogintController.loginPage);
router.use("/admin", adminRoute);
router.use("/", mainRoute);

module.exports = router;

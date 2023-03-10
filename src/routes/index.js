const express = require("express");
const router = express.Router();
// const mangaRoute = require("./manga.route");
const mediaRoute = require("./media.route");
const adminRoute = require("./admin.route");
// const authRoute = require("./auth.route");
// const apiRoute = require("./api.route");

// const LogintController = require("../controllers/login.controller");

// const { verifyAdmin } = require("../middlewares");

// router.use("/api", apiRoute);
router.use("/media", mediaRoute);
// router.use("/manga", mangaRoute);
// router.get("/login", LogintController.loginPage);
// router.use("/auth", authRoute);
router.use("/admin", adminRoute);

module.exports = router;

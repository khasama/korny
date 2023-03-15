const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const { route } = require("./api.route");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/google", passport.authenticate('google', { scope: ['email', 'profile'] }));
// route.get("/fail")
router.get("/google/callback", passport.authenticate('google', {
    successRedirect: '/',
    // failureRedirect: '/auth/fail'
}));


module.exports = router;

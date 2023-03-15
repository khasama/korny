const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../models/image.model");

const MainController = {};

MainController.home = async (req, res, next) => {
    try {
        const images = await ImageModel.find({ deleted: false }).sort({ 'createdAt': 'desc' }).limit(20);
        const user = req.user || req.session.user || req.session.passport.user;
        return res.render("main", { images, domain: global.domain, user });
    } catch (error) {
        // logger.error(error.stack || error);
        return res.status(500);
    }
};

MainController.loginPage = async (req, res, next) => {
    try {

        return res.render("main/login", { domain: global.domain });
    } catch (error) {
        // logger.error(error.stack || error);
        // return res.status(500);
    }
};


module.exports = MainController;
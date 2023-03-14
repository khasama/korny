const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../models/image.model");

const MainController = {};

MainController.home = async (req, res, next) => {
    try {
        const images = await ImageModel.find({ deleted: false }).sort({ 'createdAt': 'desc' }).limit(20);
        return res.render("main", { images });
    } catch (error) {
        // logger.error(error.stack || error);
        return res.status(500);
    }
};


module.exports = MainController;
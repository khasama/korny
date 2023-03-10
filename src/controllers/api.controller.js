const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../models/image.model");

const ApiController = {};

ApiController.getImages = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const images = await ImageModel.find({}).sort({ 'createdAt': 'desc' }).limit(limit).skip((page - 1) * 20);
        return res.status(200).json({ status: "success", data: images });
    } catch (error) {
        // logger.error(error.stack || error);
        return res.status(500);
    }
};


module.exports = ApiController;
const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../models/image.model");

const ApiController = {};

ApiController.getImages = async (req, res, next) => {
    try {
        const { page, limit, fanpage, deleted } = req.query;
        let filter = {};
        if (fanpage) filter = { ...filter, ...{ fanpage } };
        if (deleted == '1') filter = { ...filter, ...{ deleted: true } };
        const images = await ImageModel.find(filter).sort({ 'createdAt': 'desc' }).limit(limit).skip((page - 1) * 20);
        return res.status(200).json({ status: "success", data: images });
    } catch (error) {
        // logger.error(error.stack || error);
        return res.status(500);
    }
};


module.exports = ApiController;
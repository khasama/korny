const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../models/image.model");

const ApiController = {};

ApiController.getImages = async (req, res, next) => {
    try {
        let { page, limit, fanpage, deleted } = req.query;
        let filter = {};
        if (!page || page <= 0) page = 1;
        if (!limit || limit <= 0) limit = 20;
        if (fanpage) filter = { ...filter, ...{ fanpage } };
        if (deleted == '1') {
            filter = { ...filter, ...{ deleted: true } };
        } else {
            filter = { ...filter, ...{ deleted: false } };
        }
        const images = await ImageModel.find(filter).sort({ 'createdAt': 'desc' }).limit(limit).skip((page - 1) * limit);
        return res.status(200).json({ status: "success", data: images });
    } catch (error) {
        // logger.error(error.stack || error);
        return res.status(500);
    }
};


module.exports = ApiController;
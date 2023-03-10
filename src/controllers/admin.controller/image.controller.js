const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../../models/image.model");

const ImageController = {};

ImageController.imagePage = async (req, res, next) => {
    try {
        const images = await ImageModel.find({}).sort({ 'createdAt': 'desc' }).limit(20);
        return res.render("admin/pages/image", { images, domain: global.domain });
    } catch (error) {
        // logger.error(error.stack || error);
    }
};
ImageController.getImage = async (req, res, next) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.id);
        const image = await ImageModel.findOne({ _id }).populate('fanpage');
        return res.status(200).json({ status: "success", data: image });
    } catch (error) {
        // logger.error(error.stack || error);
        return res.status(500);
    }
};

module.exports = ImageController;
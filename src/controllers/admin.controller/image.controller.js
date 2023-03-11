const mongoose = require("mongoose");
const createError = require("http-errors");
const ImageModel = require("../../models/image.model");
const Upload = require("../../utils/drive");

const ImageController = {};

ImageController.imagePage = async (req, res, next) => {
    try {
        const images = await ImageModel.find().sort({ 'createdAt': 'desc' });
        return res.render("admin/pages/image", { images, domain: global.domain });
    } catch (error) {
    }
};
ImageController.deletedImages = async (req, res, next) => {
    try {
        const images = await ImageModel.find({ deleted: true }).sort({ 'createdAt': 'desc' }).limit(20);
        return res.render("admin/pages/deleted_images", { images, domain: global.domain });
    } catch (error) {
    }
};
ImageController.getImage = async (req, res, next) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.id);
        const image = await ImageModel.findOne({ _id }).populate('fanpage');
        return res.status(200).json({ status: "success", data: image });
    } catch (error) {
        return res.status(500);
    }
};
ImageController.softDeleteImage = async (req, res, next) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.id);
        const image = await ImageModel.findById({ _id }).populate('fanpage');
        const imageLatest = await ImageModel.findOne({ fanpage: image.fanpage._id, status: "latest" }).sort({ 'createdAt': 'desc' });
        if (imageLatest.postId != image.postId) {
            await ImageModel.deleteById({ _id });
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(200).json({ status: "failed", message: "this image is flag" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500);
    }
};
ImageController.deleteImage = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (id) {
            const _id = mongoose.Types.ObjectId(id);
            const image = await ImageModel.findById({ _id }).populate('fanpage');
            const driveFileId = image.source[image.source.findIndex(e => e.type === 'drive')].id;
            const deleteDrive = Upload.deleteFile(driveFileId);
            if (deleteDrive) {
                await ImageModel.findByIdAndDelete({ _id });
                return res.status(200).json({ status: "success" });
            } else {
                return res.status(200).json({ status: "failed", message: "Has error" });
            }
        } else {
            const images = await ImageModel.findDeleted();
            for (const image of images) {
                const driveFileId = image.source[image.source.findIndex(e => e.type === 'drive')].id;
                const deleteDrive = Upload.deleteFile(driveFileId);
                if (deleteDrive) {
                    await ImageModel.findByIdAndDelete({ _id: images._id });
                }
            }
            return res.status(200).json({ status: "success" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500);
    }
};

module.exports = ImageController;
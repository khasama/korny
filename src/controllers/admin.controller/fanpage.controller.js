const mongoose = require("mongoose");
const createError = require("http-errors");
const FanpageModel = require("../../models/fanpage.model");

const { getFanpageInformation } = require("../../utils");

const FanpageController = {};

FanpageController.fanpagePage = async (req, res, next) => {
    try {
        const fanpages = await FanpageModel.find({});
        return res.render("admin/pages/fanpage", { fanpages, domain: global.domain });
    } catch (error) {
        console.log(error);
    }
};
FanpageController.getImage = async (req, res, next) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.id);
        const fanpage = await FanpageModel.findOne({ _id });
        return res.status(200).json({ status: "success", data: fanpage });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};
FanpageController.addFanpage = async (req, res, next) => {
    try {
        const { name, id } = req.body;
        if (id) {
            const isExist = await FanpageModel.findOne({ fanpageId: id });
            if (isExist) return res.status(200).json({ status: "failed", message: "fanpage is exist" });
        } else {
            const isExist = await FanpageModel.findOne({ name });
            if (isExist) return res.status(200).json({ status: "failed", message: "fanpage is exist" });
        }
        const { idFanpage, nameFanpage } = await getFanpageInformation(name || id);
        if (idFanpage && nameFanpage) {
            const newfanpage = new FanpageModel({ fanpageId: idFanpage, name: nameFanpage });
            await newfanpage.save();
            return res.status(200).json({ status: "success", data: newfanpage });
        }


        return res.status(200).json({ status: "failed", message: "error" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};

FanpageController.deleteFanpage = async (req, res, next) => {
    try {
        // const _id = mongoose.Types.ObjectId(req.params.id);
        // await FanpageModel.findOneAndDelete({ _id });
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
};

module.exports = FanpageController;
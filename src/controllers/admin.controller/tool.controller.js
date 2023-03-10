const mongoose = require("mongoose");
const createError = require("http-errors");
// const cheerio = require('cheerio');
const fetch = require("node-fetch");
const FanpageModel = require("../../models/fanpage.model");
const ImageModel = require("../../models/image.model");
const Upload = require("../../utils/drive");
const { fetchImages } = require("../../utils");

const accessToken = process.env.FB_ACCESS_TOKEN;
const cookie = process.env.FB_COOKIE;

const ToolController = {};

ToolController.fanpagePage = async (req, res, next) => {
    try {
        const fanpages = await FanpageModel.find();
        return res.render("admin/pages/tools/fanpage", { domain: global.domain, fanpages });
    } catch (error) {
        // logger.error(error.stack || error);
    }
};
ToolController.getImagesOfFanpage = async (req, res, next) => {
    try {
        const _id = req.body.id;
        const fanpage = await FanpageModel.findById({ _id })
        const imageLatest = await ImageModel.findOne({ fanpage: _id, status: "latest" }).sort({ 'createdAt': 'desc' });
        let getError = 0, getSuccess = 0;
        let next = `https://graph.facebook.com/${fanpage.fanpageId}/photos/?access_token=${accessToken}&type=uploaded&limit=50`, arrImage = [], rs;
        while (next) {
            if (imageLatest) {
                rs = await fetchImages(next, imageLatest.postId);
            } else {
                rs = await fetchImages(next, 0);
            }
            next = rs.next;
            rs.arrData.forEach(ele => {
                arrImage.push(ele);
            });
            console.log(arrImage.length);
            if (arrImage.length >= 2000) next = false;
        }
        for (const image of arrImage) {
            const rs = await fetch(image.source, { method: "GET", });
            const source = [];
            if (rs.status == 200) {
                const blob = await rs.blob();
                const buffer = await blob.arrayBuffer();
                const uploadDriveResult = await Upload.uploadFile(
                    {
                        buffer: Buffer.from(buffer),
                        type: blob.type,
                        name: image.postId
                    },
                    false,
                    'img'
                );
                if (uploadDriveResult) {
                    source.push({
                        type: 'drive',
                        id: uploadDriveResult
                    });
                }
                const newImage = new ImageModel({
                    fanpage: _id,
                    postId: image.postId,
                    height: image.height,
                    width: image.width,
                    source
                });
                await newImage.save();
                getSuccess++;
                console.log(`success: ${getSuccess}`);
            } else {
                getError++;
                console.log(`error: ${getError}`);
            }
        }
        // await ImageModel.findOneAndUpdate({ postId: arrImage[0].postId }, { status: 'latest' });
        // await FanpageModel.findOneAndUpdate({ _id }, { numberImages: parseInt(fanpage.numberImages + getSuccess) });
        return res.status(200).json({ status: "success", message: `get thành công ${getSuccess} ảnh, ${getError} ảnh lỗi` });
    } catch (error) {
        // next(createError[500]);
        console.log(error);
    }
};


module.exports = ToolController;
const fetch = require("node-fetch");
const path = require('path');
const ImageModel = require("../models/image.model");
const drive = require("../configs/drive.config");
const mongoose = require("mongoose");

const MediaController = {};

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42";

MediaController.getImage = async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.id);
        const image = await ImageModel.findById({ _id });
        if (image) {
            const source = image.source;
            if (source.some(e => e.type === 'drive')) {
                const data = await drive.files.get(
                    {
                        fileId: source[source.findIndex(e => e.type === 'drive')].id,
                        alt: 'media',
                    },
                    {
                        responseType: 'stream'
                    }
                );
                return data.data.pipe(res);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = MediaController;

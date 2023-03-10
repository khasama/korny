require("dotenv").config();
const { Readable } = require('stream');
const drive = require("../configs/drive.config");
const Upload = {};

async function setFilePublic(fileId) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
    } catch (error) {
        console.log(error);
    }
};

Upload.uploadFile = async (file, share, t) => {
    try {
        let type, folder;
        if (t === "img") {
            type = `image/${file.type}`;
            folder = process.env.FOLDER_IMAGE;
        }
        const createFile = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: type,
                parents: [folder]
            },
            media: {
                mimeType: type,
                body: Readable.from(file.buffer)
            }
        });
        const fileId = createFile.data.id;
        if (share) await setFilePublic(fileId);
        return fileId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

Upload.deleteFile = async (fileId) => {
    try {
        const deleteFile = await drive.files.delete({ fileId });
        if (deleteFile.status === 204) {
            return true;
        }
    } catch (error) {
        console.log({ func: "delete drive", status: error.response.status, msg: error.response.statusText });
        throw error;
    }
};

module.exports = Upload;
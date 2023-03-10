const UserModel = require("../../models/user.model");

const ImageController = require("./image.controller");
const FanpageController = require("./fanpage.controller");
const UserController = require("./user.controller");
const ToolController = require("./tool.controller");

const AdminController = {};

AdminController.dashboard = async (req, res) => {
    try {

        return res.render("admin", { domain: global.domain });
    } catch (error) {
    }
};

module.exports = {
    ImageController,
    FanpageController,
    UserController,
    ToolController,
    AdminController,
}
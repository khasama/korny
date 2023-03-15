const mongoose = require("mongoose");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const AuthController = {};

AuthController.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            const user = await UserModel.findOne({ email });
            if (user) {
                const hashPass = user.password;
                const match = await bcrypt.compare(password, hashPass);
                if (match) {
                    const payload = {
                        id: user._id,
                        username: user.username,
                        avatar: user.avatar,
                        email: user.email,
                        role: user.role,
                    };
                    // const accessToken = await signAccessToken(payload);
                    // const refreshToken = await signRefreshToken(payload);
                    req.session.user = payload;
                    // req.session.access_token = accessToken;
                    // req.session.refresh_token = refreshToken;

                    return res.status(200).json({ status: "success" });
                } else {
                    return res
                        .status(200)
                        .json({ status: "error", message: "Sai pass" });
                }
            } else {
                return res.status(200).json({
                    status: "error",
                    message: "Email không tồn tại",
                });
            }
        } else {
            return res
                .status(400)
                .json({ status: "error", message: "Thiếu kìa bạn trẻ" });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: "Has error" });
    }
};

AuthController.register = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            const user = await UserModel.findOne({ email });
            if (!user) {
                const hashPass = await bcrypt.hash(password, 10);
                const newUser = new UserModel({
                    email,
                    password: hashPass,
                });
                await newUser.save();
                return res.status(200).json({
                    status: "success",
                });
            } else {
                return res.status(200).json({
                    status: "error",
                    message: "Email đã tồn tại",
                });
            }
        } else {
            return res
                .status(200)
                .json({ status: "error", message: "Thiếu kìa bạn trẻ" });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: "Has error" });
    }
};

// AuthController.google = async (req, res, next) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         if (email && password) {
//             const user = await UserModel.findOne({ email });
//             if (!user) {
//                 const hashPass = await bcrypt.hash(password, 10);
//                 const newUser = new UserModel({
//                     email,
//                     password: hashPass,
//                 });
//                 await newUser.save();
//                 return res.status(200).json({
//                     status: "success",
//                 });
//             } else {
//                 return res.status(200).json({
//                     status: "error",
//                     message: "Email đã tồn tại",
//                 });
//             }
//         } else {
//             return res
//                 .status(200)
//                 .json({ status: "error", message: "Thiếu kìa bạn trẻ" });
//         }
//     } catch (error) {
//         return res
//             .status(200)
//             .json({ status: "error", message: "Has error" });
//     }
// };


module.exports = AuthController;
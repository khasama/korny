const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            // required: true,
        },
        avatar: {
            type: String,
            default: '180S9M-mFn0Yg5Ia7vmoAeLWueHQLaZwU'
        },
        role: {
            type: String,
            default: 'normal'
        },
        googleId: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        source: {
            type: Array,
            required: true
        },
        fanpage: {
            type: String,
            ref: "fanpages",
        },
        status: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("images", imageSchema);

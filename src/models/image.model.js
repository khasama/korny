const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

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

imageSchema.plugin(mongoose_delete);

module.exports = mongoose.model("images", imageSchema);

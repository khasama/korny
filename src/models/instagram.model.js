const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const instagramSchema = new Schema(
    {
        instagramId: {
            type: String,
        },
        name: {
            type: String,
        },
        numberImages: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

instagramSchema.plugin(mongoose_delete);

module.exports = mongoose.model("instagrams", instagramSchema);

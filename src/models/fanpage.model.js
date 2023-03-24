const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const fanpageSchema = new Schema(
    {
        fanpageId: {
            type: String,
            required: true,
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

fanpageSchema.plugin(mongoose_delete);

module.exports = mongoose.model("fanpages", fanpageSchema);

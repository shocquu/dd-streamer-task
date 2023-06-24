"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const streamerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    upvotesCount: {
        type: Number,
        required: true,
    },
    downvotesCount: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
});
const Streamer = (0, mongoose_1.model)('Streamer', streamerSchema);
exports.default = Streamer;
//# sourceMappingURL=streamer.model.js.map
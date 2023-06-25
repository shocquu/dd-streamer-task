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
    imageUrl: String,
    upvotesCount: { type: Number, default: 0 },
    downvotesCount: { type: Number, default: 0 },
    totalVotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
const Streamer = (0, mongoose_1.model)('Streamer', streamerSchema);
exports.default = Streamer;
//# sourceMappingURL=streamer.model.js.map
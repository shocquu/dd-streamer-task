"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("../../enums");
const streamerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    imageUrl: String,
    votes: [
        {
            userId: {
                type: String,
                required: true,
            },
            voteType: {
                type: String,
                enum: enums_1.VoteType,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});
const Streamer = (0, mongoose_1.model)('Streamer', streamerSchema);
exports.default = Streamer;
//# sourceMappingURL=streamer.model.js.map
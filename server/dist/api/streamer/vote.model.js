"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("../../enums");
const voteSchema = new mongoose_1.Schema({
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
});
const Vote = (0, mongoose_1.model)('Vote', voteSchema);
exports.default = Vote;
//# sourceMappingURL=vote.model.js.map
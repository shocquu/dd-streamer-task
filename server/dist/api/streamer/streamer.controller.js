"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const streamer_model_1 = __importDefault(require("./streamer.model"));
const enums_1 = require("../../enums");
const StreamerController = {
    getStreamers: async (req, res) => {
        try {
            const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
            const sortOptions = {};
            sortOptions[String(sortBy)] = sortOrder === 'desc' ? -1 : 1;
            const totalStreamers = await streamer_model_1.default.countDocuments();
            const totalPages = Math.ceil(totalStreamers / +limit);
            const streamers = await streamer_model_1.default.find()
                .sort(sortOptions)
                .skip((+page - 1) * +limit)
                .limit(+limit);
            res.status(200).json({
                streamers,
                pagination: {
                    totalStreamers,
                    totalPages,
                    currentPage: +page,
                    limit: +limit,
                },
            });
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    getStreamerById: async ({ params: { streamerId } }, res) => {
        try {
            const streamer = await streamer_model_1.default.findById(streamerId);
            if (streamer)
                res.status(200).json(streamer);
            else
                res.status(404).json({ error: 'Streamer not found' });
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    createStreamer: async ({ body }, res) => {
        try {
            const { name, description, platform, imageUrl, upvotesCount, downvotesCount } = body;
            const newStreamer = new streamer_model_1.default({ name, description, platform, imageUrl, upvotesCount, downvotesCount });
            const savedStreamer = await newStreamer.save();
            res.status(201).json(savedStreamer);
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    updateSteamer: async ({ params, body }, res) => {
        try {
            const streamerId = params.streamerId;
            const { name, description, platform, imageUrl, upvotesCount, downvotesCount, totalVotes } = body;
            const updatedStreamer = await streamer_model_1.default.findByIdAndUpdate(streamerId, {
                name,
                description,
                platform,
                imageUrl,
                upvotesCount,
                downvotesCount,
                totalVotes,
            }, { new: true });
            if (updatedStreamer)
                res.status(200).json(updatedStreamer);
            else
                res.status(404).json({ error: 'Streamer not found' });
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    deleteStreamer: async ({ params: { streamerId } }, res) => {
        try {
            const deletedStreamer = await streamer_model_1.default.findByIdAndDelete(streamerId);
            if (deletedStreamer) {
                res.status(200).json({ message: 'Streamer deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Streamer not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    voteForStreamer: async ({ params, body }, res) => {
        try {
            const streamerId = params.streamerId;
            const voteType = body.voteType;
            if (voteType !== enums_1.VoteType.UPVOTE && voteType !== enums_1.VoteType.DOWNVOTE) {
                res.status(400).json({ error: 'Invalid voteType.' });
            }
            const streamer = await streamer_model_1.default.findById(streamerId);
            if (!streamer) {
                res.status(404).json({ error: 'Streamer not found' });
                return;
            }
            if (voteType === enums_1.VoteType.UPVOTE)
                streamer.upvotesCount += 1;
            else
                streamer.downvotesCount += 1;
            streamer.totalVotes += 1;
            await streamer_model_1.default.updateOne({ _id: streamerId }, streamer);
            res.status(200).json({ message: 'Vote updated successfully.' });
        }
        catch (error) {
            res.status(200).json({ error: `Internal server error: ${error.message}` });
        }
    },
    removeVote: async ({ params, body }, res) => {
        try {
            const streamerId = params.streamerId;
            const voteType = body.voteType;
            if (voteType !== enums_1.VoteType.UPVOTE && voteType !== enums_1.VoteType.DOWNVOTE) {
                res.status(400).json({ error: 'Invalid voteType.' });
            }
            const streamer = await streamer_model_1.default.findById(streamerId);
            if (!streamer) {
                res.status(404).json({ error: 'Streamer not found' });
                return;
            }
            if (voteType === enums_1.VoteType.UPVOTE)
                streamer.upvotesCount -= 1;
            else
                streamer.downvotesCount -= 1;
            streamer.totalVotes -= 1;
            await streamer_model_1.default.updateOne({ _id: streamerId }, streamer);
            res.status(200).json({ message: 'Vote updated successfully.' });
        }
        catch (error) {
            res.status(200).json({ error: `Internal server error: ${error.message}` });
        }
    },
};
exports.default = StreamerController;
//# sourceMappingURL=streamer.controller.js.map
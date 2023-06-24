"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const streamer_model_1 = __importDefault(require("./streamer.model"));
const StreamerController = {
    getStreamers: async (req, res) => {
        try {
            const streamers = await streamer_model_1.default.find();
            res.status(200).json(streamers);
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    getStreamerById: async ({ params: { id } }, res) => {
        try {
            const streamer = await streamer_model_1.default.findById(id);
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
            const { name, description, imageUrl, upvotesCount, downvotesCount } = body;
            const newStreamer = new streamer_model_1.default({ name, description, imageUrl, upvotesCount, downvotesCount });
            const savedStreamer = await newStreamer.save();
            res.status(201).json(savedStreamer);
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    updateSteamer: async ({ params, body }, res) => {
        try {
            const streamerId = params.id;
            const { name, description, imageUrl, upvotesCount, downvotesCount } = body;
            const updatedStreamer = await streamer_model_1.default.findByIdAndUpdate(streamerId, {
                name,
                description,
                imageUrl,
                upvotesCount,
                downvotesCount,
            }, { new: true });
        }
        catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    deleteStreamer: async ({ params: { id } }, res) => {
        try {
            const deletedStreamer = await streamer_model_1.default.findByIdAndDelete(id);
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
};
exports.default = StreamerController;
//# sourceMappingURL=streamer.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const streamer_model_1 = __importDefault(require("./streamer.model"));
const enums_1 = require("../../enums");
const mongoose_1 = require("mongoose");
const StreamerController = {
    getStreamers: async (req, res) => {
        try {
            const { offset = 0, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
            const sortOptions = {}; // FIXME: any
            sortOptions[String(sortBy)] = sortOrder === 'desc' ? -1 : 1;
            const totalStreamers = await streamer_model_1.default.countDocuments();
            const streamers = await streamer_model_1.default.aggregate([
                { $sort: sortOptions },
                { $skip: +offset },
                { $limit: +limit },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        platform: 1,
                        imageUrl: 1,
                        description: 1,
                        createdAt: 1,
                        upvoted: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'upvote'] },
                                    },
                                },
                                as: 'vote',
                                in: '$$vote.userId',
                            },
                        },
                        downvoted: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'downvote'] },
                                    },
                                },
                                as: 'vote',
                                in: '$$vote.userId',
                            },
                        },
                        statistics: {
                            upvotesCount: {
                                $size: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'upvote'] },
                                    },
                                },
                            },
                            downvotesCount: {
                                $size: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'downvote'] },
                                    },
                                },
                            },
                        },
                    },
                },
            ]);
            res.status(200).json({
                data: streamers,
                pagination: {
                    total: totalStreamers,
                    offset: +offset,
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
            const streamer = await streamer_model_1.default.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(streamerId) } },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        platform: 1,
                        imageUrl: 1,
                        description: 1,
                        createdAt: 1,
                        upvoted: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'upvote'] },
                                    },
                                },
                                as: 'vote',
                                in: '$$vote.userId',
                            },
                        },
                        downvoted: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'downvote'] },
                                    },
                                },
                                as: 'vote',
                                in: '$$vote.userId',
                            },
                        },
                        statistics: {
                            upvotesCount: {
                                $size: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'upvote'] },
                                    },
                                },
                            },
                            downvotesCount: {
                                $size: {
                                    $filter: {
                                        input: '$votes',
                                        as: 'vote',
                                        cond: { $eq: ['$$vote.voteType', 'downvote'] },
                                    },
                                },
                            },
                        },
                    },
                },
            ]);
            if (streamer)
                res.status(200).json(streamer[0]);
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
                return res.status(200).json({ message: 'Streamer deleted successfully' });
            }
            else {
                return res.status(404).json({ error: 'Streamer not found' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
    voteForStreamer: async ({ params, body }, res) => {
        try {
            const streamerId = params.streamerId;
            const { voteType, userId } = body;
            if (voteType !== enums_1.VoteType.UPVOTE && voteType !== enums_1.VoteType.DOWNVOTE)
                return res.status(400).json({ error: 'Invalid voteType.' });
            if (!userId)
                return res.status(400).json({ error: 'Invalid userId.' });
            const streamer = await streamer_model_1.default.findById(streamerId);
            if (!streamer)
                return res.status(404).json({ error: 'Streamer not found' });
            const existingVote = streamer.votes.find((vote) => vote.userId === userId);
            if (existingVote) {
                if (existingVote.voteType === voteType)
                    streamer.votes = streamer.votes.filter((vote) => vote.userId != existingVote.userId);
                else
                    existingVote.voteType = voteType;
            }
            else
                streamer.votes.push({ userId, voteType });
            await streamer_model_1.default.updateOne({ _id: streamerId }, streamer);
            return res.status(200).json({ message: 'Vote updated successfully.' });
        }
        catch (error) {
            return res.status(200).json({ error: `Internal server error: ${error.message}` });
        }
    },
};
exports.default = StreamerController;
//# sourceMappingURL=streamer.controller.js.map
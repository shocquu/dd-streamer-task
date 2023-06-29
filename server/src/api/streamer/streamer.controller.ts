import { Request, Response } from 'express';
import Streamer from './streamer.model';
import { VoteType } from '../../enums';
import { Types } from 'mongoose';

const StreamerController = {
    getStreamers: async (req: Request, res: Response): Promise<void> => {
        try {
            const { offset = 0, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
            const sortOptions: any = {}; // FIXME: any
            sortOptions[String(sortBy)] = sortOrder === 'desc' ? -1 : 1;

            const totalStreamers = await Streamer.countDocuments();
            const streamers = await Streamer.aggregate([
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
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    getStreamerById: async ({ params: { streamerId } }: Request, res: Response): Promise<void> => {
        try {
            const streamer = await Streamer.aggregate([
                { $match: { _id: new Types.ObjectId(streamerId) } },
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

            if (streamer) res.status(200).json(streamer[0]);
            else res.status(404).json({ error: 'Streamer not found' });
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    createStreamer: async ({ body }: Request, res: Response): Promise<void> => {
        try {
            const { name, description, platform, imageUrl, upvotesCount, downvotesCount } = body;
            const newStreamer = new Streamer({ name, description, platform, imageUrl, upvotesCount, downvotesCount });
            const savedStreamer = await newStreamer.save();
            res.status(201).json(savedStreamer);
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    updateSteamer: async ({ params, body }: Request, res: Response): Promise<void> => {
        try {
            const streamerId = params.streamerId;
            const { name, description, platform, imageUrl, upvotesCount, downvotesCount, totalVotes } = body;

            const updatedStreamer = await Streamer.findByIdAndUpdate(
                streamerId,
                {
                    name,
                    description,
                    platform,
                    imageUrl,
                    upvotesCount,
                    downvotesCount,
                    totalVotes,
                },
                { new: true }
            );

            if (updatedStreamer) res.status(200).json(updatedStreamer);
            else res.status(404).json({ error: 'Streamer not found' });
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    deleteStreamer: async ({ params: { streamerId } }: Request, res: Response) => {
        try {
            const deletedStreamer = await Streamer.findByIdAndDelete(streamerId);

            if (deletedStreamer) {
                return res.status(200).json({ message: 'Streamer deleted successfully' });
            } else {
                return res.status(404).json({ error: 'Streamer not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    voteForStreamer: async ({ params, body }: Request, res: Response) => {
        try {
            const streamerId = params.streamerId;
            const { voteType, userId } = body;

            if (voteType !== VoteType.UPVOTE && voteType !== VoteType.DOWNVOTE)
                return res.status(400).json({ error: 'Invalid voteType.' });
            if (!userId) return res.status(400).json({ error: 'Invalid userId.' });

            const streamer = await Streamer.findById(streamerId);

            if (!streamer) return res.status(404).json({ error: 'Streamer not found' });

            const existingVote = streamer.votes.find((vote) => vote.userId === userId);

            if (existingVote) {
                if (existingVote.voteType === voteType)
                    streamer.votes = streamer.votes.filter((vote) => vote.userId != existingVote.userId);
                else existingVote.voteType = voteType;
            } else streamer.votes.push({ userId, voteType });

            await Streamer.updateOne({ _id: streamerId }, streamer);
            return res.status(200).json({ message: 'Vote updated successfully.' });
        } catch (error) {
            return res.status(200).json({ error: `Internal server error: ${error.message}` });
        }
    },
};

export default StreamerController;

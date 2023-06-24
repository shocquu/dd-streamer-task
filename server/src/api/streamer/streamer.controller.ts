import { Request, Response } from 'express';
import Streamer from './streamer.model';
import { VoteType } from '../../enums';

const StreamerController = {
    getStreamers: async (req: Request, res: Response): Promise<void> => {
        try {
            const streamers = await Streamer.find();
            res.status(200).json(streamers);
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    getStreamerById: async ({ params: { id } }: Request, res: Response): Promise<void> => {
        try {
            const streamer = await Streamer.findById(id);

            if (streamer) res.status(200).json(streamer);
            else res.status(404).json({ error: 'Streamer not found' });
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    createStreamer: async ({ body }: Request, res: Response): Promise<void> => {
        try {
            const { name, description, imageUrl, upvotesCount, downvotesCount } = body;
            const newStreamer = new Streamer({ name, description, imageUrl, upvotesCount, downvotesCount });
            const savedStreamer = await newStreamer.save();
            res.status(201).json(savedStreamer);
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    updateSteamer: async ({ params, body }: Request, res: Response): Promise<void> => {
        try {
            const streamerId = params.id;
            const { name, description, imageUrl, upvotesCount, downvotesCount } = body;

            const updatedStreamer = await Streamer.findByIdAndUpdate(
                streamerId,
                {
                    name,
                    description,
                    imageUrl,
                },
                { new: true }
            );

            if (updatedStreamer) res.status(200).json(updatedStreamer);
            else res.status(404).json({ error: 'Streamer not found' });
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    deleteStreamer: async ({ params: { id } }: Request, res: Response): Promise<void> => {
        try {
            const deletedStreamer = await Streamer.findByIdAndDelete(id);

            if (deletedStreamer) {
                res.status(200).json({ message: 'Streamer deleted successfully' });
            } else {
                res.status(404).json({ error: 'Streamer not found' });
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },

    voteForStreamer: async ({ params, body }: Request, res: Response): Promise<void> => {
        try {
            const streamerId = params.id;
            const voteType = body.voteType as VoteType;

            if (voteType !== VoteType.UPVOTE && voteType !== VoteType.DOWNVOTE) {
                res.status(400).json({ error: 'Invalid voteType.' });
            }

            const streamer = await Streamer.findById(streamerId);

            if (!streamer) {
                res.status(404).json({ error: 'Streamer not found' });
                return;
            }

            if (voteType === VoteType.UPVOTE) streamer.upvotesCount += 1;
            else streamer.downvotesCount += 1;

            streamer.totalVotes += 1;

            await streamer.save();
            res.status(200).json({ message: 'Vote updated successfully.' });
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        }
    },
};

export default StreamerController;

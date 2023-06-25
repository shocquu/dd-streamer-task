import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';
import app from '../src';
import Streamer from '../src/api/streamer/streamer.model';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { VoteType } from '../src/enums';

describe('Streamer API Tests', () => {
    let mongoServer: MongoMemoryServer;
    let sandbox: SinonSandbox;

    before(async () => {
        mongoServer = new MongoMemoryServer();

        await mongoServer.start();
        const mongoUri = await mongoServer.getUri();
        await mongoose.createConnection(mongoUri);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('GET /streamers', () => {
        it('should return all streamers', async () => {
            const streamers = [
                {
                    name: 'Streamer 1',
                    description: 'Streamer 1 Description',
                    platform: 'Twitch',
                    imageUrl:
                        'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
                    upvotesCount: 10,
                    downvotesCount: 5,
                },
                {
                    name: 'Streamer 2',
                    description: 'Streamer 2 Description',
                    platform: 'YouTube',
                    upvotesCount: 8,
                    downvotesCount: 2,
                },
            ];

            sandbox.stub(Streamer, 'find').resolves(streamers);

            const response = await request(app).get('/streamers').expect(200);

            expect(response.body).to.deep.equal(streamers);
        });

        it('should handle internal server error', async () => {
            const errorMessage = 'Internal server error';
            sandbox.stub(Streamer, 'find').throws(new Error(errorMessage));

            const response = await request(app).get('/streamers').expect(500);

            expect(response.body).to.deep.equal({ error: `Internal server error: ${errorMessage}` });
        });
    });

    describe('GET /streamers/:streamerId', () => {
        it('should return a specific streamer if exists', async () => {
            const streamerId = '1234567890';
            const streamer = {
                _id: streamerId,
                name: 'Streamer 1',
                description: 'Streamer 1 Description',
                platform: 'Twitch',
                upvotesCount: 10,
                downvotesCount: 5,
            };

            sandbox.stub(Streamer, 'findById').resolves(streamer);

            const response = await request(app).get(`/streamers/${streamerId}`).expect(200);

            expect(response.body).to.deep.equal(streamer);
        });

        it('should return 404 if the streamer does not exist', async () => {
            const nonExistentStreamerId = 'nonexistentstreamerid';

            sandbox.stub(Streamer, 'findById').resolves(null);

            const response = await request(app).get(`/streamers/${nonExistentStreamerId}`).expect(404);

            expect(response.body).to.deep.equal({ error: 'Streamer not found' });
        });
    });

    describe('POST /streamers', () => {
        it('should create a new streamer', async () => {
            const newStreamer = {
                name: 'Streamer 1',
                description: 'Streamer 1 Description',
                platform: 'Kick',
            };
            sandbox.stub(Streamer.prototype, 'save').resolves(newStreamer);

            const response = await request(app).post('/streamers').send(newStreamer).expect(201);

            expect(response.body).to.deep.equal(newStreamer);
        });

        it('should handle errors and return 500', async () => {
            const newStreamer = {
                name: 'Streamer 1',
                description: 'Streamer 1 Description',
                platform: 'Twitch',
            };
            const errorMessage = 'Internal server error';
            sandbox.stub(Streamer.prototype, 'save').rejects(new Error(errorMessage));

            const response = await request(app).post('/streamers').send(newStreamer).expect(500);

            expect(response.body).to.deep.equal({ error: `Internal server error: ${errorMessage}` });
        });
    });

    describe('PUT /streamers/:streamerId', () => {
        it('should update an existing streamer', async () => {
            const streamerId = '1234567890';
            const updatedStreamer = {
                _id: streamerId,
                name: 'Updated Streamer',
                description: 'Updated Streamer Description',
            };
            sandbox.stub(Streamer, 'findByIdAndUpdate').resolves(updatedStreamer);

            const response = await request(app).put(`/streamers/${streamerId}`).send(updatedStreamer);

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(updatedStreamer);
        });

        it('should return 404 if the streamer does not exist', async () => {
            const nonExistentStreamerId = 'nonexistentstreamerid';
            const streamerToUpdate = {
                name: 'Streamer To Update',
                description: 'Updated Streamer Description',
            };
            sandbox.stub(Streamer, 'findByIdAndUpdate').resolves(null);

            const response = await request(app)
                .put(`/streamers/${nonExistentStreamerId}`)
                .send(streamerToUpdate)
                .expect(404);

            expect(response.body).to.deep.equal({ error: 'Streamer not found' });
        });
    });

    describe('DELETE /streamers/:streamerId', () => {
        it('should delete an existing streamer', async () => {
            const streamerId = '1234567890';
            const deletedStreamer = {
                _id: streamerId,
                name: 'Deleted Streamer',
                description: 'Deleted Streamer Description',
                platform: 'TikTok',
                upvotesCount: 6,
                downvotesCount: 9,
            };
            sandbox.stub(Streamer, 'findByIdAndDelete').resolves(deletedStreamer);

            const response = await request(app).delete(`/streamers/${streamerId}`).expect(200);

            expect(response.body).to.deep.equal({ message: 'Streamer deleted successfully' });
        });

        it('should return streamerId if the streamer does not exist', async () => {
            const streamerId = 'nonExistentId';
            sandbox.stub(Streamer, 'findByIdAndDelete').resolves(null);

            const response = await request(app).delete(`/streamers/${streamerId}`).expect(404);

            expect(response.body).to.deep.equal({ error: 'Streamer not found' });
        });
    });

    describe('POST /streamers/:streamerId/vote', () => {
        it('should handle upvote for an existing streamer', async () => {
            const streamerId = '6498b15e8e9b04bd01118a16';
            const streamer = {
                _id: streamerId,
                name: 'Streamer To Upvote',
                description: 'Upvoted Streamer',
                platform: 'Twitch',
                upvotesCount: 0,
                downvotesCount: 0,
                totalVotes: 0,
            };
            const updatedStreamer = {
                ...streamer,
                upvotesCount: streamer.upvotesCount + 1,
                totalVotes: streamer.totalVotes + 1,
            };

            sandbox.stub(Streamer, 'findById').resolves(streamer);
            sandbox.stub(Streamer.prototype, 'save').resolves(updatedStreamer);

            const response = await request(app)
                .put(`/streamers/${streamerId}/vote`)
                .send({ voteType: VoteType.UPVOTE })
                .expect(200);

            expect(response.body).to.deep.equal({ message: 'Vote updated successfully.' });
        });

        it('should handle downvote for an existing streamer', async () => {
            const streamerId = '6498b15e8e9b04bd01118a16';
            const streamer = {
                _id: streamerId,
                name: 'Streamer To Downvote',
                description: 'Downvoted Streamer',
                platform: 'Kick',
                upvotesCount: 10,
                downvotesCount: 5,
                totalVotes: 15,
            };
            const updatedStreamer = {
                ...streamer,
                downvotesCount: streamer.downvotesCount + 1,
                totalVotes: streamer.totalVotes + 1,
            };

            sandbox.stub(Streamer, 'findById').resolves(streamer);
            sandbox.stub(Streamer.prototype, 'save').resolves(updatedStreamer);

            const response = await request(app)
                .put(`/streamers/${streamerId}/vote`)
                .send({ voteType: VoteType.DOWNVOTE })
                .expect(200);

            expect(response.body).to.deep.equal({ message: 'Vote updated successfully.' });
        });

        it('should handle invalid voteType', async () => {
            const streamerId = '1234567890';
            const streamer = {
                _id: streamerId,
                name: 'Streamer 1',
                description: 'Streamer 1 Description',
                platform: 'Twitch',
                upvotesCount: 10,
                downvotesCount: 5,
            };

            sandbox.stub(Streamer, 'findById').resolves(streamer);

            const response = await request(app)
                .put(`/streamers/${streamerId}/vote`)
                .send({ voteType: 'invalidVoteType' })
                .expect(400);

            expect(response.body).to.deep.equal({ error: 'Invalid voteType.' });
        });

        it('should return 404 if the streamer does not exist', async () => {
            const nonExistentStreamerId = 'nonExistentStreamerId';

            sandbox.stub(Streamer, 'findById').resolves(null);

            const response = await request(app)
                .put(`/streamers/${nonExistentStreamerId}/vote`)
                .send({ voteType: VoteType.UPVOTE })
                .expect(404);

            expect(response.body).to.deep.equal({ error: 'Streamer not found' });
        });
    });
});

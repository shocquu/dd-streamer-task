import { VoteType } from './enums';

export type Vote = {
    userId: string;
    voteType: VoteType;
    timestamp: Date;
};

export type Streamer = {
    _id: string;
    name: string;
    platform: string;
    imageUrl?: string;
    description?: string;
    upvoted: string[];
    downvoted: string[];
    statistics: {
        upvotesCount: number;
        downvotesCount: number;
    };
};

export type AddStreamerData = {
    name: string;
    platform: string;
    imageUrl?: string;
    description?: string;
};

export type QueryParams = {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type Pagination = {
    limit: number;
    total: number;
    offset: number;
};

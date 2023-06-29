export type Streamer = {
    _id: string;
    name: string;
    platform: string;
    imageUrl?: string;
    description?: string;
    upvotesCount: number;
    downvotesCount: number;
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

export type VoteType = 'upvote' | 'downvote';

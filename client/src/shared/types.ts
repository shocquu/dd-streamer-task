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
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type Pagination = {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
};

export type VoteType = 'upvote' | 'downvote';

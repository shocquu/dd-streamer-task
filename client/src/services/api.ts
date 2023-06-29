import { VoteType } from '../shared/enums';
import { AddStreamerData, Pagination, QueryParams, Streamer } from '../shared/types';

const API_BASE_URL = 'http://localhost:3000';

const handleResponse = async (response: Response) => {
    const data = await response.json();

    if (response.ok) return data;
    else throw data;
};

export const getStreamers = async ({ sortBy, sortOrder, offset, limit }: QueryParams = {}): Promise<{
    data: Streamer[];
    pagination: Pagination;
}> => {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.set('limit', String(limit));
    if (offset) queryParams.set('offset', String(offset));
    if (sortBy) queryParams.set('sortBy', sortBy);
    if (sortOrder) queryParams.set('sortOrder', sortOrder);

    const response = await fetch(`${API_BASE_URL}/streamers?${queryParams}`);
    return handleResponse(response);
};

export const getStreamer = async (streamerId: string): Promise<Streamer> => {
    const response = await fetch(`${API_BASE_URL}/streamers/${streamerId}`);
    return handleResponse(response);
};

export const addStreamer = async (streamerData: AddStreamerData): Promise<Streamer> => {
    const response = await fetch(`${API_BASE_URL}/streamers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(streamerData),
    });
    return handleResponse(response);
};

export const upvoteStreamer = async (streamerId: string): Promise<void> => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${API_BASE_URL}/streamers/${streamerId}/vote`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, voteType: VoteType.Upvote }),
    });
    await handleResponse(response);
};

export const downvoteStreamer = async (streamerId: string): Promise<void> => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${API_BASE_URL}/streamers/${streamerId}/vote`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, voteType: VoteType.Downvote }),
    });
    await handleResponse(response);
};

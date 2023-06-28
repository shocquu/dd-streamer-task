import { VoteType } from '../shared/enums';

type Votes = {
    [streamerId: string]: VoteType;
};

export const setLocalStorageItem = (key: string, value: unknown) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error while saving to Local Storage:', error);
    }
};

export const getLocalStorageItem = (key: string) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return undefined;
        }
        const value = JSON.parse(serializedValue);
        return value;
    } catch (error) {
        console.error('Error while reading from Local Storage:', error);
        return undefined;
    }
};

export const removeLocalStorageItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error while removing from Local Storage:', error);
    }
};

export const saveLocalStorageVote = (id: string, voteType: VoteType) => {
    const votes: Votes = getLocalStorageItem('votes') || {};
    const updatedVotes = { ...votes, [id]: voteType };
    setLocalStorageItem('votes', updatedVotes);
};

export const removeLocalStorageVote = (id: string) => {
    const votes: Votes = getLocalStorageItem('votes');
    delete votes[id];
    setLocalStorageItem('votes', votes);
};

import { useState, useEffect } from 'react';
import { Pagination, QueryParams } from '../shared/types';

type UsePaginationOptions<T> = {
    fetchData: (queryParams?: QueryParams) => Promise<{
        data: T[];
        pagination: Pagination;
    }>;
    initialLimit?: number;
    initialOffset?: number;
};

const usePagination = <T,>({ fetchData, initialLimit = 10, initialOffset = 0 }: UsePaginationOptions<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<Pagination>({
        offset: initialOffset,
        limit: initialLimit,
        total: 0,
    });

    const fetchDataAndSetData = async (offset: number, limit: number) => {
        setIsLoading(true);

        try {
            const newData = await fetchData({ offset, limit });
            setPagination(newData.pagination);
            setData((prevData) => [...prevData, ...newData.data]);
        } catch (error) {
            console.error('Failed to fetch data: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMore = () => {
        const { offset, limit, total } = pagination;
        if (offset + limit < total) {
            const newOffset = offset + limit;
            fetchDataAndSetData(newOffset, limit);
        }
    };

    useEffect(() => {
        fetchDataAndSetData(initialOffset, initialLimit);
        // return () => {
        //     fetchDataAndSetData(initialOffset, initialLimit);
        // };
    }, []);

    return { data, ...pagination, isLoading, loadMore };
};

export default usePagination;

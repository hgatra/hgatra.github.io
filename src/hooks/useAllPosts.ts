import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from "@/lib/api";
import type { Post } from '@/types';

type PostSortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

type UseAllPostsParams = {
    tags?: string[];
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: PostSortOption;
};

export type PostsPagination = {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
};

type AllPostsApiResponse = {
    success: boolean;
    data: Post[];
    pagination?: PostsPagination;
};

const sortByMap: Record<PostSortOption, string> = {
    newest: 'newestFirst',
    oldest: 'oldestFirst',
    'title-asc': 'titleAsc',
    'title-desc': 'titleDesc',
};

const buildNotesPath = ({
    tags,
    search,
    limit,
    offset,
    sortBy,
}: {
    tags?: string[];
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: string;
}) => {
    const params = new URLSearchParams();
    if (tags && tags.length > 0) {
        params.set('tags', tags.join(','));
    }
    if (search?.trim()) {
        params.set('search', search.trim());
    }
    if (limit !== undefined) {
        params.set('limit', limit.toString());
    }
    if (offset !== undefined) {
        params.set('offset', offset.toString());
    }
    if (sortBy) {
        params.set('sortBy', sortBy);
    }
    const queryString = params.toString();
    return queryString ? `/api/notes?${queryString}` : '/api/notes';
};

export function useAllPosts({ tags, search, limit, offset, sortBy }: UseAllPostsParams = {}) {
    const normalizedSearch = search?.trim() || '';
    const apiSortBy = sortBy ? sortByMap[sortBy] : undefined;

    return useQuery<AllPostsApiResponse>({
        queryKey: ['notes', { tags, search: normalizedSearch, limit, offset, sortBy: apiSortBy }],
        queryFn: () => api.get(buildNotesPath({ tags, search: normalizedSearch, limit, offset, sortBy: apiSortBy })),
        placeholderData: keepPreviousData,
    });
}
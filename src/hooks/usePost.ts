import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { DetailPost } from '@/types';

type PostDetailApiResponse = {
    success: boolean;
    data: DetailPost;
};

export function usePost(slug: string) {
    return useQuery<PostDetailApiResponse>({
        queryKey: ["note", slug],
        queryFn: async () => {
            if (!slug) throw new Error("Missing slug");
            return api.get(`/api/notes/${slug}`);
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
}
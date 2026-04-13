import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function usePost(slug: string) {
    return useQuery({
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
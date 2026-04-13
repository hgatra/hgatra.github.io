import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useLatestPosts() {
    return useQuery({
        queryKey: ["latest-notes"],
        queryFn: () => api.get("/api/notes/latest"),
    });
}
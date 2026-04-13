import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useAllPosts() {
    return useQuery({
        queryKey: ["notes"],
        queryFn: () => api.get("/api/notes"),
    });
}
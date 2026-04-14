import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useAllTags() {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => api.get("/api/notes/tags"),
    });
}
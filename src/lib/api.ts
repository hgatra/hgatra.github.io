const BASE_URL = (import.meta.env.VITE_SERVER_URL || "http://localhost:3000").replace(/\/+$/, "");

export const api = {
    get: async (path: string) => {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const res = await fetch(`${BASE_URL}${normalizedPath}`);

        if (!res.ok) {
            throw new Error("API Error");
        }

        return res.json();
    },
};
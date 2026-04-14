const postDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
});

const monthYearFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
});

const normalizeTimestamp = (value: string | number): number => {
    const raw = typeof value === 'string' ? Number(value) : value;

    if (!Number.isFinite(raw)) {
        return Number.NaN;
    }

    // Convert seconds timestamp to milliseconds.
    return Math.abs(raw) < 1e12 ? raw * 1000 : raw;
};

export const formatPostDate = (value: string | number): string => {
    const normalized = normalizeTimestamp(value);
    const date = Number.isNaN(normalized) ? new Date(value) : new Date(normalized);

    return Number.isNaN(date.getTime()) ? String(value) : postDateFormatter.format(date);
};

export const formatProjectDate = (dateString: string): string => {
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? dateString : monthYearFormatter.format(date);
};

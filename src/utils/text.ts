const DEFAULT_WORDS_PER_MINUTE = 200;

export const calculateReadTime = (content?: string): string => {
    if (!content) return '~1 min read';

    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / DEFAULT_WORDS_PER_MINUTE);
    return `${minutes} min read`;
};

export const getExcerpt = (content?: string, maxLength = 150): string => {
    if (!content) return '';

    const cleanedContent = content
        .replace(/---[\s\S]*?---/g, '')
        .replace(/#+\s/g, '')
        .replace('[toc]', '')
        .trim();

    return cleanedContent.length > maxLength
        ? `${cleanedContent.slice(0, maxLength)}...`
        : cleanedContent;
};

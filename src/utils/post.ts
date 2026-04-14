export const getPostCoverImageByTags = (tags: string[]): string => {
    if (tags.includes('Math')) return '/assets/images/cover/math-post.png';
    if (tags.includes('Code')) return '/assets/images/cover/code-post.png';
    if (tags.includes('IT')) return '/assets/images/cover/it-post.png';
    return '/assets/images/cover/sharing-post.png';
};

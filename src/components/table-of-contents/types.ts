export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export interface TableOfContentProps {
    content: string;
    selector?: string;
}

export const DEFAULT_SELECTOR = '.markdown-body h2[id], .markdown-body h3[id]';

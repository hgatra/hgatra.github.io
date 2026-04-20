import { defaultSchema } from 'rehype-sanitize';

// Robust TOC replacement handling variations: [toc], [TOC], [[toc]], etc.
export const preprocessMarkdown = (content: string): string => {
    const withoutFrontMatter = content.replace(
        /^\uFEFF?---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/,
        '',
    );

    // Normalize one-line $$...$$ to display-math blocks so remark-math parses them as block math.
    const normalizedMathBlocks = withoutFrontMatter.replace(
        /(^|\n)([ \t]*)\$\$([^\n]+?)\$\$[ \t]*(?=\n|$)/g,
        (_match, lineStart: string, indent: string, expression: string) => {
            return `${lineStart}${indent}$$\n${indent}${expression.trim()}\n${indent}$$`;
        },
    );

    return normalizedMathBlocks.replace(/^\[\[?toc\]?\]\s*$/gim, '');
};

export const sanitizeConfig = {
    ...defaultSchema,
    tagNames: [
        ...(defaultSchema.tagNames || []),
        'admonition',
    ],
    attributes: {
        ...defaultSchema.attributes,
        '*': ['className', 'id', 'style'],
        'admonition': ['datatype'],
    },
};
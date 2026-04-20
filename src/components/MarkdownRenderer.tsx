// components/MarkdownRenderer.tsx
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

// Remark Plugins
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import remarkEmoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import { remarkDirectiveRehype } from '../plugins/remarkDirectives';
import { remarkCallouts } from '../plugins/remarkCallouts';

// Rehype Plugins
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';

// Configs & UI
import { preprocessMarkdown, sanitizeConfig } from '../config/rendererConfig';
import { Admonition } from './Admonition';

// CSS Imports
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';
import '../styles/markdown.css';

interface MarkdownRendererProps {
    content: string;
}

const markdownComponents = {
    admonition: Admonition,
} as any;

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const processedContent = useMemo(() => preprocessMarkdown(content), [content]);

    return (
        <div className="markdown-body">
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,               // 1. GitHub Flavored Markdown (tables, tasklists)
                    remarkMath,              // 2. Math ($math$)
                    remarkBreaks,            // 3. Keep single-line breaks as <br>
                    remarkDirective,         // 4. Directives (:::info)
                    remarkDirectiveRehype,   // 5. Transform Directives to AST nodes
                    remarkCallouts,          // 6. Transform GitHub Callouts (> [!NOTE])
                    remarkEmoji,             // 7. Emojis
                ]}
                rehypePlugins={[
                    [rehypeSanitize, sanitizeConfig], // 1. Secure output (must run early on standard tags)
                    rehypeSlug,                       // 2. Add IDs to headings
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }], // 3. Wrap headings with anchor links
                    rehypeKatex,                      // 4. Render Math safely
                    rehypeHighlight,                  // 5. Code Syntax Highlighting
                ]}
                components={markdownComponents}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
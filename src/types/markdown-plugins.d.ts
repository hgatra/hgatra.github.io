declare module 'markdown-it-katex' {
    import type MarkdownIt from 'markdown-it';
    function markdownItKatex(md: MarkdownIt): void;
    export default markdownItKatex;
}

declare module 'markdown-it-container' {
    import type MarkdownIt from 'markdown-it';
    type RenderFunction = (tokens: any[], idx: number, options: any, env: any, self: any) => string;
    function markdownItContainer(md: MarkdownIt, name: string, options: { render: RenderFunction; validate: (params: string) => boolean }): void;
    export default markdownItContainer;
}

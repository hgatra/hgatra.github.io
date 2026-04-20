import type { Parent } from 'unist';

// Extending standard mdast nodes for custom directive types
export interface DirectiveNode extends Parent {
    type: 'containerDirective' | 'leafDirective' | 'textDirective';
    name: string;
    attributes?: Record<string, string>;
    data?: {
        hName?: string;
        hProperties?: Record<string, unknown>;
        [key: string]: unknown;
    };
}

export interface HastData {
    hName?: string;
    hProperties?: Record<string, unknown>;
}
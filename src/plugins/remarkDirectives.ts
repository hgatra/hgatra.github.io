import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import type { Node } from 'unist';
import type { DirectiveNode, HastData } from '../types/markdown';

export const remarkDirectiveRehype: Plugin<[], Root> = () => (tree) => {
    visit(tree, (node: Node) => {
        if (
            node.type === 'containerDirective' ||
            node.type === 'leafDirective' ||
            node.type === 'textDirective'
        ) {
            const dNode = node as DirectiveNode;
            const data = (dNode.data || (dNode.data = {})) as HastData;
            const name = dNode.name.toLowerCase();

            // Convert directives to a custom <admonition> element
            data.hName = 'admonition';
            data.hProperties = {
                ...(data.hProperties || {}),
                datatype: name,
                datakind: 'color',
            };
        }
    });
};
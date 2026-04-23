import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Blockquote, Paragraph, Text } from 'mdast';
import type { Parent } from 'unist';
import type { HastData } from '../types/markdown';

const CALLOUT_REGEX = /^\[!([a-zA-Z]+)\]\s*/;

export const remarkCallouts: Plugin<[], Root> = () => (tree) => {
    visit(tree, 'blockquote', (node: Blockquote, _index?: number, parent?: Parent) => {
        // AST Safety: Always guard children access
        if (!parent || !node.children || node.children.length === 0) return;

        const firstChild = node.children[0] as Paragraph;
        if (firstChild.type !== 'paragraph' || !firstChild.children || firstChild.children.length === 0) return;

        const firstTextNode = firstChild.children[0] as Text;
        if (firstTextNode.type !== 'text') return;

        const match = firstTextNode.value.match(CALLOUT_REGEX);
        if (match) {
            const type = match[1].toLowerCase();

            // Clean up the text node to remove the [!NOTE] identifier
            firstTextNode.value = firstTextNode.value.replace(CALLOUT_REGEX, '');

            // GitHub-style callout title: text on the same line after [!TYPE]
            const inlineTitle = firstTextNode.value.trim();

            if (inlineTitle) {
                // Remove inline title from body so it is only shown in header
                firstTextNode.value = '';
            }

            // If the node becomes empty, safely remove it
            if (!firstTextNode.value.trim()) {
                firstChild.children.shift();
            }

            if (firstChild.children.length === 0) {
                node.children.shift();
            }

            // Mutate hast properties to transform blockquote into an <admonition>
            const data = (node.data || (node.data = {})) as HastData;
            data.hName = 'admonition';
            data.hProperties = {
                ...(data.hProperties || {}),
                datatype: type,
                datakind: 'callout',
                datatitle: inlineTitle || undefined,
            };
        }
    });
};
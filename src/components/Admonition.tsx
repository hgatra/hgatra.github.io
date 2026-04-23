import React from 'react';

interface AdmonitionProps {
    datatype?: string;
    dataType?: string;
    datakind?: string;
    dataKind?: string;
    datatitle?: string;
    dataTitle?: string;
    className?: string;
    ['data-type']?: string;
    ['data-kind']?: string;
    ['data-title']?: string;
    children?: React.ReactNode;
}

type AdmonitionType = 'note' | 'tip' | 'important' | 'warning' | 'caution' | 'info' | 'success' | 'danger';
type AdmonitionKind = 'callout' | 'color';

const TYPE_ICON_URLS: Record<AdmonitionType, string> = {
    note: '/assets/icons/outline-circle-info.svg',
    tip: '/assets/icons/outline-bulb.svg',
    important: '/assets/icons/outline-message.svg',
    warning: '/assets/icons/outline-warning.svg',
    caution: '/assets/icons/outline-caution.svg',
    info: '/assets/icons/outline-circle-info.svg',
    success: '/assets/icons/outline-bulb.svg',
    danger: '/assets/icons/outline-caution.svg',
};

const getIconMaskStyle = (iconUrl: string): React.CSSProperties => ({
    backgroundColor: 'currentColor',
    WebkitMaskImage: `url(${iconUrl})`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskImage: `url(${iconUrl})`,
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
});

const TYPE_LABELS: Record<AdmonitionType, string> = {
    note: 'Note',
    tip: 'Tip',
    important: 'Important',
    warning: 'Warning',
    caution: 'Caution',
    info: 'Info',
    success: 'Success',
    danger: 'Danger',
};

const COLOR_TYPES: Set<AdmonitionType> = new Set(['info', 'success', 'warning', 'danger']);

const normalizeType = (raw?: string): string => {
    if (!raw) return '';
    return raw.toLowerCase().trim();
};

const extractTypeFromClassName = (className?: string): string => {
    if (!className) return '';
    const match = className.match(/admonition-([a-z-]+)/i);
    return match?.[1]?.toLowerCase() || '';
};

const getTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);

    if (Array.isArray(node)) {
        return node.map(getTextFromNode).join('');
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
        return getTextFromNode(node.props.children);
    }

    return '';
};

const isHeadingElement = (node: React.ReactNode): node is React.ReactElement<{ children?: React.ReactNode }> => {
    return React.isValidElement(node)
        && typeof node.type === 'string'
        && /^h[1-6]$/i.test(node.type);
};

const titleCase = (value: string): string => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const Admonition: React.FC<AdmonitionProps> = ({ datatype, dataType, datakind, dataKind, datatitle, dataTitle, className, children, ...props }) => {
    const fromDataType = normalizeType(datatype) || normalizeType(dataType) || normalizeType(props['data-type']);
    const fromClassName = normalizeType(extractTypeFromClassName(className));
    const maybeType = (fromDataType || fromClassName || 'note') as AdmonitionType;
    const type: AdmonitionType = TYPE_LABELS[maybeType] ? maybeType : 'note';

    const rawKind = normalizeType(datakind) || normalizeType(dataKind) || normalizeType(props['data-kind']);
    const kind: AdmonitionKind = rawKind === 'callout' || rawKind === 'color'
        ? rawKind
        : (COLOR_TYPES.has(type) ? 'color' : 'callout');

    const childArray = React.Children.toArray(children);
    const firstNode = childArray[0];
    const hasHeadingTitle = isHeadingElement(firstNode);
    const inlineCalloutTitle = (datatitle || dataTitle || props['data-title'] || '').trim();
    const headingTitle = hasHeadingTitle ? getTextFromNode(firstNode.props.children).trim() : '';
    const title = inlineCalloutTitle || headingTitle || TYPE_LABELS[type] || titleCase(type);
    const showCalloutHeader = kind === 'callout';
    const contentChildren = showCalloutHeader && hasHeadingTitle ? childArray.slice(1) : childArray;

    return (
        <div className={`admonition admonition-kind-${kind} admonition-${type}`}>
            {showCalloutHeader && (
                <div className="admonition-title-row">
                    <span className="admonition-icon" aria-hidden="true" style={getIconMaskStyle(TYPE_ICON_URLS[type])} />
                    <span className="admonition-title">{title}</span>
                </div>
            )}
            <div className="admonition-content">
                {contentChildren}
            </div>
        </div>
    );
};
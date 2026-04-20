import React from 'react';

interface AdmonitionProps {
    datatype?: string;
    dataType?: string;
    className?: string;
    ['data-type']?: string;
    children?: React.ReactNode;
}

const normalizeType = (raw?: string): string => {
    if (!raw) return '';
    const normalized = raw.toLowerCase().trim();
    if (normalized === 'caution') return 'warning';
    return normalized;
};

const extractTypeFromClassName = (className?: string): string => {
    if (!className) return '';
    const match = className.match(/admonition-([a-z-]+)/i);
    return match?.[1]?.toLowerCase() || '';
};

export const Admonition: React.FC<AdmonitionProps> = ({ datatype, dataType, className, children, ...props }) => {
    const fromDataType = normalizeType(datatype) || normalizeType(dataType) || normalizeType(props['data-type']);
    const fromClassName = normalizeType(extractTypeFromClassName(className));
    const type = fromDataType || fromClassName || 'info';

    return (
        <div className={`admonition admonition-${type}`}>
            <div className="admonition-content">
                {children}
            </div>
        </div>
    );
};
import React from 'react';
import { type TocItem } from './types';

interface DesktopTableOfContentsProps {
    activeId: string;
    items: TocItem[];
    navRef: React.RefObject<HTMLElement | null>;
    linkRefs: React.MutableRefObject<Record<string, HTMLAnchorElement | null>>;
    onNavigate: (headingId: string) => void;
}

const DesktopTableOfContents: React.FC<DesktopTableOfContentsProps> = ({
    activeId,
    items,
    navRef,
    linkRefs,
    onNavigate,
}) => {
    return (
        <aside className="hidden rounded-2xl border border-muted/10 bg-surface/95 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface/85 lg:block">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">On this page</h2>
            <nav ref={navRef} aria-label="Table of contents" className="max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
                <ul className="space-y-1 pb-2">
                    {items.map((item) => {
                        const isActive = item.id === activeId;
                        const indentLevel = Math.max(item.level - 2, 0);

                        return (
                            <li key={item.id} style={{ paddingLeft: `${indentLevel * 12}px` }}>
                                <a
                                    href={`#${item.id}`}
                                    ref={(element) => {
                                        linkRefs.current[item.id] = element;
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onNavigate(item.id);
                                    }}
                                    className={`block rounded-md px-2 py-1.5 text-sm leading-tight transition ${isActive
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-muted hover:bg-muted/10 hover:text-text'
                                        }`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default DesktopTableOfContents;

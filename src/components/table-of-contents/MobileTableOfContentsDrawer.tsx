import React from 'react';
import { createPortal } from 'react-dom';
import { type TocItem } from './types';

interface MobileTableOfContentsDrawerProps {
    activeId: string;
    items: TocItem[];
    isOpen: boolean;
    buttonBottom: number;
    navRef: React.RefObject<HTMLElement | null>;
    linkRefs: React.MutableRefObject<Record<string, HTMLAnchorElement | null>>;
    onOpen: () => void;
    onClose: () => void;
    onNavigate: (headingId: string) => void;
}

const MobileTableOfContentsDrawer: React.FC<MobileTableOfContentsDrawerProps> = ({
    activeId,
    items,
    isOpen,
    buttonBottom,
    navRef,
    linkRefs,
    onOpen,
    onClose,
    onNavigate,
}) => {
    const mobileToc = (
        <div className="lg:hidden">
            <button
                type="button"
                aria-label="Open table of contents"
                aria-expanded={isOpen}
                onClick={onOpen}
                style={{ bottom: `${buttonBottom}px` }}
                className="fixed right-5 z-[1000] inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                >
                    <path d="M8 6h12" />
                    <path d="M8 12h12" />
                    <path d="M8 18h12" />
                    <path d="M3 6h.01" />
                    <path d="M3 12h.01" />
                    <path d="M3 18h.01" />
                </svg>
            </button>

            {isOpen && (
                <button
                    type="button"
                    aria-label="Close table of contents"
                    onClick={onClose}
                    className="fixed inset-0 z-[1100] bg-black/35"
                />
            )}

            <aside className={`fixed inset-x-4 bottom-4 z-[1200] rounded-2xl border border-muted/15 bg-surface p-4 shadow-xl transition ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">On this page</h2>
                    <button
                        type="button"
                        aria-label="Close drawer"
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-sm text-muted hover:bg-muted/10"
                    >
                        Close
                    </button>
                </div>
                <nav ref={navRef} aria-label="Mobile table of contents" className="max-h-[min(62vh,24rem)] overflow-y-auto pr-1">
                    <ul className="space-y-1 pb-1">
                        {items.map((item) => {
                            const isActive = item.id === activeId;
                            const indentLevel = Math.max(item.level - 2, 0);

                            return (
                                <li key={`${item.id}-mobile`} style={{ paddingLeft: `${indentLevel * 12}px` }}>
                                    <a
                                        href={`#${item.id}`}
                                        ref={(element) => {
                                            linkRefs.current[item.id] = element;
                                        }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            onNavigate(item.id);
                                            onClose();
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
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(mobileToc, document.body) : mobileToc;
};

export default MobileTableOfContentsDrawer;

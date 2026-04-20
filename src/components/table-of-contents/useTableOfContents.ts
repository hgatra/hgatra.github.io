import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_SELECTOR } from './types';
import type { TocItem } from './types';

interface UseTableOfContentsArgs {
    content: string;
    selector?: string;
}

export const useTableOfContents = ({ content, selector = DEFAULT_SELECTOR }: UseTableOfContentsArgs) => {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
    const [mobileButtonBottom, setMobileButtonBottom] = useState<number>(20);

    const stickyOffset = 112;
    const desktopNavRef = useRef<HTMLElement | null>(null);
    const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const mobileNavRef = useRef<HTMLElement | null>(null);
    const mobileLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

    const hasEnoughHeadings = useMemo(() => items.length >= 2, [items]);

    useEffect(() => {
        const collectHeadings = () => {
            const headingNodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
            const nextItems = headingNodes
                .map((heading) => ({
                    id: heading.id,
                    text: heading.textContent?.trim() || '',
                    level: Number(heading.tagName.replace('H', '')),
                }))
                .filter((item) => item.id && item.text);

            setItems(nextItems);
            setActiveId(nextItems[0]?.id || '');
        };

        const rafId = window.requestAnimationFrame(collectHeadings);

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [content, selector]);

    useEffect(() => {
        if (items.length === 0) {
            setActiveId('');
            return;
        }

        const headingElements = items
            .map((item) => document.getElementById(item.id))
            .filter((element): element is HTMLElement => Boolean(element));

        if (headingElements.length === 0) {
            return;
        }

        const updateActiveHeading = () => {
            const reachedHeadings = headingElements.filter(
                (element) => element.getBoundingClientRect().top <= stickyOffset + 1,
            );

            const currentElement = reachedHeadings[reachedHeadings.length - 1] || headingElements[0];
            setActiveId(currentElement.id);
        };

        const observer = new IntersectionObserver(updateActiveHeading, {
            root: null,
            rootMargin: `-${stickyOffset}px 0px -55% 0px`,
            threshold: [0, 1],
        });

        headingElements.forEach((element) => observer.observe(element));
        updateActiveHeading();
        window.addEventListener('resize', updateActiveHeading);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateActiveHeading);
        };
    }, [items, stickyOffset]);

    useEffect(() => {
        if (!activeId) {
            return;
        }

        const keepLinkInView = (navElement: HTMLElement | null, activeLink: HTMLAnchorElement | null) => {
            if (!navElement || !activeLink) {
                return;
            }

            const navRect = navElement.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            const isOutOfView = linkRect.top < navRect.top || linkRect.bottom > navRect.bottom;

            if (isOutOfView) {
                activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        };

        keepLinkInView(desktopNavRef.current, desktopLinkRefs.current[activeId]);

        if (isMobileOpen) {
            keepLinkInView(mobileNavRef.current, mobileLinkRefs.current[activeId]);
        }
    }, [activeId, isMobileOpen]);

    useEffect(() => {
        if (!isMobileOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileOpen]);

    useEffect(() => {
        const updateButtonOffset = () => {
            const footer = document.querySelector('footer');
            const baseBottom = 20;

            if (!footer) {
                setMobileButtonBottom(baseBottom);
                return;
            }

            const footerTop = footer.getBoundingClientRect().top;
            const overlap = Math.max(0, window.innerHeight - footerTop + 12);
            setMobileButtonBottom(baseBottom + overlap);
        };

        updateButtonOffset();
        window.addEventListener('scroll', updateButtonOffset, { passive: true });
        window.addEventListener('resize', updateButtonOffset);

        return () => {
            window.removeEventListener('scroll', updateButtonOffset);
            window.removeEventListener('resize', updateButtonOffset);
        };
    }, []);

    const scrollToHeading = (headingId: string) => {
        const target = document.getElementById(headingId);
        if (!target) {
            return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${headingId}`);
    };

    return {
        activeId,
        hasEnoughHeadings,
        items,
        isMobileOpen,
        mobileButtonBottom,
        desktopLinkRefs,
        desktopNavRef,
        mobileLinkRefs,
        mobileNavRef,
        scrollToHeading,
        setIsMobileOpen,
    };
};

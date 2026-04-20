import React from 'react';
import DesktopTableOfContents from './DesktopTableOfContents';
import MobileTableOfContentsDrawer from './MobileTableOfContentsDrawer';
import { DEFAULT_SELECTOR, type TableOfContentProps } from './types';
import { useTableOfContents } from './useTableOfContents';

const TableOfContent: React.FC<TableOfContentProps> = ({ content, selector = DEFAULT_SELECTOR }) => {
    const {
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
    } = useTableOfContents({ content, selector });

    if (!hasEnoughHeadings) {
        return null;
    }

    return (
        <>
            <DesktopTableOfContents
                activeId={activeId}
                items={items}
                navRef={desktopNavRef}
                linkRefs={desktopLinkRefs}
                onNavigate={scrollToHeading}
            />
            <MobileTableOfContentsDrawer
                activeId={activeId}
                items={items}
                isOpen={isMobileOpen}
                buttonBottom={mobileButtonBottom}
                navRef={mobileNavRef}
                linkRefs={mobileLinkRefs}
                onOpen={() => setIsMobileOpen(true)}
                onClose={() => setIsMobileOpen(false)}
                onNavigate={scrollToHeading}
            />
        </>
    );
};

export default TableOfContent;

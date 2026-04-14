import React from 'react';

interface AllPostsSummaryProps {
    postsCount: number;
    shownCount: number;
    activeFilterCount: number;
}

const AllPostsSummary: React.FC<AllPostsSummaryProps> = ({ postsCount, shownCount, activeFilterCount }) => {
    return (
        <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-full border border-muted/10 bg-surface px-4 py-2 text-sm text-muted shadow-sm">
                <span className="font-semibold text-text">{postsCount}</span> total posts
            </div>
            <div className="rounded-full border border-muted/10 bg-surface px-4 py-2 text-sm text-muted shadow-sm">
                <span className="font-semibold text-text">{shownCount}</span> shown
            </div>
            {activeFilterCount > 0 && (
                <div className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary shadow-sm">
                    <span className="font-semibold">{activeFilterCount}</span> active filter{activeFilterCount !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};

export default AllPostsSummary;

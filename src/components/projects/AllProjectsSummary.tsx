import React from 'react';

interface AllProjectsSummaryProps {
    projectsCount: number;
    shownCount: number;
    activeFilterCount: number;
}

const AllProjectsSummary: React.FC<AllProjectsSummaryProps> = ({
    projectsCount,
    shownCount,
    activeFilterCount,
}) => {
    return (
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full border border-muted/15 bg-surface px-4 py-2">
                {projectsCount} projects
            </span>
            <span className="rounded-full border border-muted/15 bg-surface px-4 py-2">
                {shownCount} shown
            </span>
            <span className="rounded-full border border-muted/15 bg-surface px-4 py-2">
                {activeFilterCount} active filters
            </span>
        </div>
    );
};

export default AllProjectsSummary;

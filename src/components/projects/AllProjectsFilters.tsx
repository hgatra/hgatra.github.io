import React from 'react';

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

interface AllProjectsFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortBy: SortOption;
    setSortBy: (value: SortOption) => void;
    resetFilters: () => void;
    allTechStacks: string[];
    selectedTechStacks: string[];
    toggleTechStack: (techStack: string) => void;
    clearTechStackSelection: () => void;
}

const AllProjectsFilters: React.FC<AllProjectsFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    resetFilters,
    allTechStacks,
    selectedTechStacks,
    toggleTechStack,
    clearTechStackSelection,
}) => {
    return (
        <div className="mt-10 rounded-3xl border border-muted/10 bg-surface p-6 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr_auto] lg:items-end">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-text">Search</span>
                    <div className="relative">
                        <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search by project name, description, or stack..."
                            className="w-full rounded-2xl border border-muted/15 bg-background py-3 pl-12 pr-4 text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                    </div>
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-text">Sort</span>
                    <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value as SortOption)}
                        className="w-full rounded-2xl border border-muted/15 bg-background px-4 py-3 text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="name-asc">Name A - Z</option>
                        <option value="name-desc">Name Z - A</option>
                    </select>
                </label>

                <button
                    type="button"
                    onClick={resetFilters}
                    className="h-fit rounded-full border border-muted/20 px-4 py-3 text-sm font-medium text-text transition hover:border-primary/40 hover:text-primary"
                >
                    Reset
                </button>
            </div>

            <div className="mt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-text">Tech stack</h2>
                        <p className="text-sm text-muted">Choose one or more stacks to filter the projects.</p>
                    </div>
                    {selectedTechStacks.length > 0 && (
                        <button
                            type="button"
                            onClick={clearTechStackSelection}
                            className="rounded-full border border-muted/20 px-3 py-1 text-sm text-text transition hover:border-primary/40 hover:text-primary"
                        >
                            Clear selection
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-3">
                    {allTechStacks.map((techStack) => {
                        const isActive = selectedTechStacks.includes(techStack);

                        return (
                            <button
                                key={techStack}
                                type="button"
                                onClick={() => toggleTechStack(techStack)}
                                aria-pressed={isActive}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isActive
                                    ? 'border-primary bg-primary text-white shadow-sm'
                                    : 'border-muted/20 bg-background text-text hover:border-primary/40 hover:text-primary'
                                    }`}
                            >
                                {techStack}
                            </button>
                        );
                    })}
                </div>

                {(searchTerm.trim().length > 0 || selectedTechStacks.length > 0) && (
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
                        <span>Active filters:</span>
                        {searchTerm.trim().length > 0 && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="rounded-full bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary/15"
                            >
                                Search: {searchTerm}
                            </button>
                        )}
                        {selectedTechStacks.map((techStack) => (
                            <button
                                key={techStack}
                                type="button"
                                onClick={() => toggleTechStack(techStack)}
                                className="rounded-full bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary/15"
                            >
                                {techStack}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProjectsFilters;

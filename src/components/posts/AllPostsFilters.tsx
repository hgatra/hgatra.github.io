import React from 'react';

export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

interface AllPostsFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    resetFilters: () => void;
    selectedTags: string[];
    allTags: string[];
    toggleTag: (tag: string) => void;
}

const AllPostsFilters: React.FC<AllPostsFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    resetFilters,
    selectedTags,
    allTags,
    toggleTag,
}) => {
    return (
        <div className="space-y-6 rounded-3xl border border-muted/10 bg-surface p-6 shadow-sm">
            {/* Search Input */}
            <div className="relative">
                <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search by title, tags, or content..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    className="w-full rounded-full border border-muted/20 bg-background pl-12 pr-4 py-3 text-text placeholder-muted/50 transition focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
            </div>

            {/* Sort Dropdown */}
            <div>
                <label className="mb-3 block text-sm font-semibold text-text">Sort by</label>
                <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.currentTarget.value as SortOption)}
                    className="w-full rounded-xl border border-muted/20 bg-background px-4 py-3 text-text transition focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title-asc">Title A - Z</option>
                    <option value="title-desc">Title Z - A</option>
                </select>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
                <div>
                    <label className="mb-3 block text-sm font-semibold text-text">Filter by tags</label>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedTags.includes(tag)
                                        ? 'bg-primary text-white'
                                        : 'border border-muted/20 bg-background text-text hover:border-primary/50'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Filters Display */}
            {(searchTerm.trim().length > 0 || selectedTags.length > 0) && (
                <div className="space-y-3 border-t border-muted/10 pt-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-text">Active filters</p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="text-sm text-primary hover:underline transition"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {searchTerm.trim().length > 0 && (
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2">
                                <span className="text-sm text-primary">Search: {searchTerm}</span>
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="text-primary hover:opacity-70 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        {selectedTags.map((tag) => (
                            <div key={tag} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2">
                                <span className="text-sm text-primary">{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className="text-primary hover:opacity-70 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reset Button */}
            <button
                type="button"
                onClick={resetFilters}
                disabled={searchTerm.trim().length === 0 && selectedTags.length === 0 && sortBy === 'newest'}
                className="w-full rounded-full border border-muted/20 bg-background px-4 py-3 text-sm font-semibold text-text transition hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Reset filters
            </button>
        </div>
    );
};

export default AllPostsFilters;

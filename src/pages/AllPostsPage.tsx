import React, { useEffect, useState } from 'react';
import { useAllPosts } from '@/hooks/useAllPosts';
import { useAllTags } from '@/hooks/useAllTags';
import PostCard from '@/components/PostCard';
import AllPostsFilters, { type SortOption } from '@/components/posts/AllPostsFilters';
import AllPostsSummary from '@/components/posts/AllPostsSummary';
import type { Post } from '@/types';

const AllPostsPage: React.FC = () => {
  const PAGE_SIZE = 12;

  const tagsQuery = useAllTags();
  const allTags: string[] = tagsQuery.data?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const postsQuery = useAllPosts({
    tags: selectedTags,
    search: searchTerm,
    sortBy,
    limit: PAGE_SIZE,
    offset,
  });
  const posts: Post[] = postsQuery.data?.data || [];
  const filteredPosts = posts;
  const totalPosts = postsQuery.data?.pagination?.total ?? posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortBy('newest');
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTags, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const activeFilterCount = selectedTags.length + (searchTerm.trim().length > 0 ? 1 : 0);

  const isLoading = postsQuery.isLoading;
  const isError = postsQuery.isError;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <h1 className="mt-5 text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            All Posts
          </h1>

          {!isLoading && !isError && (
            <AllPostsSummary
              postsCount={totalPosts}
              shownCount={filteredPosts.length}
              activeFilterCount={activeFilterCount}
            />
          )}
        </div>

        <AllPostsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          allTags={allTags}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />

        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div key={`all-posts-skeleton-${index}`} className="overflow-hidden rounded-2xl border border-muted/20 bg-surface shadow-sm animate-pulse">
                  <div className="aspect-[2/1] w-full bg-muted/20" />
                  <div className="p-6">
                    <div className="mb-4 h-3 w-2/3 rounded bg-muted/20" />
                    <div className="mb-2 h-5 w-11/12 rounded bg-muted/20" />
                    <div className="mb-2 h-5 w-3/4 rounded bg-muted/20" />
                    <div className="mt-4 h-4 w-full rounded bg-muted/20" />
                    <div className="mt-2 h-4 w-5/6 rounded bg-muted/20" />
                    <div className="mt-2 h-4 w-2/3 rounded bg-muted/20" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-3xl border border-dashed border-muted/20 bg-surface p-12 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-text">Failed to load posts</h2>
              <p className="mt-3 text-muted">
                There was an error fetching the posts. Please try again later.
              </p>
              <button
                type="button"
                onClick={() => postsQuery.refetch()}
                className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try again
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-muted/20 bg-surface p-12 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-text">No posts match your filters</h2>
              <p className="mt-3 text-muted">
                Try removing one filter or clear everything to see the full archive.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {!isLoading && !isError && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-muted/10 bg-surface px-6 py-5 text-sm text-muted shadow-sm">
            <p>
              Showing <span className="font-semibold text-text">{filteredPosts.length}</span> of <span className="font-semibold text-text">{totalPosts}</span> posts
            </p>
            <p>
              Page <span className="font-semibold text-text">{currentPage}</span> / <span className="font-semibold text-text">{totalPages}</span>
            </p>
          </div>
        )}

        {!isLoading && !isError && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-muted/20 bg-background px-4 py-2 text-sm font-semibold text-text transition hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm text-muted">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-muted/20 bg-background px-4 py-2 text-sm font-semibold text-text transition hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPostsPage;

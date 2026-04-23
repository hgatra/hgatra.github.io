import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePost } from '@/hooks/usePost';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContent from '@/components/table-of-contents/TableOfContent';
import { formatPostDate } from '@/utils/date';
import { calculateReadTime } from '@/utils/text';
import '@/styles/markdown.css';

const PostPage: React.FC = () => {
  const { slug } = useParams();
  const postQuery = usePost(slug || '');
  const post = postQuery.data?.data;

  if (postQuery.isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-6 h-5 w-36 rounded bg-muted/20" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <article className="overflow-hidden rounded-3xl border border-muted/10 bg-surface shadow-sm">
              <header className="border-b border-muted/10 px-6 py-10 md:px-10">
                <div className="h-10 w-5/6 rounded bg-muted/20 md:h-12" />
                <div className="mt-5 h-4 w-56 rounded bg-muted/20" />
                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="h-6 w-16 rounded-full bg-muted/20" />
                  <div className="h-6 w-20 rounded-full bg-muted/20" />
                  <div className="h-6 w-14 rounded-full bg-muted/20" />
                </div>
              </header>

              <div className="space-y-4 px-6 py-8 md:px-10">
                <div className="h-4 w-full rounded bg-muted/20" />
                <div className="h-4 w-full rounded bg-muted/20" />
                <div className="h-4 w-11/12 rounded bg-muted/20" />
                <div className="h-4 w-full rounded bg-muted/20" />
                <div className="h-4 w-5/6 rounded bg-muted/20" />
                <div className="h-4 w-full rounded bg-muted/20" />
                <div className="h-4 w-10/12 rounded bg-muted/20" />
              </div>
            </article>

            <aside className="hidden overflow-hidden rounded-2xl border border-muted/10 bg-surface p-5 shadow-sm lg:block">
              <div className="mb-4 h-5 w-2/3 rounded bg-muted/20" />
              <div className="space-y-3">
                <div className="h-3 w-full rounded bg-muted/20" />
                <div className="h-3 w-5/6 rounded bg-muted/20" />
                <div className="h-3 w-4/5 rounded bg-muted/20" />
                <div className="h-3 w-11/12 rounded bg-muted/20" />
                <div className="h-3 w-3/4 rounded bg-muted/20" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (postQuery.isError) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-dashed border-muted/20 bg-surface p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-text">Failed to load post</h1>
          <p className="mt-3 text-muted">Please try again later.</p>
          <button
            type="button"
            onClick={() => postQuery.refetch()}
            className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-muted/10 bg-surface p-10 text-center shadow-sm">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Post Not Found
          </p>
          <h1 className="mt-5 text-3xl font-bold text-text">This post does not exist.</h1>
          <p className="mt-3 text-muted">Check the URL or go back to the posts page.</p>
          <Link
            to="/posts"
            className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to posts
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="overflow-hidden rounded-3xl border border-muted/10 bg-surface shadow-sm">
            <header className="border-b border-muted/10 px-6 py-10 md:px-10" style={{ backgroundImage: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(249,115,22,0.08))' }}>
              <h1 className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>{formatPostDate(post.createdAt)}</span>
                <span>•</span>
                <span>{calculateReadTime(post.content)}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="px-6 py-8 md:px-10">
              {post.content && <MarkdownRenderer content={post.content} />}
            </div>
          </article>

          <aside
            className="lg:self-start"
            style={{ position: 'sticky', top: '7rem', alignSelf: 'start' }}
          >
            {post.content && <TableOfContent content={post.content} />}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

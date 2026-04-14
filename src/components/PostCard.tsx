import type { Post } from '@/types';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPostDate } from '@/utils/date';
import { getPostCoverImageByTags } from '@/utils/post';
import { calculateReadTime, getExcerpt } from '@/utils/text';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface border border-muted/20 shadow-sm transition-all hover:shadow-md hover:border-secondary/50 h-full">
      <div className="aspect-[2/1] w-full bg-muted/10 overflow-hidden">
        <img
          src={getPostCoverImageByTags(post.tags)}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted mb-3">
          <span>{formatPostDate(post.createdAt)}</span>
          <span>•</span>
          <span>{calculateReadTime(post.content)}</span>
        </div>
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-secondary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted text-sm line-clamp-3 flex-1">
          {getExcerpt(post.content)}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;

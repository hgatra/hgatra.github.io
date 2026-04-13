import React from 'react';
import type { Project } from '@/types';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link
      // remove not a-z 0-9 character and replace space with dash
      to={`/projects/${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface border border-muted/20 shadow-sm transition-all hover:shadow-md hover:border-primary/50 h-full">
      <div className="aspect-video w-full bg-muted/10 overflow-hidden">
        {project.imageUrls && project.imageUrls.length > 0 ? (
          <img
            src={project.imageUrls[0]}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-muted text-sm mb-4 line-clamp-3 flex-1">
          {project.description || "No description available."}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags && project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProjectImageGallery from '@/components/projects/ProjectImageGallery';
import ProjectMetaSidebar from '@/components/projects/ProjectMetaSidebar';
import projectData from '@/data/allprojects.json';
import type { Project } from '@/types';

const createSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

const formatProjectDate = (dateString: string) => {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? dateString : dateFormatter.format(date);
};

const ProjectPage: React.FC = () => {
  const { slug } = useParams();
  const projects = projectData as Project[];

  const project = useMemo(
    () => projects.find((item) => createSlug(item.name) === slug),
    [projects, slug]
  );

  if (!project) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-muted/10 bg-surface p-8 md:p-12 shadow-sm text-center">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Project Not Found
          </p>
          <h1 className="mt-5 text-3xl md:text-4xl font-bold text-text">
            This project does not exist or the URL is invalid.
          </h1>
          <p className="mt-4 text-muted">
            Check the URL slug or return to the projects list and choose a project again.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Back to all projects
            </Link>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-muted/20 px-5 py-3 text-sm font-semibold text-text transition hover:border-primary/40 hover:text-primary"
            >
              Go to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>
        </div>

        <section className="overflow-hidden rounded-3xl border border-muted/10 bg-surface shadow-sm">
          <div
            className="relative border-b border-muted/10 px-6 py-10 md:px-10"
            style={{ backgroundImage: 'linear-gradient(135deg, rgba(37,99,235,0.10), rgba(249,115,22,0.08))' }}
          >
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              {project.name}
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg text-muted leading-relaxed">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full border border-muted/15 bg-background/70 px-4 py-2">
                {formatProjectDate(project.startDate)} - {formatProjectDate(project.endDate)}
              </span>
              <span className="rounded-full border border-muted/15 bg-background/70 px-4 py-2">
                {project.techStacks.length} tech stack(s)
              </span>
              <span className="rounded-full border border-muted/15 bg-background/70 px-4 py-2">
                {project.tags.length} tag(s)
              </span>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.25fr_0.75fr]">
            <ProjectImageGallery
              projectName={project.name}
              imageUrls={project.imageUrls || []}
              resetKey={slug || project.name}
            />

            <ProjectMetaSidebar project={project} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;

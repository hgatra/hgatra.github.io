import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slidePhase, setSlidePhase] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const transitionTimeoutRef = useRef<number | null>(null);

  const project = useMemo(
    () => projects.find((item) => createSlug(item.name) === slug),
    [projects, slug]
  );

  useEffect(() => {
    setCurrentImageIndex(0);
    setSlidePhase('idle');
  }, [slug]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

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

  const hasLiveUrl = Boolean(project.projectUrl);
  const hasGithubUrl = Boolean(project.githubUrl);
  const imageUrls = project.imageUrls || [];
  const hasImages = imageUrls.length > 0;

  const transitionToImage = (nextIndex: number, direction: 'next' | 'prev') => {
    if (nextIndex === currentImageIndex || slidePhase !== 'idle') {
      return;
    }

    setSlideDirection(direction);
    setSlidePhase('leaving');

    transitionTimeoutRef.current = window.setTimeout(() => {
      setCurrentImageIndex(nextIndex);
      setSlidePhase('entering');

      transitionTimeoutRef.current = window.setTimeout(() => {
        setSlidePhase('idle');
      }, 30);
    }, 180);
  };

  const showNextImage = () => {
    if (imageUrls.length === 0) {
      return;
    }

    transitionToImage((currentImageIndex + 1) % imageUrls.length, 'next');
  };

  const showPreviousImage = () => {
    if (imageUrls.length === 0) {
      return;
    }

    transitionToImage((currentImageIndex - 1 + imageUrls.length) % imageUrls.length, 'prev');
  };

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
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Project Details
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
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
            <div>
              {hasImages ? (
                <div className="space-y-4">
                  <div className="relative h-[300px] overflow-hidden rounded-2xl border border-muted/10 bg-muted/10 sm:h-[360px] lg:h-[460px]">
                    <img
                      src={imageUrls[currentImageIndex]}
                      alt={`${project.name} preview`}
                      className={`h-full w-full object-cover transition-all duration-300 ease-out ${
                        slidePhase === 'leaving'
                          ? slideDirection === 'next'
                            ? '-translate-x-6 opacity-0'
                            : 'translate-x-6 opacity-0'
                          : slidePhase === 'entering'
                            ? slideDirection === 'next'
                              ? 'translate-x-6 opacity-0'
                              : '-translate-x-6 opacity-0'
                            : 'translate-x-0 opacity-100'
                      }`}
                    />

                    {imageUrls.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPreviousImage}
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-2 text-white transition hover:bg-black/60"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={showNextImage}
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-2 text-white transition hover:bg-black/60"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-1">
                          {imageUrls.map((imageUrl, index) => (
                            <button
                              key={imageUrl}
                              type="button"
                              onClick={() => transitionToImage(index, index > currentImageIndex ? 'next' : 'prev')}
                              aria-label={`Go to image ${index + 1}`}
                              className={`h-2.5 w-2.5 rounded-full transition ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {imageUrls.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {imageUrls.map((imageUrl, index) => (
                        <button
                          key={imageUrl}
                          type="button"
                          onClick={() => transitionToImage(index, index > currentImageIndex ? 'next' : 'prev')}
                          className={`h-20 overflow-hidden rounded-xl border bg-muted/10 transition ${
                            index === currentImageIndex
                              ? 'border-primary shadow-sm'
                              : 'border-muted/10 hover:border-primary/40'
                          }`}
                        >
                          <img src={imageUrl} alt={`${project.name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-muted/20 bg-muted/5 text-center text-muted sm:h-[360px] lg:h-[460px]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]">No Preview</p>
                    <p className="mt-2 text-sm">Project screenshots are not available yet.</p>
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-muted/10 bg-background/40 p-5">
                <h2 className="text-lg font-bold text-text">Links</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {hasLiveUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Open live project
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full bg-muted/10 px-4 py-2 text-sm font-semibold text-muted">
                      Live project unavailable
                    </span>
                  )}

                  {hasGithubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-muted/20 px-4 py-2 text-sm font-semibold text-text transition hover:border-primary/40 hover:text-primary"
                    >
                      Open GitHub repository
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full border border-muted/10 px-4 py-2 text-sm font-semibold text-muted">
                      GitHub repository unavailable
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-muted/10 bg-background/40 p-5">
                <h2 className="text-lg font-bold text-text">Tech Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStacks.map((techStack) => (
                    <span key={techStack} className="rounded-full border border-muted/15 bg-background px-3 py-1 text-xs text-muted">
                      {techStack}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-muted/10 bg-background/40 p-5">
                <h2 className="text-lg font-bold text-text">Tags</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;

import React, { useMemo, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import projectData from '@/data/allprojects.json';
import type { Project } from '@/types';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

const AllProjectsPage: React.FC = () => {
  const projects = projectData as Project[];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const allTechStacks = useMemo(() => {
    return [...new Set(projects.flatMap((project) => project.techStacks || []))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return [...projects]
      .filter((project) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          [project.name, project.description, ...(project.techStacks || [])]
            .join(' ')
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesTechStacks =
          selectedTechStacks.length === 0 ||
          selectedTechStacks.every((techStack) => (project.techStacks || []).includes(techStack));

        return matchesSearch && matchesTechStacks;
      })
      .sort((firstProject, secondProject) => {
        const firstTime = new Date(firstProject.startDate).getTime();
        const secondTime = new Date(secondProject.startDate).getTime();

        switch (sortBy) {
          case 'oldest':
            return firstTime - secondTime;
          case 'name-asc':
            return firstProject.name.localeCompare(secondProject.name);
          case 'name-desc':
            return secondProject.name.localeCompare(firstProject.name);
          case 'newest':
          default:
            return secondTime - firstTime;
        }
      });
  }, [projects, searchTerm, selectedTechStacks, sortBy]);

  const toggleTechStack = (techStack: string) => {
    setSelectedTechStacks((currentTechStacks) =>
      currentTechStacks.includes(techStack)
        ? currentTechStacks.filter((currentTechStack) => currentTechStack !== techStack)
        : [...currentTechStacks, techStack]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTechStacks([]);
    setSortBy('newest');
  };

  const activeFilterCount = selectedTechStacks.length + (searchTerm.trim().length > 0 ? 1 : 0);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <h1 className="mt-5 text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            All Projects
          </h1>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full border border-muted/15 bg-surface px-4 py-2">
              {projects.length} projects
            </span>
            <span className="rounded-full border border-muted/15 bg-surface px-4 py-2">
              {filteredProjects.length} shown
            </span>
            <span className="rounded-full border border-muted/15 bg-surface px-4 py-2">
              {activeFilterCount} active filters
            </span>
          </div>
        </div>

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
                  onClick={() => setSelectedTechStacks([])}
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

        <div className="mt-10">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-muted/20 bg-surface p-12 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-text">No projects match your filters</h2>
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-muted/10 bg-surface px-6 py-5 text-sm text-muted shadow-sm">
          <p>
            Showing <span className="font-semibold text-text">{filteredProjects.length}</span> of <span className="font-semibold text-text">{projects.length}</span> projects
          </p>
          <p>
            Sort order: <span className="font-semibold text-text">{sortBy.replace('-', ' ')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;

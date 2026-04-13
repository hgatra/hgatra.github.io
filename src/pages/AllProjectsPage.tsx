import React, { useMemo, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import AllProjectsFilters, { type SortOption } from '@/components/projects/AllProjectsFilters';
import AllProjectsSummary from '@/components/projects/AllProjectsSummary';
import projectData from '@/data/allprojects.json';
import type { Project } from '@/types';

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

          <AllProjectsSummary
            projectsCount={projects.length}
            shownCount={filteredProjects.length}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <AllProjectsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          allTechStacks={allTechStacks}
          selectedTechStacks={selectedTechStacks}
          toggleTechStack={toggleTechStack}
          clearTechStackSelection={() => setSelectedTechStacks([])}
        />

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

import React from 'react';
import type { Project } from '@/types';

interface ProjectMetaSidebarProps {
    project: Project;
}

const ProjectMetaSidebar: React.FC<ProjectMetaSidebarProps> = ({ project }) => {
    const hasLiveUrl = Boolean(project.projectUrl);
    const hasGithubUrl = Boolean(project.githubUrl);

    return (
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
    );
};

export default ProjectMetaSidebar;

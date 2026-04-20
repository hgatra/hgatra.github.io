import React, { useEffect, useState } from 'react';
import GraduationCap from '/assets/icons/solid-graduation-cap.svg';
import Briefcase from '/assets/icons/solid-briefcase.svg';
import Handshake from '/assets/icons/solid-handshake.svg';
import experienceData from '@/data/experiences.json';

interface Achievement {
    name: string;
    issuer: string;
    issueDate: string;
    description?: string;
    credentialUrl?: string;
    fileUrl?: string;
}

const ExperiencePage: React.FC = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const sortedExperience = [...experienceData].sort((a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    useEffect(() => {
        if (!selectedAchievement) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedAchievement(null);
            }
        };

        window.addEventListener('keydown', onEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onEscape);
        };
    }, [selectedAchievement]);

    return (
        <div className="min-h-screen pt-40 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                        My Journey
                    </h1>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        A timeline of my professional experience, education, and volunteering activities.
                    </p>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-8"></div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted/20"></div>

                    <div className="space-y-12">
                        {sortedExperience.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-4 border-surface shadow-sm z-10 flex items-center justify-center mt-1.5">
                                    {(() => {
                                        switch (exp.type?.toLowerCase()) {
                                            case 'learning': return <img src={GraduationCap} alt="Learning" className="w-5 h-5 brightness-0 invert" />;
                                            case 'working': return <img src={Briefcase} alt="Working" className="w-5 h-5 brightness-0 invert" />;
                                            case 'volunteering': return <img src={Handshake} alt="Volunteering" className="w-5 h-5 brightness-0 invert" />;
                                            default: return <img src={Briefcase} alt="Working" className="w-5 h-5 brightness-0 invert" />;
                                        }
                                    })()}
                                </div>

                                {/* Content */}
                                <div className="flex-1 md:w-1/2 pl-8 md:pl-0">
                                    <div className={`bg-surface p-6 rounded-2xl border border-muted/10 shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                                                {exp.startDate} - {exp.endDate}
                                            </span>
                                            <h3 className="text-xl font-bold text-text">{exp.position}</h3>
                                            <a
                                                href={exp.companyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg text-secondary font-medium mb-1 hover:underline inline-block"
                                            >
                                                {exp.company}
                                            </a>
                                            <p className="text-muted/80 text-sm mb-4 italic flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {exp.location}
                                            </p>
                                            <p className="text-muted text-sm leading-relaxed mb-4">
                                                {exp.description}
                                            </p>
                                            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'}`}>
                                                {exp.technologies.map((tech) => (
                                                    <span key={tech} className="text-xs text-muted bg-muted/5 px-2 py-1 rounded border border-muted/10">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {exp.achievements?.length > 0 && (
                                                <div className="mt-5 w-full rounded-xl border border-primary/20 bg-primary/5 p-4">
                                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                                                        Achievements
                                                    </p>
                                                    <div className="space-y-3">
                                                        {exp.achievements.map((achievement) => (
                                                            <button
                                                                key={`${achievement.name}-${achievement.issueDate}`}
                                                                type="button"
                                                                onClick={() => setSelectedAchievement(achievement as Achievement)}
                                                                className="w-full rounded-lg border border-muted/15 bg-surface/70 p-3 text-left transition hover:border-primary/30 hover:bg-primary/5"
                                                            >
                                                                <p className="text-sm font-semibold text-text">{achievement.name}</p>
                                                                <p className="mt-1 text-xs text-muted">
                                                                    {achievement.issuer} • {achievement.issueDate}
                                                                </p>
                                                                <p className="mt-2 text-xs font-medium text-primary">View details</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty space for the other side */}
                                <div className="hidden md:block flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedAchievement && (
                <div className="fixed inset-0 z-[2000]">
                    <button
                        type="button"
                        aria-label="Close achievement details"
                        className="absolute inset-0 bg-black/55"
                        onClick={() => setSelectedAchievement(null)}
                    />

                    <div className="relative z-10 mx-auto mt-10 max-h-[calc(100vh-5rem)] w-[min(860px,92vw)] overflow-y-auto rounded-2xl border border-muted/20 bg-surface p-6 shadow-2xl md:p-8">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Achievement</p>
                                <h2 className="mt-2 text-2xl font-bold text-text md:text-3xl">{selectedAchievement.name}</h2>
                                <p className="mt-2 text-sm text-muted">
                                    {selectedAchievement.issuer} • {selectedAchievement.issueDate}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedAchievement(null)}
                                className="rounded-lg border border-muted/20 px-3 py-1.5 text-sm text-muted transition hover:bg-muted/10"
                            >
                                Close
                            </button>
                        </div>

                        {selectedAchievement.fileUrl && (
                            <img
                                src={selectedAchievement.fileUrl}
                                alt={selectedAchievement.name}
                                className="mb-5 max-h-[50vh] w-full rounded-xl border border-muted/15 object-contain bg-muted/5"
                            />
                        )}

                        {selectedAchievement.description && (
                            <p className="text-sm leading-relaxed text-muted md:text-base">{selectedAchievement.description}</p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
                            {selectedAchievement.credentialUrl && (
                                <a
                                    href={selectedAchievement.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-primary transition hover:bg-primary/15"
                                >
                                    Open Credential
                                </a>
                            )}
                            {selectedAchievement.fileUrl && (
                                <a
                                    href={selectedAchievement.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-2 text-secondary transition hover:bg-secondary/15"
                                >
                                    Open Attachment
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperiencePage;

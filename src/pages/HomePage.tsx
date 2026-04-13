import React from 'react';
import { Link } from 'react-router-dom';
import GraduationCap from '/assets/icons/solid-graduation-cap.svg';
import Briefcase from '/assets/icons/solid-briefcase.svg';
import Handshake from '/assets/icons/solid-handshake.svg';
import LandingBackground from '@/components/LandingBackground';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import experienceData from '@/data/experiences.json';
import projectsData from '@/data/allprojects.json';
import { useLatestPosts } from '@/hooks/useLatestPosts';
import type { LatestPost } from '@/types';

const HomePage: React.FC = () => {
    const topProjects = projectsData.slice(0, 4);
    const latestPostsQuery = useLatestPosts();
    const latestPosts: LatestPost[] = latestPostsQuery.data?.data || [];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">
                <LandingBackground />
                <HeroSection />

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Experience Path Section */}
            <section className="py-24 bg-surface/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <Link to="/experience" className="group inline-block">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block group-hover:opacity-80 transition-opacity">My Journey</h2>
                            <div className="h-1 w-20 bg-primary mx-auto rounded-full group-hover:w-32 transition-all duration-300"></div>
                        </Link>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted/20"></div>

                        <div className="space-y-12">
                            {[...experienceData].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((exp, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-4 border-surface shadow-sm z-10 flex items-center justify-center">
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
                                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                                                {exp.startDate} - {exp.endDate}
                                            </span>
                                            <h3 className="text-xl font-bold text-text">{exp.position}</h3>
                                            <a
                                                href={exp.companyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg text-secondary font-medium mb-2 hover:underline inline-block"
                                            >
                                                {exp.company}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Empty space for the other side */}
                                    <div className="hidden md:block flex-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Projects Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">Featured Projects</h2>
                            <div className="h-1 w-20 bg-primary rounded-full"></div>
                        </div>
                        <a href="/projects" className="hidden md:flex items-center text-primary font-medium hover:underline">
                            View All Projects
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <a href="/projects" className="inline-flex items-center text-primary font-medium hover:underline">
                            View All Projects
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Top Posts Section */}
            <section className="py-24 bg-surface/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">Latest Posts</h2>
                            <div className="h-1 w-20 bg-secondary rounded-full"></div>
                        </div>
                        <a href="/blog" className="hidden md:flex items-center text-secondary font-medium hover:underline">
                            Read All Posts
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestPosts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <a href="/blog" className="inline-flex items-center text-secondary font-medium hover:underline">
                            Read All Posts
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

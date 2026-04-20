import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileData from '@/data/profile.json';
import skillsData from '@/data/skills.json';
import ProfilePhotoCard from './ProfilePhotoCard';

const HeroSection: React.FC = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const titles = profileData.titles;

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % titles.length;
            const fullText = titles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 100);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, titles, typingSpeed]);

    return (
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 pt-12 pb-24 md:py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10 min-h-[calc(100vh-80px)]">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
                <h2 className="text-2xl font-medium text-muted">Hello, I'm</h2>
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2">
                    {profileData.name}
                </h1>
                <div className="h-8 text-lg md:text-2xl font-semibold text-text flex justify-center md:justify-start items-center gap-1 md:gap-2">
                    <span className="min-w-[60px]">I am a</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{text}</span>
                    <span className="animate-pulse">|</span>
                </div>

                <p className="text-lg text-muted max-w-xl mx-auto md:mx-0 leading-relaxed">
                    {profileData.description}
                </p>

                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-4 pt-2">
                    {profileData.socialUrl.map((social) => (
                        <a
                            key={social.name}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-surface rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all border border-muted/20"
                            title={social.name}
                        >
                            <div
                                className="h-6 w-6 bg-current"
                                style={{
                                    maskImage: `url(${social.icon})`,
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    maskSize: 'contain',
                                    WebkitMaskImage: `url(${social.icon})`,
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    WebkitMaskSize: 'contain'
                                }}
                            />

                        </a>
                    ))}
                </div>

                {/* Skills */}
                <div className="space-y-3 pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Tech Stack</h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {skillsData.map((skill) => (
                            <a
                                key={skill.name}
                                href={skill.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2 bg-surface/50 rounded-lg hover:bg-surface transition-colors"
                            >
                                <img src={skill.logoUrl} alt={skill.name} className="w-8 h-8 hover:scale-110 transition-transform" />
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                    {skill.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* CV Button */}
                <div className="pt-6">
                    <Link
                        to={`/${profileData.cvUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="CV_HoangAnhTra.pdf"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        Get My CV
                    </Link>
                </div>
            </div>

            {/* Right Content - Profile Photo */}
            <div className="flex-1 flex justify-center md:justify-end items-center">
                <ProfilePhotoCard />
            </div>
        </div>
    );
};

export default HeroSection;

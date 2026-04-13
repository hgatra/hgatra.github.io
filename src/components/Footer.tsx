import React from 'react';
import logoLight from '/assets/logo/logo-light.png';
import logoDark from '/assets/logo/logo-dark.png';
import profileData from '@/data/profile.json';
import { Link } from 'react-router-dom';

interface FooterProps {
    darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
    const navItems = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Experience',
            link: '/experience'
        },
        {
            title: 'Projects',
            link: '/projects'
        },
        {
            title: 'Blog',
            link: '/posts'
        }
    ]

    const socialLinks = profileData["socialUrl"];

    return (
        <footer className="w-full border-t border-muted/20 bg-surface/50 backdrop-blur-sm pt-12 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <img src={darkMode ? logoDark : logoLight} alt="Logo" className="h-8 w-auto" />
                            <span className="font-bold text-xl text-text">Tra Hoang</span>
                        </div>
                        <p className="text-muted max-w-lg leading-relaxed">
                            My personal portfolio showcasing my projects, experience, and blog posts about my journey as a developer.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    to={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-110"
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
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigations Column */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-text">Navigation</h3>
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.title}>
                                    <Link to={item.link} className="text-muted hover:text-primary transition-colors text-sm">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-muted/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <p>Built with React + Tailwind CSS (by <span className="text-primary font-medium">Tra Hoang</span>)</p>
                    <p>A personal portfolio from Tra Hoang</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

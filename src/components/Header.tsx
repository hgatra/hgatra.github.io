import React from 'react';
import logoLight from '/assets/logo/logo-light.png';
import logoDark from '/assets/logo/logo-dark.png';
import sunIcon from '/assets/icons/outline-sun.svg';
import moonIcon from '/assets/icons/outline-moon.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme }) => {
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

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
            <div className="flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 bg-surface/60 dark:bg-background/60 border-muted/20 shadow-xl shadow-black/5 dark:shadow-black/40">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 pl-2">
                    <img
                        src={darkMode ? logoDark : logoLight}
                        alt="Tra Hoang Logo"
                        className="h-10 w-auto object-contain"
                    />
                    <span className="font-bold text-lg tracking-tight text-text">
                        Tra Hoang
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            to={`${item.link}`}
                            className="text-sm font-medium transition-colors text-muted hover:text-primary"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3 pr-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-16 items-center rounded-full border px-1 transition-colors cursor-pointer bg-muted/10 border-muted/20">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${darkMode ? 'translate-x-6 bg-background' : 'translate-x-0 bg-surface'}`}>
                            <img
                                src={darkMode ? moonIcon : sunIcon}
                                alt="Theme Icon"
                                className="w-4 h-4"
                                style={{
                                    filter: darkMode
                                        ? 'invert(31%) sepia(96%) saturate(2086%) hue-rotate(202deg) brightness(94%) contrast(96%)'
                                        : 'invert(63%) sepia(44%) saturate(5664%) hue-rotate(346deg) brightness(101%) contrast(96%)'
                                }}
                            />
                        </div>
                    </button>

                    {/* CTA Button */}
                    <button className="hidden sm:block rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 hover:opacity-90 active:scale-95 cursor-pointer" onClick={() => window.location.href = 'mailto:hatra.dev@gmail.com'}>
                        Contact Me
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

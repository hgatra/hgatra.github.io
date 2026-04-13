import React, { useEffect, useRef, useState } from 'react';

interface ProjectImageGalleryProps {
    projectName: string;
    imageUrls: string[];
    resetKey: string;
}

const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
    projectName,
    imageUrls,
    resetKey,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [slidePhase, setSlidePhase] = useState<'idle' | 'leaving' | 'entering'>('idle');
    const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
    const transitionTimeoutRef = useRef<number | null>(null);

    const hasImages = imageUrls.length > 0;

    useEffect(() => {
        setCurrentImageIndex(0);
        setSlidePhase('idle');
        setIsFullscreenOpen(false);
    }, [resetKey]);

    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current !== null) {
                window.clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isFullscreenOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFullscreenOpen(false);
            }

            if (imageUrls.length > 1 && event.key === 'ArrowRight') {
                setCurrentImageIndex((index) => (index + 1) % imageUrls.length);
            }

            if (imageUrls.length > 1 && event.key === 'ArrowLeft') {
                setCurrentImageIndex((index) => (index - 1 + imageUrls.length) % imageUrls.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullscreenOpen, imageUrls.length]);

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
        if (!hasImages) {
            return;
        }

        transitionToImage((currentImageIndex + 1) % imageUrls.length, 'next');
    };

    const showPreviousImage = () => {
        if (!hasImages) {
            return;
        }

        transitionToImage((currentImageIndex - 1 + imageUrls.length) % imageUrls.length, 'prev');
    };

    if (!hasImages) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-muted/20 bg-muted/5 text-center text-muted sm:h-[360px] lg:h-[460px]">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]">No Preview</p>
                    <p className="mt-2 text-sm">Project screenshots are not available yet.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                <div className="relative h-[300px] overflow-hidden rounded-2xl border border-muted/10 bg-muted/10 sm:h-[360px] lg:h-[460px]">
                    <button
                        type="button"
                        onClick={() => setIsFullscreenOpen(true)}
                        className="h-full w-full"
                        aria-label="Open image fullscreen"
                    >
                        <img
                            src={imageUrls[currentImageIndex]}
                            alt={`${projectName} preview`}
                            className={`h-full w-full object-cover transition-all duration-300 ease-out ${slidePhase === 'leaving'
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
                    </button>

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
                                        className={`h-2.5 w-2.5 rounded-full transition ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
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
                                className={`h-20 overflow-hidden rounded-xl border bg-muted/10 transition ${index === currentImageIndex ? 'border-primary shadow-sm' : 'border-muted/10 hover:border-primary/40'}`}
                            >
                                <img src={imageUrl} alt={`${projectName} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isFullscreenOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
                    onClick={() => setIsFullscreenOpen(false)}
                >
                    <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            onClick={() => setIsFullscreenOpen(false)}
                            aria-label="Close fullscreen"
                            className="absolute -top-12 right-0 rounded-full border border-white/30 bg-black/50 p-2 text-white transition hover:bg-black/70"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/20">
                            <img
                                src={imageUrls[currentImageIndex]}
                                alt={`${projectName} fullscreen preview`}
                                className="max-h-[85vh] w-full object-contain"
                            />
                        </div>

                        {imageUrls.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setCurrentImageIndex((index) => (index - 1 + imageUrls.length) % imageUrls.length)}
                                    aria-label="Previous fullscreen image"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-3 text-white transition hover:bg-black/60"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setCurrentImageIndex((index) => (index + 1) % imageUrls.length)}
                                    aria-label="Next fullscreen image"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-3 text-white transition hover:bg-black/60"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectImageGallery;

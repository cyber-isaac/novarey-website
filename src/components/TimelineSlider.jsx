import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronUp, ChevronDown, Maximize2 } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Default timeline events - customize these!
const DEFAULT_EVENTS = [
    {
        id: 1,
        year: '2018',
        title: 'The Beginning',
        description: 'Started my journey in design and development, learning the fundamentals of visual communication and user experience.',
        image: '/timeline/2018.png',
        type: 'image'
    },
    {
        id: 2,
        year: '2019',
        title: 'First Major Project',
        description: 'Completed my first large-scale project, delivering a complete brand identity and web presence for a tech startup.',
        image: '/timeline/2019.png',
        type: 'image'
    },
    {
        id: 3,
        year: '2020',
        title: 'Going Full Stack',
        description: 'Expanded into full-stack development, combining design expertise with technical implementation skills.',
        image: '/timeline/2020.png',
        type: 'image'
    },
    {
        id: 4,
        year: '2021',
        title: 'Agency Launch',
        description: 'Launched Novarey Ventures, bringing together design, development, and strategic consulting services.',
        image: '/timeline/2021.png',
        type: 'image'
    },
    {
        id: 5,
        year: '2022',
        title: 'AI Integration',
        description: 'Pioneered AI-augmented design workflows, dramatically increasing output quality and efficiency.',
        image: '/timeline/2022.png',
        type: 'image'
    },
    {
        id: 6,
        year: '2023',
        title: 'Global Reach',
        description: 'Expanded services globally, working with clients across multiple continents and industries.',
        image: '/timeline/2023.png',
        type: 'image'
    }
];

const TimelineSlider = ({ events = DEFAULT_EVENTS, title = "My Journey" }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedVideo, setExpandedVideo] = useState(null);
    const swiperRef = useRef(null);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const goToSlide = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    return (
        <section className="relative w-full">
            {/* Section Title */}
            {title && (
                <div className="text-center py-8 px-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                        {title}
                    </h2>
                </div>
            )}

            <div className="timeline-container relative w-full">
                {/* Main Timeline - Full Width */}
                <div className="relative overflow-hidden">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        direction="vertical"
                        slidesPerView={1}
                        speed={1200}
                        loop={false}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={handleSlideChange}
                        breakpoints={{
                            768: {
                                direction: 'horizontal',
                            },
                        }}
                        className="h-[calc(100vh-200px)] min-h-[500px]"
                    >
                        {events.map((event, index) => (
                            <SwiperSlide key={event.id || index}>
                                <div className="relative w-full h-full">
                                    {/* Background Image or Video */}
                                    {event.type === 'video' && event.videoSrc ? (
                                        <div className="absolute inset-0">
                                            <iframe
                                                title={event.title}
                                                src={event.videoSrc}
                                                className="w-full h-full border-none object-cover"
                                                loading="lazy"
                                                referrerPolicy="origin"
                                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                            />
                                            {/* Expand button */}
                                            <button
                                                onClick={() => setExpandedVideo(event)}
                                                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-orange-500/30 hover:border-orange-400 transition-all"
                                            >
                                                <Maximize2 className="w-5 h-5 text-white" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                            style={{ backgroundImage: `url(${event.image})` }}
                                        />
                                    )}

                                    {/* Dark overlay with gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent md:bg-gradient-to-l md:from-transparent md:via-black/60 md:to-black/90" />

                                    {/* Circular shadow effect */}
                                    <div className="absolute hidden md:block right-[-20%] bottom-[-12%] w-[240px] h-[50%] bg-black/70 rounded-full shadow-[−230px_0_150px_39vw_rgba(0,0,0,0.7)]" />

                                    {/* Content */}
                                    <div className={`absolute z-10 w-[85%] max-w-[350px] p-6 transition-all duration-700 ease-out
                                        ${activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
                                        top-[10%] left-1/2 -translate-x-1/2 text-center
                                        md:top-1/2 md:-translate-y-1/2 md:left-[8%] md:translate-x-0 md:text-left
                                    `}>
                                        {/* Year */}
                                        <span
                                            className={`block text-4xl md:text-5xl font-light italic text-orange-400 mb-4 transition-all duration-500 delay-200
                                                ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                                            `}
                                        >
                                            {event.year}
                                        </span>

                                        {/* Title */}
                                        <h3
                                            className={`text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4 transition-all duration-500 delay-300
                                                ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                                            `}
                                        >
                                            {event.title}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className={`text-sm md:text-base text-white/70 leading-relaxed transition-all duration-500 delay-400
                                                ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                                            `}
                                        >
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows - Mobile (top/bottom) & Desktop (right side vertical) */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute top-4 left-1/2 -translate-x-1/2 md:top-[15%] md:right-[8%] md:left-auto md:translate-x-0 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-orange-500/20 hover:border-orange-400 transition-all group"
                    >
                        <ChevronUp className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-[15%] md:right-[8%] md:left-auto md:translate-x-0 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-orange-500/20 hover:border-orange-400 transition-all group"
                    >
                        <ChevronDown className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Year Pagination - Desktop only */}
                    <div className="hidden md:flex absolute right-[12%] top-0 h-full flex-col justify-center items-end z-10">
                        {/* Vertical line */}
                        <div className="absolute left-[-20px] top-[20%] h-[60%] w-px bg-white/20" />

                        {events.map((event, index) => (
                            <button
                                key={event.id || index}
                                onClick={() => goToSlide(index)}
                                className={`relative my-3 text-lg font-light italic transition-all duration-300 ${activeIndex === index
                                    ? 'text-orange-400 scale-110'
                                    : 'text-white/40 hover:text-white/70'
                                    }`}
                            >
                                {/* Dot indicator */}
                                <span
                                    className={`absolute left-[-23px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-orange-400 transition-transform duration-300 ${activeIndex === index ? 'scale-100' : 'scale-0'
                                        }`}
                                />
                                {event.year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Progress Dots */}
                <div className="flex md:hidden justify-center gap-2 mt-6">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                ? 'w-8 bg-orange-500'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Expanded Video Modal */}
            {expandedVideo && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
                    onClick={() => setExpandedVideo(null)}
                >
                    <button
                        onClick={() => setExpandedVideo(null)}
                        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <span className="text-white text-2xl">&times;</span>
                    </button>

                    <div
                        className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-orange-500/30 shadow-[0_0_100px_rgba(255,100,0,0.2)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            title={expandedVideo.title}
                            src={expandedVideo.videoSrc}
                            className="w-full h-full border-none"
                            loading="lazy"
                            referrerPolicy="origin"
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                        />
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                            {expandedVideo.title}
                        </h3>
                        <p className="text-sm font-mono text-white/50 uppercase tracking-widest mt-1">
                            {expandedVideo.year}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TimelineSlider;

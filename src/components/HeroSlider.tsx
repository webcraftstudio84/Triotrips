import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: (destination?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate, onOpenBooking }) => {
  const slides = [
    {
      id: 1,
      tagline: 'Welcome to Triotrips',
      title: (
        <>
          Explore the World<br />with <span className="text-[#ffff61] font-display italic" style={{ color: '#ffff61' }}>Triotrips</span>
        </>
      ),
      subtitle: '4 Years of Crafting Unforgettable Journeys from Parbhani, Maharashtra',
      image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      id: 2,
      tagline: 'Sun, Sand & Sea',
      title: (
        <>
          Discover Beautiful<br /><span className="text-[#ffff61] font-display italic" style={{ color: '#ffff61' }}>Beach Destinations</span>
        </>
      ),
      subtitle: 'Goa, Kerala, Bali – Paradise awaits you',
      image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      id: 3,
      tagline: 'Adventure Awaits',
      title: (
        <>
          Trek the Majestic<br /><span className="text-[#ffff61] font-display italic" style={{ color: '#ffff61' }}>Himalayan Trails</span>
        </>
      ),
      subtitle: 'Manali, Kashmir – Expert guides, safe treks',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Quick Trip Finder states
  const [quickDestination, setQuickDestination] = useState('');
  const [quickCategory, setQuickCategory] = useState('');

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickDestination) {
      onOpenBooking(quickDestination);
    } else {
      onNavigate('packages');
    }
  };

  const handleScrollDown = () => {
    const statsEl = document.getElementById('stats');
    if (statsEl) {
      statsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-24 pb-16"
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0 scale-100' : 'opacity-0 -z-10 scale-105 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          {/* Ambient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)'
            }}
          />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-8 sm:py-12 flex flex-col items-center">
        {/* Tagline */}
        <span className="section-tag tag-light mb-3 sm:mb-4 text-[11px] sm:text-xs">
          {slides[currentSlide].tagline}
        </span>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          {slides[currentSlide].title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-xs sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
          {slides[currentSlide].subtitle}
        </p>

        {/* Hero Buttons: Liquid Glass [ Our Packages ] and [ Contact Us ] */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('packages')}
            className="btn-primary-green text-sm sm:text-base px-8 py-3.5 w-full sm:w-auto min-w-[170px]"
          >
            <span>Our Packages</span>
            <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-outline-white text-sm sm:text-base px-8 py-3.5 w-full sm:w-auto min-w-[170px]"
          >
            Contact Us
          </button>
        </div>

        {/* Floating Trip Finder Card */}
        <form
          onSubmit={handleQuickSearch}
          className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 sm:p-5 text-slate-800 shadow-2xl border border-white/80 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 items-center text-left"
        >
          <div className="px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-slate-200">
            <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              <i className="fa-solid fa-location-dot text-[#06C258] mr-1"></i> Destination
            </label>
            <select
              value={quickDestination}
              onChange={(e) => setQuickDestination(e.target.value)}
              aria-label="Destination"
              className="w-full text-xs sm:text-sm font-semibold bg-transparent border-0 focus:outline-none text-slate-800 cursor-pointer"
            >
              <option value="">All Destinations</option>
              <option value="Kashmir">Kashmir (Paradise on Earth)</option>
              <option value="Goa">Goa (Beaches & Parties)</option>
              <option value="Manali">Manali (Snow & Adventure)</option>
              <option value="Kerala">Kerala (Backwaters & Hills)</option>
              <option value="Rajasthan">Rajasthan (Royal Forts)</option>
              <option value="Dubai">Dubai (Luxury & Desert)</option>
              <option value="Bali">Bali (Island of Gods)</option>
            </select>
          </div>

          <div className="px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-slate-200">
            <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              <i className="fa-solid fa-layer-group text-[#06C258] mr-1"></i> Tour Style
            </label>
            <select
              value={quickCategory}
              onChange={(e) => setQuickCategory(e.target.value)}
              aria-label="Tour Style"
              className="w-full text-xs sm:text-sm font-semibold bg-transparent border-0 focus:outline-none text-slate-800 cursor-pointer"
            >
              <option value="">All Packages</option>
              <option value="Budget">Budget Packages</option>
              <option value="Honeymoon">Honeymoon Tours</option>
              <option value="Family">Family Holidays</option>
              <option value="Adventure">Trekking & Adventure</option>
            </select>
          </div>

          <div className="px-3 py-1.5 hidden md:block">
            <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              <i className="fa-solid fa-shield-halved text-[#06C258] mr-1"></i> Agency Trust
            </label>
            <div className="text-xs font-semibold text-slate-700">
              <span className="text-[#06C258] font-bold">4+ Yrs Experience</span> • Parbhani
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary-green w-full py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
              <span>Find Tours</span>
            </button>
          </div>
        </form>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-[#06C258] hover:text-white text-white items-center justify-center backdrop-blur-sm transition-all border border-white/25 cursor-pointer shadow-md"
        aria-label="Previous Slide"
      >
        <i className="fa-solid fa-chevron-left text-xs"></i>
      </button>
      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-[#06C258] hover:text-white text-white items-center justify-center backdrop-blur-sm transition-all border border-white/25 cursor-pointer shadow-md"
        aria-label="Next Slide"
      >
        <i className="fa-solid fa-chevron-right text-xs"></i>
      </button>

      {/* Slide Pagination Bullets */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentSlide ? 'w-6 bg-[#4BCE97]' : 'w-2 bg-white/45 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

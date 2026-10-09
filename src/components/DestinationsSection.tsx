import React, { useState, useEffect } from 'react';
import { DESTINATIONS_DATA, Destination } from '../data/travelData';
import { getDestinationsFromDb } from '../services/supabaseClient';

interface DestinationsSectionProps {
  onSelectDestination: (destination: Destination) => void;
  onBookDestination: (destName: string) => void;
  onNavigate: (tab: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  onBookDestination
}) => {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS_DATA);
  const [filter, setFilter] = useState<'All' | 'Domestic' | 'International'>('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadDestinations = async () => {
      setLoading(true);
      try {
        const liveDestinations = await getDestinationsFromDb();
        if (isMounted && liveDestinations && liveDestinations.length > 0) {
          setDestinations(liveDestinations);
        }
      } catch (err) {
        console.warn('Error loading destinations from Supabase:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadDestinations();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredDestinations = destinations.filter((dest) => {
    if (filter === 'All') return true;
    return dest.category === filter;
  });

  return (
    <section className="section-pad bg-white" id="destinations-home">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="section-tag">Where To Go</span>
          <h2 className="section-title text-2xl sm:text-4xl lg:text-5xl font-bold">Popular Destinations</h2>
          <p className="section-sub text-xs sm:text-base text-gray-500">
            Handpicked vacation spots across India and international wonders curated for memorable getaways
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 flex-wrap">
          {(['All', 'Domestic', 'International'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer border ${
                filter === cat
                  ? 'btn-primary-green !shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-[#4BCE97] hover:text-[#06C258] hover:bg-[#f0fbf7]'
              }`}
            >
              {cat === 'All' ? 'All Destinations' : `${cat} Tours`}
            </button>
          ))}
        </div>

        {/* 2-Column on Mobile, 3-Column on Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="dest-card-3d cursor-pointer group"
              onClick={() => onSelectDestination(dest)}
            >
              {/* Card Image */}
              <div className="relative overflow-hidden h-32 sm:h-56 lg:h-64 bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5">
                  <span className={`text-[9px] sm:text-xs font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm ${
                    dest.category === 'International'
                      ? 'bg-amber-100/95 text-amber-900 border border-amber-300/60'
                      : 'bg-white/95 text-[#06C258] border border-[#4BCE97]/40 font-bold'
                  }`}>
                    {dest.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 sm:bottom-3.5 sm:right-3.5 bg-black/75 backdrop-blur-md text-[#fde047] font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-white/20 shadow">
                  From ₹{dest.priceStartingFrom.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-2.5 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#06C258] transition-colors leading-tight line-clamp-1">
                    {dest.name}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-gray-500 mt-1 sm:mt-1.5 mb-2.5 sm:mb-3 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-gray-100 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDestination(dest);
                    }}
                    className="text-[11px] sm:text-sm font-semibold text-[#06C258] hover:text-[#4BCE97] flex items-center gap-1 sm:gap-1.5 cursor-pointer transition-transform group-hover:translate-x-1"
                  >
                    <span>Explore</span>
                    <i className="fa-solid fa-arrow-right text-[9px] sm:text-xs"></i>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookDestination(dest.name);
                    }}
                    className="btn-primary-green !px-2.5 sm:!px-3.5 !py-1 sm:!py-1.5 !text-[10px] sm:!text-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => onBookDestination('General Inquiry')}
            className="btn-primary-green text-xs sm:text-sm px-6 sm:px-9 py-2.5 sm:py-3.5 shadow-lg"
          >
            Inquire Any Custom Destination
          </button>
        </div>
      </div>
    </section>
  );
};

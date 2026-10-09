import React, { useState, useEffect } from 'react';
import { TOUR_PACKAGES_DATA, TourPackage } from '../data/travelData';
import { getPackagesFromDb } from '../services/supabaseClient';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkgTitle: string) => void;
  onNavigate: (tab: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
  onBookPackage,
  onNavigate
}) => {
  const [packages, setPackages] = useState<TourPackage[]>(TOUR_PACKAGES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPackages = async () => {
      setLoading(true);
      try {
        const livePackages = await getPackagesFromDb();
        if (isMounted && livePackages && livePackages.length > 0) {
          setPackages(livePackages);
        }
      } catch (err) {
        console.warn('Error loading packages from Supabase:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', 'Budget', 'Honeymoon', 'Family', 'Group & Adventure'];

  const filteredPackages =
    selectedCategory === 'All'
      ? packages
      : packages.filter((p) => p.category === selectedCategory);

  const keyInclusions = [
    { icon: 'fa-hotel', title: 'Verified Hotels' },
    { icon: 'fa-van-shuttle', title: 'Comfortable Transport' },
    { icon: 'fa-utensils', title: 'Daily Meals' },
    { icon: 'fa-id-badge', title: 'Local Guides' },
    { icon: 'fa-shield-halved', title: 'Safety Insurance' },
    { icon: 'fa-headset', title: '24/7 Support' }
  ];

  return (
    <section className="section-pad packages-bg text-white" id="packages-home">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="section-tag tag-light">Our Tour Plans</span>
          <h2
            className="section-title text-2xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: '#111112' }}
          >
            Choose Your Perfect Package
          </h2>
          <p
            className="section-sub text-xs sm:text-base text-[#080808]"
            style={{ color: '#080808', fontFamily: 'Georgia, serif' }}
          >
            All-inclusive itineraries with verified stays, dedicated transport, and transparent pricing
          </p>
        </div>

        {/* 3 Featured Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-center mb-10 sm:mb-16">
          {/* Budget Packages */}
          <div className="pkg-card text-center flex flex-col justify-between p-5 sm:p-8">
            <div>
              <div className="pkg-icon">
                <i className="fa-solid fa-wallet text-[#fbff00]"></i>
              </div>
              <h4 className="text-lg sm:text-2xl font-bold font-display text-white mb-2">Budget Packages</h4>
              <p className="text-white/85 text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed">
                Explore amazing destinations across India without breaking the bank.
              </p>
              <div className="pkg-price mb-4 sm:mb-6 text-lg sm:text-2xl font-display">Starting ₹4,999</div>
            </div>
            <button
              onClick={() => setSelectedCategory('Budget')}
              className="btn-primary-green w-full py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              View Packages
            </button>
          </div>

          {/* Honeymoon Packages (Featured) */}
          <div className="pkg-card pkg-featured text-center flex flex-col justify-between p-5 sm:p-8">
            <div className="pkg-badge">Most Popular</div>
            <div>
              <div className="pkg-icon">
                <i className="fa-solid fa-heart text-[#fbff00]"></i>
              </div>
              <h4 className="text-lg sm:text-2xl font-bold font-display text-white mb-2">Honeymoon Packages</h4>
              <p className="text-white/85 text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed">
                Romantic escapes to Kashmir, Kerala, Goa, and Bali with special candlelight dinners.
              </p>
              <div className="pkg-price mb-4 sm:mb-6 text-lg sm:text-2xl font-display">Starting ₹14,999</div>
            </div>
            <button
              onClick={() => setSelectedCategory('Honeymoon')}
              className="btn-accent-gold w-full py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              View Packages
            </button>
          </div>

          {/* Family Tours */}
          <div className="pkg-card text-center flex flex-col justify-between p-5 sm:p-8">
            <div>
              <div className="pkg-icon">
                <i className="fa-solid fa-users text-[#fbff00]"></i>
              </div>
              <h4 className="text-lg sm:text-2xl font-bold font-display text-white mb-2">Family Tours</h4>
              <p className="text-white/85 text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed">
                Kid-friendly itineraries with comfortable hotels, private cabs, and guided sightseeing.
              </p>
              <div className="pkg-price mb-4 sm:mb-6 text-lg sm:text-2xl font-display">Starting ₹9,999</div>
            </div>
            <button
              onClick={() => setSelectedCategory('Family')}
              className="btn-primary-green w-full py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              View Packages
            </button>
          </div>
        </div>

        {/* Detailed Filter Tabs */}
        <div className="flex justify-center mb-6 sm:mb-10 flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#4BCE97] text-[#024a20] border-white/80 shadow-md font-bold'
                  : 'bg-white/15 text-white border-white/25 hover:bg-white/25'
              }`}
            >
              {cat === 'All' ? 'All Packages' : `${cat} Tours`}
            </button>
          ))}
        </div>

        {/* 2-Column on Mobile, 3-Column on Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="pkg-card-3d group cursor-pointer"
              onClick={() => onSelectPackage(pkg)}
            >
              {/* Image & Header */}
              <div className="h-32 sm:h-56 lg:h-60 bg-cover bg-center relative overflow-hidden bg-slate-200">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 bg-gradient-to-r from-[#4BCE97] to-[#06C258] text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow border border-white/40">
                  {pkg.category}
                </div>
                <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 bg-black/70 backdrop-blur-md text-white text-[9px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20">
                  {pkg.duration}
                </div>
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 text-white">
                  <h4 className="font-display text-xs sm:text-lg lg:text-xl font-bold leading-tight line-clamp-1">
                    {pkg.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#4BCE97] line-clamp-1 mt-0.5">{pkg.destinationName}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-2.5 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                  <ul className="space-y-1 mb-3 hidden sm:block">
                    {pkg.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-center gap-2">
                        <i className="fa-solid fa-check text-[#06C258] text-xs"></i>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[9px] sm:text-xs text-gray-400 block leading-none">Starting from</span>
                    <span className="font-bold text-[#06C258] text-xs sm:text-lg lg:text-xl font-display">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] sm:text-xs text-gray-500"> /{pkg.priceUnit}</span>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPackage(pkg);
                      }}
                      className="hidden sm:inline-block px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookPackage(pkg.title);
                      }}
                      className="btn-primary-green !px-2.5 sm:!px-4 !py-1 sm:!py-2 !text-[10px] sm:!text-xs"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inclusions Row */}
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-14 border-t border-white/20">
          <div className="text-center mb-6 sm:mb-8">
            <h4 className="font-display text-lg sm:text-2xl font-bold text-white mb-2">
              Included In All Triotrips Packages
            </h4>
            <p className="text-xs sm:text-sm text-white/75">
              Clear inclusions, honest prices, verified safety standards
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {keyInclusions.map((inc, i) => (
              <div key={i} className="bg-white/12 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 text-center text-xs flex flex-col sm:flex-row items-center justify-center gap-2">
                <i className={`fa-solid ${inc.icon} text-[#fbff00] text-base`}></i>
                <span className="font-medium text-white">{inc.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="text-center mt-8 sm:mt-14">
          <button
            onClick={() => onNavigate('contact')}
            className="btn-outline-white text-xs sm:text-sm px-7 sm:px-10 py-2.5 sm:py-3.5"
          >
            Request Custom Itinerary & Quotation
          </button>
        </div>
      </div>
    </section>
  );
};

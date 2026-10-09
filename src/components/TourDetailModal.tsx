import React, { useState, useEffect } from 'react';
import { TourPackage, CONTACT_INFO } from '../data/travelData';
import { getTourPlansFromDb } from '../services/supabaseClient';

interface TourDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkgTitle: string) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  pkg,
  onClose,
  onBookNow
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [itinerary, setItinerary] = useState(pkg?.itinerary || []);

  useEffect(() => {
    if (!pkg) return;
    let isMounted = true;
    const fetchPlans = async () => {
      try {
        const livePlans = await getTourPlansFromDb(pkg.id);
        if (isMounted && livePlans && livePlans.length > 0) {
          const mapped = livePlans.map((lp) => ({
            day: lp.day_number,
            title: lp.title,
            description: lp.description || '',
            activities: []
          }));
          setItinerary(mapped);
          return;
        }
      } catch (e) {
        console.warn('Tour plans query error:', e);
      }
      if (isMounted) {
        setItinerary(pkg.itinerary || []);
      }
    };
    fetchPlans();
    return () => {
      isMounted = false;
    };
  }, [pkg]);

  if (!pkg) return null;

  const handleWhatsAppShare = () => {
    const text = `Hi Triotrips! 🌄 I'm interested in the *${pkg.title}* (${pkg.duration}) starting from ₹${pkg.price}/${pkg.priceUnit}. Please share dates, detailed PDF brochure, and hotel options.`;
    window.open(`https://wa.me/91${CONTACT_INFO.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header with Hero Image */}
        <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/30"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-lg backdrop-blur-sm transition-colors border border-white/20 z-10 cursor-pointer"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Header Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#06C258] text-white text-xs font-bold px-3 py-1 rounded-full shadow border border-white/20">
                  {pkg.category}
                </span>
                {pkg.badge && (
                  <span className="bg-gradient-to-r from-[#e2f8ef] to-[#4BCE97] text-[#024a20] text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    {pkg.badge}
                  </span>
                )}
                <span className="bg-black/50 text-white/90 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <i className="fa-regular fa-clock mr-1 text-[#4BCE97]"></i>
                  {pkg.duration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-white">
                {pkg.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 flex items-center gap-1.5 mt-1">
                <i className="fa-solid fa-location-dot text-[#4BCE97]"></i>
                <span>Destination: {pkg.destinationName}</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-left sm:text-right">
              <div className="text-[11px] text-white/80">Starting price</div>
              <div className="text-2xl font-extrabold text-[#fde68a] font-display">
                ₹{pkg.price.toLocaleString('en-IN')}
                <span className="text-xs font-sans text-white/80 font-normal ml-1">/{pkg.priceUnit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs flex items-center gap-2 text-[#06C258]">
              <i className="fa-solid fa-circle-info text-[#06C258]"></i>
              <span>Tour Overview</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2 text-[#06C258]">
                <i className="fa-solid fa-route text-[#06C258]"></i>
                <span>Day-by-Day Comprehensive Itinerary</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {itinerary.length} Days Planned
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Day selection tabs */}
              <div className="md:col-span-4 space-y-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                {itinerary.map((dayPlan) => (
                  <button
                    key={dayPlan.day}
                    onClick={() => setActiveDay(dayPlan.day)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      activeDay === dayPlan.day
                        ? 'bg-[#06C258] text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>Day {dayPlan.day}: {dayPlan.title.slice(0, 22)}...</span>
                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </button>
                ))}
              </div>

              {/* Active Day Detail Card */}
              <div className="md:col-span-8 bg-[#f0fbf7] p-5 rounded-2xl border border-[#4BCE97]/35">
                {(() => {
                  const day = itinerary.find((d) => d.day === activeDay) || itinerary[0];
                  if (!day) return null;
                  return (
                    <div>
                      <div className="inline-block bg-[#06C258] text-white text-[11px] font-bold px-2.5 py-1 rounded-md mb-2">
                        Day {day.day} Breakdown
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2 font-display">
                        {day.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {day.description}
                      </p>

                      {day.activities && day.activities.length > 0 && (
                        <>
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Day Highlights & Activities:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {day.activities.map((act, i) => (
                              <div
                                key={i}
                                className="bg-white p-2.5 rounded-xl border border-[#4BCE97]/30 text-xs text-slate-700 flex items-center gap-2"
                              >
                                <i className="fa-solid fa-check text-[#06C258]"></i>
                                <span>{act}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Inclusions */}
            <div className="bg-[#f0fbf7] p-5 rounded-2xl border border-[#4BCE97]/35">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#06C258] mb-3 flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#06C258]"></i>
                <span>Package Inclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-[#06C258] mt-0.5 shrink-0"></i>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-rose-50/40 p-5 rounded-2xl border border-rose-200/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-circle-xmark text-rose-500"></i>
                <span>Package Exclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <i className="fa-solid fa-xmark text-rose-500 mt-0.5 shrink-0"></i>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-[#06C258]"></i>
            <span>Verified 4-Star Experience from Triotrips Parbhani</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-900 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>WhatsApp Inquiry</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(pkg.title);
              }}
              className="px-6 py-2.5 bg-[#06C258] hover:bg-[#05a84c] text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-bolt text-[#fde68a]"></i>
              <span>Book This Tour</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

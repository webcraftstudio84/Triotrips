import React from 'react';
import { Destination, CONTACT_INFO } from '../data/travelData';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookNow: (destName: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onBookNow
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        {/* Hero Banner */}
        <div className="relative h-64 shrink-0 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/20"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <span className="bg-[#06C258] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow mb-2 inline-block border border-white/30">
                {destination.category} Destination
              </span>
              <h2 className="text-3xl font-bold font-display text-white">{destination.name}</h2>
              <p className="text-xs text-emerald-100 font-medium">{destination.tagline}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-right border border-white/20">
              <span className="text-[10px] text-emerald-100 block">Starting from</span>
              <span className="text-xl font-bold text-[#fde68a] font-display">
                ₹{destination.priceStartingFrom.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#06C258] mb-2">
              Destination Overview
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">{destination.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                <i className="fa-regular fa-sun text-[#eab308]"></i> Best Time to Visit
              </div>
              <div className="text-xs font-semibold text-slate-800">{destination.bestTimeToVisit}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                <i className="fa-regular fa-clock text-[#06C258]"></i> Recommended Duration
              </div>
              <div className="text-xs font-semibold text-slate-800">{destination.duration}</div>
            </div>
          </div>

          {/* Top Attractions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#06C258] mb-3 flex items-center gap-1.5">
              <i className="fa-solid fa-star text-amber-400"></i> Top Sights & Attractions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {destination.topAttractions.map((att, i) => (
                <div
                  key={i}
                  className="bg-[#f0fbf7] p-3 rounded-xl border border-[#4BCE97]/40 text-xs text-slate-700 flex items-center gap-2"
                >
                  <i className="fa-solid fa-location-dot text-[#06C258]"></i>
                  <span>{att}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#06C258] mb-2.5">
              Triotrips Package Perks
            </h4>
            <div className="flex flex-wrap gap-2">
              {destination.included.map((inc, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 font-medium"
                >
                  <i className="fa-solid fa-check text-[#06C258] text-[10px]"></i>
                  {inc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 hidden sm:block">
            Departure assistance from Parbhani, Pune, Mumbai & Aurangabad
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(destination.name);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#06C258] hover:bg-[#05a84c] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Book {destination.name} Tour</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

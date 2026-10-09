import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/travelData';
import { getServicesFromDb } from '../services/supabaseClient';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
  onNavigate: (tab: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking
}) => {
  const [services, setServices] = useState([
    { icon: 'fa-globe-asia', title: 'Domestic Tours', desc: 'Handpicked destinations across India' },
    { icon: 'fa-plane-departure', title: 'International Tours', desc: 'Dubai, Bali, and beyond' },
    { icon: 'fa-people-group', title: 'Group Tours', desc: 'Fun-filled tours for large groups' },
    { icon: 'fa-person-hiking', title: 'Trekking Tours', desc: 'Himalayan treks with expert guides' },
    { icon: 'fa-taxi', title: 'Taxi Services', desc: 'Comfortable, timely cab booking' },
    { icon: 'fa-hotel', title: 'Hotel Booking', desc: 'Budget to luxury stays arranged' },
    { icon: 'fa-utensils', title: 'Food Arrangements', desc: 'Local cuisine & special diet options' },
    { icon: 'fa-id-badge', title: 'Tour Guides', desc: 'Professional, multilingual guides' }
  ]);

  useEffect(() => {
    let isMounted = true;
    const loadServices = async () => {
      try {
        const liveServices = await getServicesFromDb();
        if (isMounted && liveServices && liveServices.length > 0) {
          setServices(liveServices);
        }
      } catch (err) {
        console.warn('Error loading services from Supabase:', err);
      }
    };
    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section-pad bg-light-green" id="services-home">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title text-2xl sm:text-4xl lg:text-5xl font-bold">Our Premium Services</h2>
          <p className="section-sub text-xs sm:text-base">Everything you need for a perfect travel experience</p>
        </div>

        {/* 2-Column on Mobile, 4-Column on Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => onOpenBooking(service.title)}
              className="service-card text-center cursor-pointer group p-3.5 sm:p-7"
            >
              <div className="service-icon !w-12 !h-12 sm:!w-16 sm:!h-16 !text-lg sm:!text-2xl">
                <i className={`fa-solid ${service.icon}`}></i>
              </div>
              <h5 className="font-bold text-gray-900 text-xs sm:text-base mb-1 group-hover:text-[#06C258] transition-colors leading-tight">
                {service.title}
              </h5>
              <p className="text-gray-500 text-[10px] sm:text-xs leading-normal">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Service In-Depth Feature Highlights */}
        <div className="mt-10 sm:mt-16 bg-white rounded-2xl p-4 sm:p-10 border border-[#4BCE97]/25 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h3 className="font-display text-xl sm:text-3xl font-bold text-gray-900 mb-2">
              End-to-End Travel Management
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              We manage all logistical arrangements with verified partners so your vacation is completely relaxing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {SERVICES_DATA.slice(0, 4).map((s) => (
              <div key={s.id} className="p-4 sm:p-5 rounded-2xl bg-[#f0fbf7] border border-[#4BCE97]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[#06C258] text-xl sm:text-2xl mb-2 sm:mb-3">
                    <i className={`fa-solid ${s.icon}`}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{s.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{s.description}</p>
                  <ul className="space-y-1.5 mb-4">
                    {s.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                        <i className="fa-solid fa-check text-[#06C258] text-[10px]"></i>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => onOpenBooking(s.title)}
                  className="btn-primary-green w-full py-2 text-xs"
                >
                  Book Service
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => onOpenBooking()}
            className="btn-primary-green text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 shadow-md"
          >
            Inquire Any Custom Service
          </button>
        </div>
      </div>
    </section>
  );
};

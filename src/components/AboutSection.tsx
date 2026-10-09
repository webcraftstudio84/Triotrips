import React from 'react';
import { CONTACT_INFO } from '../data/travelData';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onNavigate: (tab: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onNavigate }) => {
  const values = [
    {
      icon: 'fa-shield-halved',
      title: 'Safety First',
      description: 'Every partner hotel, driver, and guide is thoroughly verified. We never compromise on your safety.'
    },
    {
      icon: 'fa-hand-holding-heart',
      title: 'Customer First',
      description: 'Your happiness is our metric of success. We go the extra mile — every single time.'
    },
    {
      icon: 'fa-leaf',
      title: 'Responsible Travel',
      description: 'We promote eco-friendly travel practices that respect local communities and environments.'
    }
  ];

  const whyChooseUs = [
    { icon: 'fa-shield-halved', title: 'Safe & Trusted', desc: 'Fully verified hotels, drivers, and guides. Your safety is our top priority.' },
    { icon: 'fa-tags', title: 'Best Price Guarantee', desc: 'Most competitive rates without compromising on quality or experience.' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Our team is available round the clock before, during, and after your trip.' },
    { icon: 'fa-route', title: 'Customized Itineraries', desc: 'Every trip is planned keeping your preferences and budget in mind.' },
    { icon: 'fa-user-tie', title: 'Expert Local Guides', desc: 'Professional guides add depth, safety, and authenticity to every journey.' },
    { icon: 'fa-star', title: '4-Star Experience', desc: 'We strive for excellence in every service – from stays to sightseeing.' }
  ];

  return (
    <div>
      {/* Main Story / Snippet Section */}
      <section className="section-pad bg-white" id="about-snippet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Image Grid */}
            <div className="lg:col-span-6">
              <div className="about-img-grid">
                <img
                  src="https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Kashmir Valley"
                  className="img-main"
                />
                <img
                  src="https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Goa Beach"
                  className="img-sub"
                />
                <div className="experience-badge">
                  <span className="exp-num">4</span>
                  <span className="exp-text">Years of<br />Excellence</span>
                </div>
              </div>
            </div>

            {/* Right: Text & Features */}
            <div className="lg:col-span-6 space-y-4">
              <span className="section-tag">About Triotrips</span>
              <h2 className="section-title">
                Your Trusted Travel<br />Partner Since 2020
              </h2>
              <p className="section-body text-sm sm:text-base">
                Based in Parbhani, Maharashtra, Triotrips has been creating unforgettable travel memories for over 4 years. We believe every journey tells a story — and we craft yours with care, expertise, and passion.
              </p>
              <p className="section-body text-sm sm:text-base">
                From snow-capped Kashmir valleys to sun-kissed Goa beaches, we offer end-to-end travel solutions for individuals, families, and groups at the most affordable prices.
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                <div className="feature-chip">
                  <i className="fa-solid fa-check-circle text-[#06C258]"></i>
                  <span className="text-xs sm:text-sm">Affordable Packages</span>
                </div>
                <div className="feature-chip">
                  <i className="fa-solid fa-check-circle text-[#06C258]"></i>
                  <span className="text-xs sm:text-sm">Expert Guides</span>
                </div>
                <div className="feature-chip">
                  <i className="fa-solid fa-check-circle text-[#06C258]"></i>
                  <span className="text-xs sm:text-sm">Comfort Transport</span>
                </div>
                <div className="feature-chip">
                  <i className="fa-solid fa-check-circle text-[#06C258]"></i>
                  <span className="text-xs sm:text-sm">24/7 Support</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-primary-green px-6 py-2.5 text-xs sm:text-sm shadow-md"
                >
                  <span>Learn More</span>
                  <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="btn-outline-white !bg-[#f0fbf7] !text-[#06C258] !border-[#4BCE97]/40 hover:!bg-[#06C258] hover:!text-white px-6 py-2.5 text-xs sm:text-sm"
                >
                  Book A Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-pad bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-tag">Our Purpose</span>
            <h2 className="section-title">Mission & Vision</h2>
            <p className="section-sub text-xs sm:text-base">Guided by passion, driven by safety, dedicated to exceptional traveler experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#4BCE97]/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#e2f8ef] text-[#06C258] flex items-center justify-center text-xl mb-4 border border-[#4BCE97]/40">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-display text-gray-900 mb-2">Our Mission</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                To make travel accessible and memorable for every Indian family by offering affordable, safe, and well-planned tour packages with exceptional personal service — from Parbhani to the world.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#4BCE97]/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#e2f8ef] text-[#06C258] flex items-center justify-center text-xl mb-4 border border-[#4BCE97]/40">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-display text-gray-900 mb-2">Our Vision</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                To become Maharashtra's most trusted travel brand — known for transforming ordinary trips into extraordinary memories while maintaining the highest standards of safety, comfort, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">What Drives Us Every Day</h2>
            <p className="section-sub text-xs sm:text-base">The core principles that shape our tours and client relationships</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="why-card text-center">
                <div className="why-icon">
                  <i className={`fa-solid ${val.icon}`}></i>
                </div>
                <h5 className="font-bold text-gray-900 text-base sm:text-lg mb-2">{val.title}</h5>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us 6-Card Section */}
      <section className="section-pad bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-tag">Why Triotrips</span>
            <h2 className="section-title">Why Travelers Choose Us</h2>
            <p className="section-sub text-xs sm:text-base">Over 1,200 happy travelers trust Triotrips for hassle-free vacations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="why-card p-4 sm:p-7">
                <div className="why-icon !w-11 !h-11 sm:!w-14 sm:!h-14">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h5 className="font-bold text-gray-900 text-xs sm:text-base mb-1">{item.title}</h5>
                <p className="text-gray-500 text-[10px] sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#024a20] via-[#06C258] to-[#04823a] text-white text-center shadow-inner border-y border-white/20">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
            Ready to Start Your Journey?
          </h3>
          <p className="text-white/90 text-xs sm:text-base mb-6 max-w-xl mx-auto">
            Talk to our travel experts today. We'll plan the perfect trip tailored just for you and your family.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-3.5 justify-center">
            <button
              onClick={onOpenBooking}
              className="btn-accent-gold px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              Book Now
            </button>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="btn-outline-white px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm"
            >
              <i className="fa-solid fa-phone mr-2 text-xs text-[#4BCE97]"></i>
              Call Us: {CONTACT_INFO.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

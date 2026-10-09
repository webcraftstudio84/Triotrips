import React, { useState } from 'react';
import { CONTACT_INFO, SERVICES_DATA } from '../data/travelData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="newsletter-box flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-lg">
              <span className="text-[#4BCE97] text-xs font-bold uppercase tracking-wider block mb-1">
                ✨ Special Offers
              </span>
              <h3 className="text-2xl font-bold font-display text-white mb-1">Get Travel Deals & Updates</h3>
              <p className="text-white/85 text-xs sm:text-sm">Subscribe for exclusive offers, holiday ideas, and seasonal discounts.</p>
            </div>
            <form onSubmit={handleNewsletter} className="w-full md:w-auto flex gap-2 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-full border border-white/30 bg-white/12 text-white placeholder-white/70 text-xs sm:text-sm focus:outline-none focus:border-[#4BCE97] backdrop-blur-sm"
              />
              <button type="submit" className="btn-accent-gold !py-2.5 !px-5 !text-xs whitespace-nowrap">
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 footer-top">
            {/* Brand Col (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white/80 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 bg-white">
                  <img
                    src="/src/assets/images/triotrips_exact_logo_1790669413102.jpg"
                    alt="Triotrips Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-display text-2xl font-bold text-white">
                  Trio<span className="text-[#4BCE97]">trips</span>
                </span>
              </button>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm">
                Trusted travel partner based in Parbhani, Maharashtra. 4 years of crafting unforgettable journeys across India and the globe.
              </p>

              <div className="social-links pt-2">
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn hover:!bg-pink-600"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram" style={{ paddingRight: '3px' }}></i>
                </a>
                <a
                  href="https://wa.me/918421809065?text=Hi%20Triotrips%2C%20I%20want%20to%20inquire%20about%20a%20tour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn hover:!bg-[#25d366]"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a
                  href="tel:8421809065"
                  className="social-btn hover:!bg-[#06C258]"
                  aria-label="Phone"
                >
                  <i className="fa-solid fa-phone" style={{ paddingLeft: '2px' }}></i>
                </a>
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => { onNavigate('destinations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Destinations
                  </button>
                </li>
                <li>
                  <button onClick={() => { onNavigate('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Packages
                  </button>
                </li>
                <li>
                  <button onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services Links (3 cols) */}
            <div className="lg:col-span-3">
              <h6 className="footer-heading">Our Services</h6>
              <ul className="footer-links">
                {SERVICES_DATA.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        onNavigate('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Col (3 cols) */}
            <div className="lg:col-span-3">
              <h6 className="footer-heading">Contact Us</h6>
              <ul className="footer-contact space-y-2">
                <li>
                  <i className="fa-solid fa-location-dot text-[#4BCE97]"></i>
                  <span>Parbhani, Maharashtra, India</span>
                </li>
                <li>
                  <i className="fa-solid fa-phone text-[#4BCE97]"></i>
                  <div className="space-y-0.5">
                    <a href="tel:8421809065" className="block hover:text-[#4BCE97] font-semibold">8421809065</a>
                    <a href="tel:8468858258" className="block hover:text-[#4BCE97]">8468858258</a>
                    <a href="tel:8799909936" className="block hover:text-[#4BCE97]">8799909936</a>
                  </div>
                </li>
                <li>
                  <i className="fa-brands fa-instagram text-pink-400"></i>
                  <a
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#4BCE97]"
                  >
                    @Triotrips
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="btn-primary-green !w-full !py-2 !text-xs"
                  >
                    Book A Tour Now
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>&copy; 2024 Triotrips. All rights reserved. | Parbhani, Maharashtra</p>
          </div>
        </div>
      </footer>
    </>
  );
};

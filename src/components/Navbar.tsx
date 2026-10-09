import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../data/travelData';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookingModal: (destinationOrPackage?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBookingModal
}) => {
  const { user, profile, signOut, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Packages' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06C258f2] py-2.5 shadow-lg backdrop-blur-md border-b border-white/20'
          : 'bg-[#06C258e6] md:bg-transparent py-3 md:py-4 backdrop-blur-sm md:backdrop-blur-none'
      }`}
      id="mainNav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div
            className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white/80 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 bg-white"
            style={{ width: '50px', height: '50px', marginBottom: '0px', marginRight: '0px', paddingBottom: '0px', paddingRight: '0px', paddingLeft: '0px' }}
          >
            <img
              src="/src/assets/images/triotrips_exact_logo_1790669413102.jpg"
              alt="Triotrips Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white block leading-tight">
              Trio<span className="text-[#231717]">trips</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-white/90 font-semibold block">
              Travel & Tourism • Parbhani
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-[0.92rem] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/25 border border-white/40 shadow-sm font-semibold backdrop-blur-md'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Book Now Button & User Account */}
          <div className="ml-3 pl-2 flex items-center gap-2.5">
            <button
              onClick={() => onOpenBookingModal()}
              className="btn-accent-gold px-5 py-2 text-sm cursor-pointer shadow-md"
            >
              Book Now
            </button>

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/40 text-white text-xs font-semibold hover:bg-white/30 backdrop-blur-md cursor-pointer transition-all"
                  title={user.email || 'My Account'}
                >
                  <span className="w-6 h-6 rounded-full bg-[#04823a] text-white flex items-center justify-center text-[10px] font-bold uppercase">
                    {(profile?.full_name || user.email || 'U')[0]}
                  </span>
                  <span className="max-w-[100px] truncate hidden xl:inline">
                    {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <i className="fa-solid fa-chevron-down text-[10px] opacity-80"></i>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white text-slate-800 shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {profile?.full_name || 'Traveler'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenBookingModal();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-calendar-check text-[#06C258]"></i>
                      <span>New Tour Booking</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-slate-100 mt-1"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="px-4 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <i className="fa-solid fa-user text-xs"></i>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger & Quick CTA */}
        <div className="flex lg:hidden items-center gap-2">
          {user ? (
            <button
              onClick={async () => await signOut()}
              className="text-[11px] text-white/90 underline px-2 py-1"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('signin')}
              className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold border border-white/30"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => onOpenBookingModal()}
            className="btn-accent-gold text-xs px-3.5 py-1.5 shadow-sm"
          >
            Book Now
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/15 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <i className="fa-solid fa-xmark text-xl text-[#4BCE97]"></i>
            ) : (
              <i className="fa-solid fa-bars text-xl text-white"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06C258f8] border-t border-white/20 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-top duration-200 mt-2">
          {user && (
            <div className="bg-white/15 rounded-xl p-3 mb-2 text-white">
              <p className="text-xs font-bold">{profile?.full_name || 'Signed In'}</p>
              <p className="text-[11px] opacity-80">{user.email}</p>
            </div>
          )}

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/25 text-white font-bold shadow-sm border border-white/30'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/20 mt-2 flex flex-col gap-2">
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className="w-full py-2.5 rounded-xl bg-white text-[#04823a] text-xs font-bold text-center"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={async () => {
                  setMobileMenuOpen(false);
                  await signOut();
                }}
                className="w-full py-2 rounded-xl bg-red-600/80 text-white text-xs font-bold text-center"
              >
                Sign Out
              </button>
            )}

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-2 text-white/90 text-xs py-1.5"
            >
              <i className="fa-solid fa-phone text-[#4BCE97]"></i>
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

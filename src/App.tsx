/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { StatsBar } from './components/StatsBar';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesSection } from './components/PackagesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { TourDetailModal } from './components/TourDetailModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { Destination, TourPackage } from './data/travelData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<string | undefined>(undefined);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenBooking = (selection?: string) => {
    setBookingPrefill(selection);
    setBookingModalOpen(true);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white text-gray-800 antialiased selection:bg-[#06C258] selection:text-white">
        {/* Sticky / Scrolled Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleNavigate}
          onOpenBookingModal={handleOpenBooking}
        />

      {/* Main Content Areas based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HeroSlider
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />

            <StatsBar />

            <AboutSection
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={handleNavigate}
            />

            <ServicesSection
              onOpenBooking={(service) => handleOpenBooking(service)}
              onNavigate={handleNavigate}
            />

            <DestinationsSection
              onSelectDestination={(dest) => setSelectedDestination(dest)}
              onBookDestination={(name) => handleOpenBooking(name)}
              onNavigate={handleNavigate}
            />

            <PackagesSection
              onSelectPackage={(pkg) => setSelectedPackage(pkg)}
              onBookPackage={(name) => handleOpenBooking(name)}
              onNavigate={handleNavigate}
            />

            <TestimonialsSection />

            <FAQSection onOpenBooking={() => handleOpenBooking()} />

            <ContactSection />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-300">
            <section
              className="page-hero relative py-24 sm:py-32 px-4 text-center text-white bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1920')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="section-tag tag-light mb-3">About Us</span>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-3">
                  Discover Our Story
                </h1>
                <p className="text-white/90 text-xs sm:text-base max-w-xl mx-auto">
                  Over 4 years of crafting personalized journeys, verified stays, and unforgettable holidays across India
                </p>
              </div>
            </section>

            <AboutSection
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={handleNavigate}
            />

            <StatsBar />

            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="animate-in fade-in duration-300">
            <section
              className="page-hero relative py-24 sm:py-32 px-4 text-center text-white bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=1920')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="section-tag tag-light mb-3">What We Offer</span>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-3">
                  Our Services
                </h1>
                <p className="text-white/90 text-xs sm:text-base max-w-xl mx-auto">
                  Domestic, International, Trekking, Cab, and Luxury Hotel Booking
                </p>
              </div>
            </section>

            <ServicesSection
              onOpenBooking={(service) => handleOpenBooking(service)}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="animate-in fade-in duration-300">
            <section
              className="page-hero relative py-24 sm:py-32 px-4 text-center text-white bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1920')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="section-tag tag-light mb-3">Where To Go</span>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-3">
                  Destinations
                </h1>
                <p className="text-white/90 text-xs sm:text-base max-w-xl mx-auto">
                  From Kashmir and Manali snow valleys to tropical beaches of Goa, Kerala, and Bali
                </p>
              </div>
            </section>

            <DestinationsSection
              onSelectDestination={(dest) => setSelectedDestination(dest)}
              onBookDestination={(name) => handleOpenBooking(name)}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="animate-in fade-in duration-300">
            <section
              className="page-hero relative py-24 sm:py-32 px-4 text-center text-white bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1920')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="section-tag tag-light mb-3">Our Tour Plans</span>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-3">
                  Tour Packages
                </h1>
                <p className="text-white/90 text-xs sm:text-base max-w-xl mx-auto">
                  Budget packages, honeymoon romance, family vacations, and Himalayan group treks
                </p>
              </div>
            </section>

            <PackagesSection
              onSelectPackage={(pkg) => setSelectedPackage(pkg)}
              onBookPackage={(name) => handleOpenBooking(name)}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <section
              className="page-hero relative py-24 sm:py-32 px-4 text-center text-white bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="section-tag tag-light mb-3">Reach Out</span>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-3">
                  Contact Us
                </h1>
                <p className="text-white/90 text-xs sm:text-base max-w-xl mx-auto">
                  Get in touch with our travel consultants in Parbhani for custom quotes and itineraries
                </p>
              </div>
            </section>

            <ContactSection />

            <FAQSection onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialSelection={bookingPrefill}
      />

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookNow={(destName) => {
          setSelectedDestination(null);
          handleOpenBooking(destName);
        }}
      />

      {/* Package Detail Modal */}
      <TourDetailModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookNow={(pkgTitle) => {
          setSelectedPackage(null);
          handleOpenBooking(pkgTitle);
        }}
      />

      {/* Floating Action Button */}
      <WhatsAppFloatingButton />

      {/* Supabase Authentication Modal */}
      <AuthModal />
    </div>
  </AuthProvider>
);
};

export default App;

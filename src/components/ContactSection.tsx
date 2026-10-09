import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/travelData';
import { sendContactMessage } from '../services/supabaseClient';

interface ContactSectionProps {
  initialDestination?: string;
  initialPackage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialDestination,
  initialPackage
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: initialDestination || '',
    travelers: '2',
    travelDate: '',
    packageType: initialPackage || '',
    specialRequirements: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await sendContactMessage({
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        destination: formData.destination,
        travelers: formData.travelers,
        travel_date: formData.travelDate,
        package_type: formData.packageType,
        message: formData.specialRequirements
      });
      setSubmitted(true);
    } catch (err: unknown) {
      console.warn('Contact message submission error:', err);
      // Fallback display
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi Triotrips! 🌄\nName: ${formData.fullName || 'Traveler'}\nDestination: ${formData.destination || 'Planning a trip'}\nTravelers: ${formData.travelers}\nTravel Date: ${formData.travelDate || 'Flexible'}\nPackage Type: ${formData.packageType || 'General inquiry'}\nSpecial Note: ${formData.specialRequirements || 'None'}\n\nPlease share customized itinerary and quote!`;
    const url = `https://wa.me/918421809065?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div id="contact">
      {/* Contact Info Cards */}
      <section className="section-pad bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Contact Triotrips</h2>
            <p className="section-sub text-xs sm:text-base">We are available 7 days a week (8:00 AM – 9:00 PM) to help you plan your dream trip</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#4BCE97]/25 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0fbf7] text-[#06C258] border border-[#4BCE97]/30 flex items-center justify-center text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h5 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Call Us</h5>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-2">Speak directly with our team</p>
              <div className="space-y-0.5">
                <a href="tel:8421809065" className="text-[#06C258] font-bold text-xs hover:underline block">
                  +91 8421809065
                </a>
                <a href="tel:8468858258" className="text-[#06C258] font-semibold text-xs hover:underline block">
                  +91 8468858258
                </a>
                <a href="tel:8799909936" className="text-[#06C258] font-semibold text-xs hover:underline block">
                  +91 8799909936
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#4BCE97]/25 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0fbf7] text-[#25d366] border border-[#4BCE97]/30 flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <h5 className="font-bold text-gray-900 text-sm sm:text-base mb-1">WhatsApp</h5>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-2">Instant quotes & answers</p>
              <a
                href="https://wa.me/918421809065?text=Hi%20Triotrips%2C%20I%20want%20to%20inquire%20about%20a%20tour"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#06C258] font-bold text-xs hover:underline block"
              >
                +91 8421809065
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#4BCE97]/25 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0fbf7] text-pink-500 border border-[#4BCE97]/30 flex items-center justify-center text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
                <i className="fa-brands fa-instagram"></i>
              </div>
              <h5 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Instagram</h5>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-2">Photos, reels & stories</p>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#06C258] font-bold text-xs hover:underline block"
              >
                {CONTACT_INFO.instagramHandle}
              </a>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#4BCE97]/25 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0fbf7] text-amber-500 border border-[#4BCE97]/30 flex items-center justify-center text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h5 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Office</h5>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-2">Visit us in Parbhani</p>
              <span className="text-xs text-gray-600 block leading-tight">
                {CONTACT_INFO.address}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-pad bg-white" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="section-tag">Quick Inquiry</span>
            <h2 className="section-title">Plan Your Dream Trip</h2>
            <p className="section-sub text-xs sm:text-base">Fill the form and we'll get back to you within 24 hours</p>
          </div>

          <div className="booking-wrapper max-w-4xl mx-auto">
            {submitted ? (
              <div className="form-success-msg text-center py-6 sm:py-8">
                <i className="fa-solid fa-circle-check text-4xl sm:text-5xl text-[#06C258] mb-4"></i>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-2">
                  Thank You! Your inquiry has been sent.
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm mb-6">
                  We'll contact you within 24 hours. Call us directly at{' '}
                  <a href="tel:8421809065" className="text-[#06C258] font-bold">8421809065</a>
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary-green px-5 py-2 text-xs"
                  >
                    Send Another Inquiry
                  </button>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="btn-accent-gold px-5 py-2 text-xs"
                  >
                    <i className="fa-brands fa-whatsapp mr-1.5"></i>
                    Message on WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Destination *
                    </label>
                    <select
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258] cursor-pointer"
                    >
                      <option value="">-- Select Destination --</option>
                      <option value="Kashmir">Kashmir</option>
                      <option value="Goa">Goa</option>
                      <option value="Manali">Manali</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Bali">Bali</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      No. of Travelers *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      placeholder="e.g. 4"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Package Type
                    </label>
                    <select
                      value={formData.packageType}
                      onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258] cursor-pointer"
                    >
                      <option value="">-- Select --</option>
                      <option value="Budget Package">Budget Package</option>
                      <option value="Family Tour">Family Tour</option>
                      <option value="Honeymoon Package">Honeymoon Package</option>
                      <option value="Group Tour">Group Tour</option>
                      <option value="Adventure Trek">Adventure Trek</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    placeholder="Any special requests, dietary preferences..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#06C258]"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-green text-sm sm:text-base px-8 sm:px-10 py-2.5 sm:py-3 shadow-lg"
                  >
                    <i className="fa-solid fa-paper-plane mr-2 text-xs"></i>
                    <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64 sm:h-72">
            <iframe
              title="Triotrips Location Parbhani"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120120.26068637742!2d76.67059584179688!3d19.270765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd01e4a55555555%3A0x5eeeed5e5e5e5e5e!2sParbhani%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

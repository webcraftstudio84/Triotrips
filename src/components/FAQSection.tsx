import React, { useState } from 'react';
import { FAQ_DATA } from '../data/travelData';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section className="section-pad bg-light-green" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">
            Everything you need to know about booking, payments, customizations, and travel arrangements with Triotrips
          </p>
        </div>

        {/* FAQ Accordion List matching Master Design */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="faq-accordion-item">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className={`faq-accordion-button ${isOpen ? 'active' : ''}`}
                >
                  <span>{faq.question}</span>
                  <i
                    className={`fa-solid fa-chevron-down text-xs ml-3 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : 'text-gray-400'
                    }`}
                  ></i>
                </button>

                {isOpen && (
                  <div className="faq-accordion-body">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            Have more questions? Talk to our travel experts in Parbhani.
          </p>
          <button
            onClick={onOpenBooking}
            className="btn-primary-green text-xs px-6 py-2.5"
          >
            Inquire Now
          </button>
        </div>
      </div>
    </section>
  );
};

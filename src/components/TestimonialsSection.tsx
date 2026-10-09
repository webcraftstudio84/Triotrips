import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS_DATA } from '../data/travelData';
import { fetchReviews, submitReview, type Review } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const TestimonialsSection: React.FC = () => {
  const { user, profile } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(() =>
    TESTIMONIALS_DATA.map((t) => ({
      id: t.id,
      name: t.name,
      location: t.location,
      rating: t.rating,
      quote: t.quote,
      tour_taken: t.tourTaken,
      initials: t.initials,
      avatar_color: t.avatarColor,
      is_approved: true
    }))
  );
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Review submission state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: profile?.full_name || '',
    location: 'Parbhani, Maharashtra',
    tour_taken: 'Kashmir Valley Tour',
    rating: 5,
    quote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadLiveReviews = async () => {
      setLoading(true);
      try {
        const liveData = await fetchReviews();
        if (isMounted && liveData && liveData.length > 0) {
          setReviews(liveData);
        }
      } catch (err) {
        console.warn('Error loading dynamic reviews from Supabase:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadLiveReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalReviews = reviews.length;

  // Auto-slide for mobile
  useEffect(() => {
    if (isPaused || totalReviews === 0) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % totalReviews);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, totalReviews]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      setCurrentIdx((prev) => (prev + 1) % totalReviews);
    } else if (distance < -50) {
      setCurrentIdx((prev) => (prev - 1 + totalReviews) % totalReviews);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) return;

    setIsSubmitting(true);
    try {
      const initials = newReview.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const saved = await submitReview({
        user_id: user?.id || null,
        name: newReview.name,
        location: newReview.location,
        tour_taken: newReview.tour_taken,
        rating: newReview.rating,
        quote: newReview.quote,
        initials: initials || 'TT',
        avatar_color: '#06C258',
        is_approved: true
      });

      setReviews((prev) => [saved, ...prev]);
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setReviewSuccess(false);
        setNewReview({
          name: profile?.full_name || '',
          location: 'Parbhani, Maharashtra',
          tour_taken: 'Kashmir Valley Tour',
          rating: 5,
          quote: ''
        });
      }, 1200);
    } catch (err) {
      console.warn('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-pad reviews-bg text-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="section-tag tag-light">Traveler Stories</span>
          <h2 className="section-title text-white">What Our Customers Say</h2>
          <p
            className="section-sub text-xs sm:text-base text-[#131415]"
            style={{ color: '#131415', fontFamily: 'Georgia, serif' }}
          >
            Real feedback from happy families, couples, and groups across Maharashtra
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowReviewModal(true)}
              className="btn-accent-gold !py-2 !px-5 !text-xs cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <i className="fa-solid fa-pen-to-square"></i>
              <span>Write a Review</span>
            </button>
            {loading && (
              <span className="text-xs text-white/70 flex items-center gap-1.5">
                <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                Syncing with Supabase...
              </span>
            )}
          </div>
        </div>

        {/* MOBILE ONLY: Horizontal Auto-Sliding Carousel */}
        <div
          className="block md:hidden overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}
          >
            {reviews.map((item, idx) => (
              <div key={item.id || idx} className="w-full flex-shrink-0 px-1">
                <div className="review-card flex flex-col justify-between min-h-[220px]">
                  <div>
                    {/* Stars */}
                    <div className="stars mb-2.5">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-amber-300 mr-1 text-xs sm:text-sm"></i>
                      ))}
                    </div>

                    {/* Text */}
                    <p className="review-text text-white/95 text-xs sm:text-sm leading-relaxed mb-4 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="reviewer flex items-center gap-3 pt-3 border-t border-white/15">
                    <div className="reviewer-avatar !w-9 !h-9 !text-xs">
                      {item.initials || (item.name || item.customer_name || 'TT').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong className="block text-white text-xs font-semibold">{item.name || item.customer_name || 'Traveler'}</strong>
                      <small className="text-white/75 text-[10px]">
                        {item.location} • {item.tour_taken}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Indicators */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIdx === idx ? 'w-6 bg-[#4BCE97]' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP & TABLET: Multi-Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <div key={item.id || idx} className="review-card flex flex-col justify-between">
              <div>
                {/* Stars */}
                <div className="stars mb-3">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-amber-300 mr-1 text-sm"></i>
                  ))}
                </div>

                {/* Text */}
                <p className="review-text text-white/90 text-sm leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="reviewer flex items-center gap-3 pt-3 border-t border-white/15">
                <div className="reviewer-avatar">
                  {item.initials || (item.name || item.customer_name || 'TT').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold">{item.name || item.customer_name || 'Traveler'}</strong>
                  <small className="text-white/70 text-xs">
                    {item.location} • {item.tour_taken}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white text-gray-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative my-4 flex flex-col">
            <div className="bg-gradient-to-r from-[#024a20] via-[#04823a] to-[#06C258] text-white p-5 sm:p-6 relative shrink-0 shadow-md">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <h3 className="text-lg font-bold font-display text-white">Share Your Experience</h3>
              <p className="text-xs text-white/80">Help fellow travelers discover the beauty of India</p>
            </div>

            <div className="p-5 sm:p-6">
              {reviewSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center text-sm">
                  <i className="fa-solid fa-circle-check text-2xl text-[#06C258] mb-2 block"></i>
                  <p className="font-bold">Thank you for your review!</p>
                  <p className="text-xs text-emerald-600 mt-1">Saved to Supabase.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Anand Deshmukh"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        placeholder="e.g. Parbhani / Nanded"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Tour Taken</label>
                      <input
                        type="text"
                        value={newReview.tour_taken}
                        onChange={(e) => setNewReview({ ...newReview, tour_taken: e.target.value })}
                        placeholder="e.g. Kashmir 6D/5N"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="text-lg focus:outline-none cursor-pointer"
                        >
                          <i
                            className={`fa-solid fa-star ${
                              star <= newReview.rating ? 'text-amber-400' : 'text-gray-300'
                            }`}
                          ></i>
                        </button>
                      ))}
                      <span className="text-xs text-gray-500 ml-2">({newReview.rating} out of 5 stars)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Feedback / Review *</label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.quote}
                      onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                      placeholder="Tell us about the hotel, cabs, itinerary, and experience..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#06C258] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-green !py-2 !px-5 !text-xs cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit to Supabase'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

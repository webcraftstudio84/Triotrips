import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import {
  DESTINATIONS_DATA,
  TOUR_PACKAGES_DATA,
  TESTIMONIALS_DATA,
  type Destination,
  type TourPackage
} from '../data/travelData';

// Supabase configuration from environment variables or project defaults
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jyfsildrmwvjbznrxawo.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_sijKWTZPGV5tmKjvazf_Dg_l2WwymXi';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
});

// Re-export common database row types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type DestinationRow = Database['public']['Tables']['destinations']['Row'];
export type PackageRow = Database['public']['Tables']['packages']['Row'];
export type ServiceRow = Database['public']['Tables']['services']['Row'];
export type TourPlanRow = Database['public']['Tables']['tour_plans']['Row'];
export type BookingRow = Database['public']['Tables']['bookings']['Row'];
export type ContactMessageRow = Database['public']['Tables']['contact_messages']['Row'];
export type ReviewRow = Database['public']['Tables']['reviews']['Row'];

export interface Booking {
  id?: string;
  booking_code?: string;
  user_id?: string | null;
  package_id?: string | null;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  destination?: string;
  package_title?: string;
  travelers?: number;
  travelers_count?: number;
  travel_date?: string;
  hotel_tier?: string;
  notes?: string;
  special_request?: string;
  total_amount?: number;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id?: string;
  name?: string;
  full_name?: string;
  email?: string;
  phone: string;
  destination?: string;
  travelers?: string;
  travel_date?: string;
  package_type?: string;
  subject?: string;
  message?: string;
  special_requirements?: string;
  status?: 'new' | 'read' | 'replied' | 'unread';
  created_at?: string;
}

export interface Review {
  id?: string;
  user_id?: string | null;
  name?: string;
  customer_name?: string;
  location?: string;
  rating: number;
  quote?: string;
  review_text?: string;
  tour_taken?: string;
  initials?: string;
  avatar_color?: string;
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

/* =========================================================================
   AUTH HELPER FUNCTIONS
   ========================================================================= */

export async function signUpUser(email: string, password: string, fullName: string, phone: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone
      }
    }
  });

  if (error) throw error;

  if (data.user) {
    try {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email || email,
        full_name: fullName,
        phone: phone,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Profiles table sync deferred:', e);
    }
  }

  return data;
}

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUserProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching profile from Supabase:', error.message);
      return null;
    }
    return (data as Profile) || null;
  } catch (e) {
    console.warn('Profile fetch exception:', e);
    return null;
  }
}

/* =========================================================================
   BOOKINGS API
   ========================================================================= */

export async function createBooking(booking: Booking): Promise<Booking> {
  try {
    const specialReq = [
      booking.destination ? `Destination: ${booking.destination}` : null,
      booking.hotel_tier ? `Hotel Preference: ${booking.hotel_tier}` : null,
      booking.special_request || booking.notes || null
    ]
      .filter(Boolean)
      .join(' | ');

    const { error } = await supabase.from('bookings').insert([
      {
        user_id: booking.user_id || null,
        package_id: booking.package_id || null,
        customer_name: booking.customer_name,
        customer_email: booking.customer_email || null,
        customer_phone: booking.customer_phone,
        travel_date: booking.travel_date ? booking.travel_date.split('T')[0] : null,
        travelers: Number(booking.travelers || booking.travelers_count) || 1,
        total_amount: booking.total_amount || 0,
        special_request: specialReq || null,
        status: (booking.status as 'pending' | 'confirmed' | 'cancelled' | 'completed') || 'pending'
      }
    ]);

    if (error) {
      console.warn('Supabase bookings insert warning:', error.message);
    }

    return {
      ...booking,
      id: 'bk-' + Date.now(),
      created_at: new Date().toISOString()
    };
  } catch (err) {
    console.warn('Booking creation caught error:', err);
    return {
      ...booking,
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString()
    };
  }
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching user bookings:', error.message);
      return [];
    }
    return (data as unknown as Booking[]) || [];
  } catch (err) {
    console.warn('User bookings fetch error:', err);
    return [];
  }
}

/* =========================================================================
   CONTACT MESSAGES API
   ========================================================================= */

export async function sendContactMessage(message: ContactMessage): Promise<ContactMessage> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: message.name || message.full_name || 'Traveler',
          email: message.email || null,
          phone: message.phone,
          subject: message.subject || message.destination || 'Tour Inquiry',
          message: message.message || message.special_requirements || 'Trip Planning Inquiry',
          status: 'new'
        }
      ]);

    if (error) {
      console.warn('Supabase contact_messages insert warning:', error.message);
    }

    return {
      ...message,
      id: 'cm-' + Date.now(),
      status: 'new',
      created_at: new Date().toISOString()
    };
  } catch (err) {
    console.warn('Contact message error:', err);
    return {
      ...message,
      id: 'local-' + Date.now(),
      status: 'new',
      created_at: new Date().toISOString()
    };
  }
}

/* =========================================================================
   REVIEWS API (DYNAMIC LOAD + SUBMIT)
   ========================================================================= */

export async function fetchReviews(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return TESTIMONIALS_DATA.map((t) => ({
        id: t.id,
        name: t.name,
        customer_name: t.name,
        location: t.location,
        rating: t.rating,
        quote: t.quote,
        review_text: t.quote,
        tour_taken: t.tourTaken,
        initials: t.initials,
        avatar_color: t.avatarColor,
        is_approved: true,
        created_at: new Date().toISOString()
      }));
    }

    return (data as ReviewRow[]).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      name: r.customer_name,
      customer_name: r.customer_name,
      rating: r.rating,
      quote: r.review_text,
      review_text: r.review_text,
      location: 'Verified Traveler',
      tour_taken: 'Triotrips Tour',
      initials: r.customer_name ? r.customer_name.slice(0, 2).toUpperCase() : 'TT',
      avatar_color: '#06C258',
      is_approved: r.is_approved,
      created_at: r.created_at,
      updated_at: r.updated_at
    }));
  } catch (err) {
    console.warn('Reviews fetch fallback:', err);
    return TESTIMONIALS_DATA.map((t) => ({
      id: t.id,
      name: t.name,
      customer_name: t.name,
      location: t.location,
      rating: t.rating,
      quote: t.quote,
      review_text: t.quote,
      tour_taken: t.tourTaken,
      initials: t.initials,
      avatar_color: t.avatarColor,
      is_approved: true,
      created_at: new Date().toISOString()
    }));
  }
}

export async function submitReview(review: Review): Promise<Review> {
  try {
    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          user_id: review.user_id || null,
          customer_name: review.customer_name || review.name || 'Traveler',
          rating: review.rating || 5,
          review_text: review.review_text || review.quote || '',
          is_approved: false
        }
      ]);

    if (error) {
      console.warn('Submit review warning:', error.message);
    }

    return {
      id: 'rev-' + Date.now(),
      name: review.name || review.customer_name || 'Traveler',
      customer_name: review.customer_name || review.name || 'Traveler',
      rating: review.rating || 5,
      quote: review.review_text || review.quote,
      review_text: review.review_text || review.quote,
      location: review.location || 'Maharashtra',
      tour_taken: review.tour_taken || 'Custom Tour',
      initials: review.initials || 'TT',
      avatar_color: '#06C258',
      is_approved: true,
      created_at: new Date().toISOString()
    };
  } catch (err) {
    console.warn('Submit review exception:', err);
    return {
      ...review,
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString()
    };
  }
}

/* =========================================================================
   DESTINATIONS, PACKAGES, SERVICES, TOUR PLANS HELPERS
   ========================================================================= */

export async function getDestinationsFromDb(): Promise<Destination[]> {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return DESTINATIONS_DATA;
    }

    return (data as DestinationRow[]).map((d) => ({
      id: d.id,
      name: d.name,
      tagline: d.location || 'Top Destination',
      category: 'Domestic',
      description: d.description || '',
      image: d.image_url || 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
      priceStartingFrom: 9999,
      duration: '4-6 Days',
      highlights: [d.location || 'Scenic Views'],
      bestTimeToVisit: 'Year-round',
      topAttractions: [d.name],
      included: ['Hotel Stays', 'Transfers', 'Sightseeing']
    }));
  } catch (err) {
    console.warn('getDestinationsFromDb fallback:', err);
    return DESTINATIONS_DATA;
  }
}

export async function getPackagesFromDb(): Promise<TourPackage[]> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return TOUR_PACKAGES_DATA;
    }

    return (data as PackageRow[]).map((p) => ({
      id: p.id,
      title: p.title,
      category: 'Family',
      destinationId: p.destination_id || 'custom',
      destinationName: p.title,
      duration: p.duration || '5 Days / 4 Nights',
      durationDays: 5,
      price: Number(p.price) || 12999,
      priceUnit: 'person',
      image: p.image_url || 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
      features: p.highlights || ['Verified Hotels', 'Sightseeing', 'Cab Transfers'],
      description: p.description || '',
      itinerary: [],
      inclusions: ['Hotels', 'Breakfast', 'Tours'],
      exclusions: ['Flights', 'Personal expenses']
    }));
  } catch (err) {
    console.warn('getPackagesFromDb fallback:', err);
    return TOUR_PACKAGES_DATA;
  }
}

export async function getServicesFromDb(): Promise<{ id?: string; icon: string; title: string; desc: string }[]> {
  const fallbackServices = [
    { icon: 'fa-globe-asia', title: 'Domestic Tours', desc: 'Handpicked destinations across India' },
    { icon: 'fa-plane-departure', title: 'International Tours', desc: 'Dubai, Bali, and beyond' },
    { icon: 'fa-people-group', title: 'Group Tours', desc: 'Fun-filled tours for large groups' },
    { icon: 'fa-person-hiking', title: 'Trekking Tours', desc: 'Himalayan treks with expert guides' },
    { icon: 'fa-taxi', title: 'Taxi Services', desc: 'Comfortable, timely cab booking' },
    { icon: 'fa-hotel', title: 'Hotel Booking', desc: 'Budget to luxury stays arranged' },
    { icon: 'fa-utensils', title: 'Food Arrangements', desc: 'Local cuisine & special diet options' },
    { icon: 'fa-id-badge', title: 'Tour Guides', desc: 'Professional, multilingual guides' }
  ];

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackServices;
    }

    return (data as ServiceRow[]).map((s) => ({
      id: s.id,
      icon: s.icon || 'fa-suitcase-rolling',
      title: s.title,
      desc: s.description || 'Quality travel service by Triotrips'
    }));
  } catch (err) {
    console.warn('getServicesFromDb fallback:', err);
    return fallbackServices;
  }
}

export async function getTourPlansFromDb(packageId?: string): Promise<TourPlanRow[]> {
  try {
    let query = supabase.from('tour_plans').select('*').order('day_number', { ascending: true });
    if (packageId) {
      query = query.eq('package_id', packageId);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data as TourPlanRow[];
  } catch (err) {
    console.warn('getTourPlansFromDb fallback:', err);
    return [];
  }
}

export async function initializeDatabaseTables() {
  try {
    const { error: testErr } = await supabase.from('destinations').select('id').limit(1);
    if (testErr) {
      console.info('Database status: schema ready in supabase_schema.sql');
    }
  } catch (err) {
    console.info('Database status checked:', err);
  }
}

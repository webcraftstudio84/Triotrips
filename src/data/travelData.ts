export interface Destination {
  id: string;
  name: string;
  tagline: string;
  category: 'Domestic' | 'International';
  description: string;
  image: string;
  priceStartingFrom: number;
  duration: string;
  highlights: string[];
  bestTimeToVisit: string;
  topAttractions: string[];
  included: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  category: 'Budget' | 'Honeymoon' | 'Family' | 'Group & Adventure';
  destinationId: string;
  destinationName: string;
  duration: string;
  durationDays: number;
  price: number;
  priceUnit: 'person' | 'couple';
  originalPrice?: number;
  image: string;
  badge?: string;
  features: string[];
  description: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'primary' | 'addon';
  description: string;
  features: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  initials: string;
  rating: number;
  quote: string;
  tourTaken: string;
  avatarColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'packages' | 'custom' | 'international';
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'kashmir',
    name: 'Kashmir',
    tagline: 'Paradise on Earth',
    category: 'Domestic',
    description: 'Breathtaking beauty – snow-capped peaks, shimmering Dal Lake, lush meadows of Gulmarg, and the paradise of Pahalgam.',
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 12999,
    duration: '5–7 Days',
    highlights: ['Dal Lake', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
    bestTimeToVisit: 'March to October (Summer & Autumn) / Dec to Feb (Snow)',
    topAttractions: ['Shikara ride on Dal Lake', 'Gulmarg Gondola cable car ride', 'Betaab & Aru Valley in Pahalgam', 'Sonamarg Thajiwas Glacier'],
    included: ['Verified Deluxe Hotels', 'Houseboat Stay', 'Private AC Vehicle', 'Daily Breakfast & Dinner', 'Shikara Ride Ticket']
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Sun, Sand & Seafood',
    category: 'Domestic',
    description: "India's most vibrant coastal destination. Pristine beaches, Portuguese heritage, thrilling water sports, and delicious seafood.",
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 6999,
    duration: '3–5 Days',
    highlights: ['Baga Beach', 'Old Goa', 'Water Sports', 'Mandovi Cruise'],
    bestTimeToVisit: 'October to May',
    topAttractions: ['Calangute & Baga beach parties', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls trip', 'Sunset cruise on Mandovi River'],
    included: ['Beachside Resort Stays', 'AC Coach / Private Cab Transfers', 'Complimentary Breakfast', 'North & South Goa Tours']
  },
  {
    id: 'manali',
    name: 'Manali',
    tagline: 'Adventure Capital of India',
    category: 'Domestic',
    description: 'Snow valleys, river rafting on the Beas, paragliding in Solang, Rohtang Pass — the ultimate mountain getaway nestled in Kullu Valley.',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 8999,
    duration: '4–6 Days',
    highlights: ['Rohtang Pass', 'Paragliding', 'Beas River Rafting', 'Solang Valley'],
    bestTimeToVisit: 'Year-round (Summer greenery or Winter snow)',
    topAttractions: ['Solang Valley adventure sports', 'Atal Tunnel & Sissu waterfall', 'Hadimba Devi ancient wooden temple', 'Mall Road evening stroll'],
    included: ['Mountain-view Hotels', 'All Sightseeing in Private/Shared Cab', 'Rohtang Pass Permit Assistance', 'Breakfast & Dinner']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: "God's Own Country",
    category: 'Domestic',
    description: 'Houseboat rides in Alleppey, lush tea gardens of Munnar, wildlife in Thekkady, ayurvedic wellness retreats, and golden beaches.',
    image: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 10999,
    duration: '5–7 Days',
    highlights: ['Backwaters', 'Munnar Tea Gardens', 'Ayurveda Spa', 'Kovalam Beach'],
    bestTimeToVisit: 'September to March',
    topAttractions: ['Alleppey luxury houseboat cruise', 'Munnar tea estates & Mattupetty Dam', 'Periyar Wildlife Sanctuary boat safari', 'Kovalam light house beach'],
    included: ['Houseboat Night Stay with All Meals', 'Hill-resort stays in Munnar', 'AC Sedan/SUV Private transfers', 'Tea Plantation entry']
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Land of Kings',
    category: 'Domestic',
    description: 'Royal palaces, golden sand dunes, vibrant folk culture, and majestic forts. Jaipur, Udaipur, Jodhpur — every city tells a grand story.',
    image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 9499,
    duration: '6–8 Days',
    highlights: ['Jaipur Forts', 'Desert Safari', 'Udaipur Lakes', 'Camel Ride'],
    bestTimeToVisit: 'October to March',
    topAttractions: ['Amber Fort & Hawa Mahal in Jaipur', 'Lake Pichola boat ride in Udaipur', 'Sam Sand Dunes campfire & folk dance', 'Mehrangarh Fort in Jodhpur'],
    included: ['Heritage Palace Hotels', 'Desert Swiss Tent Stay with Cultural Night', 'AC Sleeper / Private Vehicle', 'Breakfast & Dinner']
  },
  {
    id: 'dubai',
    name: 'Dubai',
    tagline: 'City of Gold & Wonder',
    category: 'International',
    description: 'Marvel at the Burj Khalifa, thrill on desert 4x4 safaris, shop at world-class malls, and experience unmatched Middle Eastern luxury.',
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 35999,
    duration: '5–7 Days',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Dhow Cruise'],
    bestTimeToVisit: 'November to April',
    topAttractions: ['Burj Khalifa 124th Floor observatory', 'Desert Safari with BBQ dinner & Tanoura show', 'Marina Dhow Cruise dinner', 'Dubai Aquarium & Underwater Zoo'],
    included: ['4-Star Luxury City Hotel', 'UAE Tourist Visa & Insurance', 'Airport Pick & Drop', 'Daily Breakfast', 'All Entry Tickets']
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    tagline: 'Island of the Gods',
    category: 'International',
    description: 'Lush green rice terraces, ancient Hindu cliff temples, stunning ocean sunsets, surfing in Seminyak, and spiritual retreats in Ubud.',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceStartingFrom: 39999,
    duration: '6–8 Days',
    highlights: ['Tanah Lot Temple', 'Tegalalang Rice Terraces', 'Surfing', 'Ubud Wellness'],
    bestTimeToVisit: 'April to October',
    topAttractions: ['Ubud Monkey Forest & Rice Terraces', 'Tanah Lot & Uluwatu Sunset Temple', 'Nusa Penida island day tour', 'Bali Swing & Kintamani Volcano'],
    included: ['Private Pool Villa + Resort', 'Private AC Car with English Guide', 'Water activities & Bali Swing', 'Daily Breakfast & 2 Romantic Dinners']
  }
];

export const TOUR_PACKAGES_DATA: TourPackage[] = [
  // Budget Packages
  {
    id: 'pkg-budget-goa',
    title: 'Goa Budget Escape',
    category: 'Budget',
    destinationId: 'goa',
    destinationName: 'Goa',
    duration: '3 Nights / 4 Days',
    durationDays: 4,
    price: 4999,
    priceUnit: 'person',
    originalPrice: 7500,
    badge: 'Budget Pick',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience the best of Goa beaches, vibrant nightlife, and Portuguese culture without straining your wallet.',
    features: ['3-Star Hotel Stay', 'AC Bus Transport', 'Beach Tour (North & South)', 'Breakfast Included'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa & Beach Leisure',
        description: 'Pick up from Thivim/Madgaon railway station or bus stand, check-in to hotel. Evening walk along Calangute and Baga beach.',
        activities: ['Hotel check-in', 'Welcome drink', 'Evening beach stroll', 'Night market visit']
      },
      {
        day: 2,
        title: 'North Goa Beaches & Fort Aguada',
        description: 'Explore historical Fort Aguada overlooking the Arabian Sea, followed by water sports at Anjuna and Vagator beach.',
        activities: ['Fort Aguada lighthouse', 'Anjuna Beach flea market', 'Vagator viewpoints', 'Sunset at Chapora Fort']
      },
      {
        day: 3,
        title: 'South Goa Heritage & Sunset Cruise',
        description: 'Visit Old Goa churches (Basilica of Bom Jesus), Mangueshi Temple, and enjoy a magical 1-hour sunset cruise on Mandovi River.',
        activities: ['Old Goa heritage tour', 'Miramar beach', 'Mandovi river cruise', 'Local Goan dinner']
      },
      {
        day: 4,
        title: 'Souvenir Shopping & Departure',
        description: 'Morning free for shopping at Panjim market. Check out and transfer to station/bus stand with sweet memories.',
        activities: ['Cashew and spice shopping', 'Hotel check-out', 'Transfer to station']
      }
    ],
    inclusions: ['3 Nights stay in verified 3-star AC hotel', 'Daily breakfast', 'North & South Goa sightseeing in AC coach', 'Mandovi cruise ticket', 'Railway/Bus station transfers'],
    exclusions: ['Lunch and dinner', 'Water sports charges', 'Personal expenses', 'Anything not mentioned in inclusions']
  },
  {
    id: 'pkg-budget-manali',
    title: 'Manali Budget Trip',
    category: 'Budget',
    destinationId: 'manali',
    destinationName: 'Manali',
    duration: '4 Nights / 5 Days',
    durationDays: 5,
    price: 6999,
    priceUnit: 'person',
    originalPrice: 9999,
    badge: 'Most Popular Budget',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pocket-friendly mountain escape to Manali. Enjoy snow viewpoints, ancient pine forests, and riverside relaxation.',
    features: ['Guesthouse / Hotel Stay', 'Shared AC Volvo / Cab', 'Rohtang / Solang Permit', 'Breakfast & Dinner Included'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali & Local Town Walk',
        description: 'Arrive at Manali bus stop, transfer to hotel. Visit Hadimba Temple, Club House, and stroll through Mall Road.',
        activities: ['Check-in', 'Hadimba Devi Temple', 'Vashisht hot sulfur baths', 'Mall Road exploration']
      },
      {
        day: 2,
        title: 'Solang Valley Adventure Day',
        description: 'Full-day excursion to Solang Valley for thrilling adventures including ropeway, zorbing, and quad biking.',
        activities: ['Solang Valley excursion', 'Snow point view', 'Paragliding options', 'Campfire evening at hotel']
      },
      {
        day: 3,
        title: 'Atal Tunnel & Sissu Waterfall',
        description: 'Drive through the marvel of engineering — Atal Tunnel — into the scenic Lahaul Valley and Sissu waterfall.',
        activities: ['Atal Tunnel transit', 'Sissu waterfall sightseeing', 'Snow photography', 'Return to hotel for dinner']
      },
      {
        day: 4,
        title: 'Naggar Castle & River Rafting Point',
        description: 'Visit historic Naggar Castle and Kullu shawls factory. Experience thrilling river rafting on the Beas River.',
        activities: ['Naggar Castle art gallery', 'Kullu river rafting point', 'Shawl weaving demo', 'Dinner at hotel']
      },
      {
        day: 5,
        title: 'Shopping & Departure to Delhi/Chandigarh',
        description: 'Morning at leisure for local fruit & craft shopping before evening departure by Volvo coach.',
        activities: ['Tibetan monastery visit', 'Souvenir shopping', 'Board return Volvo bus']
      }
    ],
    inclusions: ['4 Nights comfortable stay with scenic view', 'Daily Breakfast & Dinner', 'Solang Valley and Local Sightseeing transfers', 'Atal Tunnel & Sissu permit assistance', 'Toll taxes and driver allowances'],
    exclusions: ['Adventure activities charges', 'Rohtang Pass entry fee (if applied by NGT)', 'Lunches', 'Heater charges at hotel']
  },
  {
    id: 'pkg-budget-rajasthan',
    title: 'Rajasthan Heritage Tour',
    category: 'Budget',
    destinationId: 'rajasthan',
    destinationName: 'Rajasthan',
    duration: '5 Nights / 6 Days',
    durationDays: 6,
    price: 8499,
    priceUnit: 'person',
    originalPrice: 12500,
    badge: 'Cultural Value',
    image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Explore the Pink City Jaipur, City of Lakes Udaipur, and historic forts with comfortable stays and authentic Rajasthani meals.',
    features: ['Heritage Hotel Stay', 'AC Sleeper Coach / Cab', '4 Cities Covered', 'Breakfast & Dinner'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur & City Palace',
        description: 'Arrive in Jaipur. Check in and visit the magnificent City Palace, Jantar Mantar, and view Hawa Mahal.',
        activities: ['Hotel check-in', 'City Palace museum', 'Jantar Mantar observatory', 'Johari Bazaar shopping']
      },
      {
        day: 2,
        title: 'Amber Fort & Nahargarh Sunset',
        description: 'Ascend Amber Fort, visit Jal Mahal on the lake, and watch the golden sunset over Jaipur from Nahargarh Fort.',
        activities: ['Amber Fort tour', 'Elephant/Jeep ride point', 'Jal Mahal photo-stop', 'Nahargarh sunset view']
      },
      {
        day: 3,
        title: 'Jaipur to Pushkar & Ajmer Sharif',
        description: 'Drive to sacred Pushkar Lake and Brahma Temple, stop at holy Ajmer Sharif Dargah, and proceed toward Jodhpur.',
        activities: ['Brahma Temple visit', 'Pushkar Holy Lake Ghats', 'Ajmer Dargah', 'Overnight transit to Udaipur']
      },
      {
        day: 4,
        title: 'Udaipur Lake Pichola & City Palace',
        description: 'Explore Udaipur City Palace overlooking Lake Pichola, Jag Mandir, and Saheliyon Ki Bari royal gardens.',
        activities: ['Udaipur City Palace', 'Lake Pichola boat cruise', 'Saheliyon ki Bari', 'Dharohar folk dance show']
      },
      {
        day: 5,
        title: 'Kumbhalgarh Fort & Fatehsagar Lake',
        description: 'Excursion to the giant wall of Kumbhalgarh Fort and evening stroll along tranquil Fatehsagar Lake.',
        activities: ['Kumbhalgarh Fort trek', 'Fatehsagar Lake promenade', 'Traditional Rajasthani Thali dinner']
      },
      {
        day: 6,
        title: 'Departure with Royal Memories',
        description: 'Check out and transfer to Udaipur/Jaipur railway station or airport.',
        activities: ['Marble & handicraft shopping', 'Check-out', 'Transfer to station']
      }
    ],
    inclusions: ['5 Nights accommodation in heritage & standard hotels', 'Daily Breakfast & Dinner', 'Intercity transfers by AC vehicle', 'Driver charges, tolls, and parking'],
    exclusions: ['Monument entry tickets & guide fees', 'Lunches', 'Camera fees', 'Personal laundry/tips']
  },

  // Honeymoon Packages
  {
    id: 'pkg-honeymoon-kashmir',
    title: 'Kashmir Romantic Escape',
    category: 'Honeymoon',
    destinationId: 'kashmir',
    destinationName: 'Kashmir',
    duration: '5 Nights / 6 Days',
    durationDays: 6,
    price: 14999,
    priceUnit: 'couple',
    originalPrice: 22000,
    badge: 'Best Seller Honeymoon',
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fall in love amidst snow peaks and serene waters. Includes luxury Dal Lake houseboat, private Shikara, and flower-bed decoration.',
    features: ['Luxury Houseboat Stay', 'Shikara Ride on Dal Lake', 'Couple Activities & Photography', 'Candlelight Dinner & Flower Bed'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Shikara Ride',
        description: 'Warm Kashmiri welcome at Srinagar Airport. Check in to Deluxe Dal Lake Houseboat. 1-hour romantic Shikara sunset ride.',
        activities: ['Airport pickup in private cab', 'Houseboat check-in with Kahwa tea', 'Sunset Shikara ride', 'Romantic candlelight dinner on houseboat']
      },
      {
        day: 2,
        title: 'Mughal Gardens & Srinagar Heritage',
        description: 'Visit the timeless Shalimar Bagh, Nishat Bagh, and the iconic Shankaracharya Temple perched atop the hill.',
        activities: ['Shalimar & Nishat Bagh', 'Chashme Shahi spring', 'Old Srinagar spice & dry fruit bazaar', 'Hotel check-in']
      },
      {
        day: 3,
        title: 'Gulmarg Meadow of Flowers & Gondola Ride',
        description: 'Excursion to Gulmarg. Take the world-famous Gondola cable car ride up to snow point Apharwat Peak.',
        activities: ['Drive along walnut orchards', 'Gulmarg Gondola Phase 1 & 2', 'Snow photography for couple', 'Return to Srinagar hotel']
      },
      {
        day: 4,
        title: 'Pahalgam Valley of Shepherds & Betaab Valley',
        description: 'Drive along saffron fields to Pahalgam. Visit picturesque Betaab Valley, Aru Valley, and Chandanwari by local union cab.',
        activities: ['Pampore saffron fields visit', 'Lidder river stroll', 'Betaab Valley photoshoot', 'Pahalgam riverfront resort stay']
      },
      {
        day: 5,
        title: 'Sonamarg Meadow of Gold Excursion',
        description: 'Day tour to majestic Sonamarg. Enjoy views of Thajiwas Glacier and pony ride across glacial streams.',
        activities: ['Sindh river drive', 'Thajiwas glacier pony ride', 'Snow play for couples', 'Farewell gala dinner']
      },
      {
        day: 6,
        title: 'Departure with Kashmiri Saffron & Memories',
        description: 'Morning breakfast overlooking the Himalayas. Drop at Srinagar airport for your onward flight.',
        activities: ['Breakfast', 'Saffron & Pashmina shopping assistance', 'Airport drop']
      }
    ],
    inclusions: ['1 Night in Deluxe Houseboat + 4 Nights in 4-Star Mountain Resorts', 'Daily Buffet Breakfast & Dinner', 'Private AC Sedan dedicated throughout tour', 'Romantic Shikara ride on Dal Lake', 'Honeymoon inclusion: 1 Candlelight dinner & flower bed decoration', 'Airport pickup and drop'],
    exclusions: ['Flight tickets', 'Gondola tickets & Pahalgam union cab', 'Lunches', 'Pony/Horse rides']
  },
  {
    id: 'pkg-honeymoon-kerala',
    title: 'Kerala Backwater Romance',
    category: 'Honeymoon',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    duration: '6 Nights / 7 Days',
    durationDays: 7,
    price: 16999,
    priceUnit: 'couple',
    originalPrice: 24500,
    badge: 'Pure Romance',
    image: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Float through tranquil palm-lined canals on a private houseboat and wake up to mist-covered tea plantations in Munnar.',
    features: ['Private Houseboat Experience', 'Ayurvedic Couple Spa Session', 'Beach Sunset Dinner', 'All Meals on Houseboat Included'],
    itinerary: [
      {
        day: 1,
        title: 'Cochin Arrival & Drive to Munnar Hills',
        description: 'Pickup from Cochin Airport/Station. Scenic drive through Cheeyappara and Valara waterfalls to Munnar hill station.',
        activities: ['Airport pickup', 'Waterfall photo-stops', 'Tea garden viewpoint', 'Resort check-in & romantic welcome']
      },
      {
        day: 2,
        title: 'Munnar Tea Estates & Eravikulam Park',
        description: 'Explore Eravikulam National Park (home to Nilgiri Tahr), Mattupetty Dam, Echo Point, and Tea Museum.',
        activities: ['Tea museum tasting session', 'Mattupetty lake speed boating', 'Echo point', 'Candlelight dinner at resort']
      },
      {
        day: 3,
        title: 'Munnar to Thekkady Spice Plantations',
        description: 'Drive to Thekkady. Walk hand-in-hand through fragrant cardamom and pepper plantations followed by Kathakali show.',
        activities: ['Spice plantation guided tour', 'Periyar wildlife lake boat safari', 'Kathakali cultural dance performance']
      },
      {
        day: 4,
        title: 'Alleppey Private Luxury Houseboat Cruise',
        description: 'Board your private luxury AC houseboat at noon. Cruise through Vembanad Lake canals with personal chef.',
        activities: ['Houseboat check-in at 12:00 PM', 'Authentic Kerala lunch on board', 'Backwater sunset watch', 'Freshly prepared dinner & overnight cruise']
      },
      {
        day: 5,
        title: 'Alleppey to Kovalam Beach Resort',
        description: 'Disembark after breakfast and drive to Kovalam. Relax on Lighthouse Beach and enjoy couple Ayurvedic massage.',
        activities: ['Lighthouse Beach stroll', 'Couple Ayurvedic herbal massage', 'Sunset on Hawa beach', 'Beachfront seafood dinner']
      },
      {
        day: 6,
        title: 'Poovar Island & Mangrove Boat Safari',
        description: 'Day trip to magical Poovar Golden Sand Beach where lake meets the Arabian Sea through dense mangroves.',
        activities: ['Poovar Island motorized boat cruise', 'Floating restaurant visit', 'Beach relax time']
      },
      {
        day: 7,
        title: 'Trivandrum City & Departure',
        description: 'Visit Padmanabhaswamy Temple if interested. Drop at Trivandrum or Cochin airport for return flight.',
        activities: ['Temple exterior visit', 'Handloom saree shopping', 'Airport drop']
      }
    ],
    inclusions: ['Private 1-Bedroom AC Deluxe Houseboat with all meals', '5 Nights in 4-Star resorts (Munnar, Thekkady, Kovalam)', 'Daily breakfast in hotels + all meals in houseboat', 'Private AC Dzire / Etios for all 7 days', 'Complimentary Honeymoon Cake & Flower decor', 'Couple Ayurvedic massage voucher'],
    exclusions: ['Airfare / Train fare', 'Entry tickets to monuments & parks', 'Boat safari fees at Periyar']
  },
  {
    id: 'pkg-honeymoon-bali',
    title: 'Bali Romantic Getaway',
    category: 'Honeymoon',
    destinationId: 'bali',
    destinationName: 'Bali, Indonesia',
    duration: '6 Nights / 7 Days',
    durationDays: 7,
    price: 49999,
    priceUnit: 'couple',
    originalPrice: 72000,
    badge: 'Luxury International',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Private pool villa in Seminyak, swing over Ubud jungle terraces, seaside romantic candlelit dinner on Jimbaran beach.',
    features: ['Private Pool Villa Stay', 'Couple Balinese Spa Sessions', 'Sunset Boat Cruise', 'Romantic Candlelight Dinner Setup'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar & Seminyak Pool Villa',
        description: 'Warm Balinese garland welcome at Ngurah Rai Airport. Check in to your private pool villa in Seminyak.',
        activities: ['Private airport transfer', 'Flower pool decor setup', 'Welcome tropical fruit basket', 'Relax in private pool']
      },
      {
        day: 2,
        title: 'Uluwatu Sunset Temple & Kecak Dance',
        description: 'Visit the famous Melasti Beach and cliff-hanging Uluwatu Temple with breathtaking sunset Kecak fire dance.',
        activities: ['Melasti Beach swim', 'Uluwatu cliff temple tour', 'Kecak & Fire Dance show', 'Candlelight seafood dinner at Jimbaran Bay']
      },
      {
        day: 3,
        title: 'Ubud Jungle Swing & Rice Terraces',
        description: 'Explore the heart of Bali art & nature in Ubud. Fly over the jungle canopy on the iconic Bali couple swing.',
        activities: ['Tegalalang Rice Terraces', 'Aloha / Aloha Ubud Swing', 'Tegenungan Waterfall', 'Ubud Art Market stroll']
      },
      {
        day: 4,
        title: 'Nusa Penida Island Tour by Speedboat',
        description: 'Take a fast boat to Nusa Penida to witness the jaw-dropping Kelingking T-Rex cliff and Broken Beach.',
        activities: ['Speedboat transfer', 'Kelingking Beach photo point', 'Angel Billabong natural pool', 'Snorkeling at Crystal Bay']
      },
      {
        day: 5,
        title: 'Ulun Danu Beratan & Tanah Lot Temple',
        description: 'Visit the floating temple on Lake Beratan and watch sunset at Tanah Lot rock formation temple.',
        activities: ['Ulun Danu Beratan temple', 'Handara Iconic Gate photo', 'Tanah Lot ocean sunset', 'Balinese couple massage session']
      },
      {
        day: 6,
        title: 'Leisure Day & Beach Club Sunset',
        description: 'Enjoy a leisurely morning in your villa. Spend the afternoon at Finns or Potato Head beach club.',
        activities: ['Floating breakfast in pool', 'Spa treatment', 'Sunset lounge at beach club']
      },
      {
        day: 7,
        title: 'Souvenir Shopping & Airport Drop',
        description: 'Pick up authentic Balinese handicrafts, coffee, and souvenirs before your flight home.',
        activities: ['Krisna Oleh Oleh souvenir store', 'Airport transfer with farewell gift']
      }
    ],
    inclusions: ['3 Nights in Private Pool Villa + 3 Nights in 4-Star Resort', 'Daily floating/buffet breakfast', 'Private AC car with English-speaking chauffeur', 'Nusa Penida day tour with speed boat tickets', 'Uluwatu Kecak dance & Jimbaran romantic dinner', 'Sim card & visa guidance assistance'],
    exclusions: ['International flight tickets', 'Indonesia Visa on Arrival (approx $35 per person)', 'Personal water sport add-ons']
  },

  // Family Tour Packages
  {
    id: 'pkg-family-goa',
    title: 'Goa Family Funfest',
    category: 'Family',
    destinationId: 'goa',
    destinationName: 'Goa',
    duration: '4 Nights / 5 Days',
    durationDays: 5,
    price: 9999,
    priceUnit: 'person',
    originalPrice: 14000,
    badge: 'Family Favorite',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Designed for memorable family bonding. Includes spacious family suites, kids water park entry, dolphin spotting, and beach fun.',
    features: ['Family Suite Room Booking', 'Kids Activities & Water Park', 'Dolphin Spotting Boat Ride', 'Wholesome Family Meals Included'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Family Resort Check-in',
        description: 'Pick up from station/airport, check in to family-friendly beach resort with swimming pool.',
        activities: ['Resort pool fun for kids', 'Evening stroll at Candolim beach', 'Welcome buffet dinner']
      },
      {
        day: 2,
        title: 'Dolphin Safari & North Goa Highlights',
        description: 'Morning boat ride to spot wild dolphins in the Arabian Sea, followed by Fort Aguada and Calangute market.',
        activities: ['Dolphin spotting boat cruise', 'Aguada Fort exploration', 'Calangute beach fun', 'Souvenir shopping']
      },
      {
        day: 3,
        title: 'Splashdown Water Park & Spice Farm Tour',
        description: 'Visit an aromatic Goan spice plantation with traditional buffet lunch on banana leaves, followed by water park slides.',
        activities: ['Sahakari Spice Plantation tour with elephant bath', 'Traditional Goan lunch', 'Water park rides for kids & parents']
      },
      {
        day: 4,
        title: 'South Goa Sightseeing & Mandovi Cruise',
        description: 'Visit historic churches of Old Goa, Miramar beach, and evening family entertainment cruise.',
        activities: ['Basilica of Bom Jesus', 'Se Cathedral', '1-hour Mandovi River Cruise with Goan folk dance']
      },
      {
        day: 5,
        title: 'Farewell Goa & Departure',
        description: 'Breakfast, morning beach swim, check out and transfer to airport or railway station.',
        activities: ['Resort breakfast', 'Packing & check-out', 'Station/Airport transfer']
      }
    ],
    inclusions: ['4 Nights in 4-Star Family Resort with swimming pool', 'Daily Breakfast & Dinner', 'Private AC Innova/Tempo Traveller for entire family', 'Dolphin safari boat tickets', 'Spice plantation entry with buffet lunch', 'Mandovi cruise tickets'],
    exclusions: ['Air/Train fare', 'Personal water sports', 'Extra snacks/beverages']
  },
  {
    id: 'pkg-family-kashmir',
    title: 'Kashmir Family Dream',
    category: 'Family',
    destinationId: 'kashmir',
    destinationName: 'Kashmir',
    duration: '6 Nights / 7 Days',
    durationDays: 7,
    price: 18999,
    priceUnit: 'person',
    originalPrice: 26000,
    badge: 'All-Inclusive Dream',
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The ultimate vacation for parents and children. Safe, comfortable 4-star hotels, luxury houseboat, and Gondola snow experience.',
    features: ['4-Star Hotel Stay + Houseboat', 'Houseboat Family Experience', 'Gondola Cable Car Phase 1', 'All Meals (Breakfast & Dinner)'],
    itinerary: [
      {
        day: 1,
        title: 'Srinagar Arrival & Dal Lake Houseboat Experience',
        description: 'Warm welcome at Srinagar airport. Transfer to luxury Dal Lake houseboat. Family Shikara ride.',
        activities: ['Garland welcome', 'Houseboat check-in', 'Shikara boat ride across floating market', 'Family dinner on Dal Lake']
      },
      {
        day: 2,
        title: 'Mughal Gardens & Shankaracharya Temple',
        description: 'Visit Nishat, Shalimar, Cheshma Shahi gardens with blooming flowers and fountains. Kids enjoy Kashmiri costume photoshoot.',
        activities: ['Mughal gardens tour', 'Traditional costume photography', 'Old Srinagar crafts shopping']
      },
      {
        day: 3,
        title: 'Gulmarg Snow World & Gondola Cable Car',
        description: 'Drive to Gulmarg. Take the world famous cable car ride into the snow mountains.',
        activities: ['Gondola cable car Phase 1 ride', 'Snowman making & sledge rides for kids', 'Scenic mountain lunch']
      },
      {
        day: 4,
        title: 'Pahalgam Valley & Lidder Riverbank',
        description: 'Scenic journey to Pahalgam. Check in to riverfront resort and relax amidst towering pine trees.',
        activities: ['Saffron fields stop at Pampore', 'Apple orchard visit', 'Riverside walk & bonfire night']
      },
      {
        day: 5,
        title: 'Betaab Valley & Baisaran Mini Switzerland',
        description: 'Excursion to Betaab Valley, Aru Valley, and optional pony trek to Baisaran meadow.',
        activities: ['Betaab valley park stroll', 'Family picnic amidst meadows', 'Pony ride to Baisaran']
      },
      {
        day: 6,
        title: 'Sonamarg Day Trip & Glacial Streams',
        description: 'Visit Sonamarg, the gateway to Ladakh. Marvel at Thajiwas Glacier and snowy valleys.',
        activities: ['Sonamarg valley tour', 'Glacier view point', 'Return to Srinagar hotel for farewell dinner']
      },
      {
        day: 7,
        title: 'Departure from Srinagar Airport',
        description: 'Transfer to Srinagar Airport with unforgettable memories and authentic Kashmiri walnut/dry fruits.',
        activities: ['Breakfast', 'Airport drop by private vehicle']
      }
    ],
    inclusions: ['6 Nights stay (1 Night Houseboat + 5 Nights 4-Star Resorts)', 'Daily Breakfast & Dinner', 'Private Tempo Traveller / AC Innova with experienced hill driver', 'Dal Lake Shikara ride', '24/7 dedicated local tour manager assistance'],
    exclusions: ['Airfare', 'Union cab fees in Pahalgam / Sonamarg', 'Gondola Phase 2 tickets', 'Lunches']
  },
  {
    id: 'pkg-family-dubai',
    title: 'Dubai Family Adventure',
    category: 'Family',
    destinationId: 'dubai',
    destinationName: 'Dubai, UAE',
    duration: '5 Nights / 6 Days',
    durationDays: 6,
    price: 42999,
    priceUnit: 'person',
    originalPrice: 58000,
    badge: 'International Best',
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Explore the futuristic metropolis with family. Includes Burj Khalifa observation deck, desert safari with BBQ, and theme park passes.',
    features: ['4-Star City Hotel Stay', 'Desert Safari with BBQ Dinner', 'Burj Khalifa 124th Floor Entry', 'Theme Park Passes & Aquarium'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise',
        description: 'Arrive at Dubai International Airport. Transfer to 4-star hotel. Evening luxury Marina Dhow Cruise with international buffet dinner.',
        activities: ['Airport pickup in private coach', 'Hotel check-in', 'Dubai Marina Dhow Cruise with live Tanoura dance show']
      },
      {
        day: 2,
        title: 'Half Day City Tour & Burj Khalifa At The Top',
        description: 'Panoramic city tour of Dubai (Dubai Frame photo stop, Jumeirah Mosque, Burj Al Arab). Visit Dubai Mall and 124th floor of Burj Khalifa.',
        activities: ['Dubai city tour', 'Dubai Mall fountain show', 'Burj Khalifa 124/125th floor tickets', 'Dubai Aquarium tunnel visit']
      },
      {
        day: 3,
        title: 'Desert Safari with Dune Bashing & BBQ Night',
        description: 'Afternoon 4x4 Land Cruiser desert safari with exciting dune bashing, camel rides, sandboarding, and belly dance BBQ dinner.',
        activities: ['4x4 Dune Bashing in red dunes', 'Sunset photography', 'Camel ride & Henna painting', 'BBQ dinner buffet with Fire show']
      },
      {
        day: 4,
        title: 'Dubai Miracle Garden & Global Village',
        description: 'Visit the world’s largest natural flower garden (Miracle Garden) and cultural extravaganza at Global Village pavilions.',
        activities: ['Miracle garden flower displays', 'Global Village shopping & street food', 'Cultural stage performances']
      },
      {
        day: 5,
        title: 'Aquaventure Waterpark at Atlantis / Bollywood Park',
        description: 'Full day family fun at Aquaventure Waterpark at Atlantis The Palm, with private beach and exhilarating water slides.',
        activities: ['Aquaventure full day access', 'Lost Chambers aquarium tour', 'Monorail ride across Palm Jumeirah']
      },
      {
        day: 6,
        title: 'Gold Souk Shopping & Airport Departure',
        description: 'Morning visit to famous Deira Gold and Spice Souk. Transfer to airport for flight back to India.',
        activities: ['Deira Gold Souk & Meena Bazaar shopping', 'Hotel check-out', 'Airport drop']
      }
    ],
    inclusions: ['5 Nights in 4-Star Dubai city hotel with pool & gym', 'Daily breakfast buffet', 'UAE 30-Day Tourist Visa with COVID travel insurance', 'Burj Khalifa (124th Flr) & Dubai Aquarium combo ticket', 'Desert Safari in 4x4 with BBQ dinner', 'Marina Dhow Cruise with dinner', 'Roundtrip Dubai airport transfers'],
    exclusions: ['International flight tickets', 'Tourism Dirham fee (approx AED 15/room/night)', 'Lunch & personal shopping expenses']
  },

  // Group & Adventure Tours
  {
    id: 'pkg-adv-manali-trek',
    title: 'Manali Trekking Expedition',
    category: 'Group & Adventure',
    destinationId: 'manali',
    destinationName: 'Manali',
    duration: '7 Nights / 8 Days',
    durationDays: 8,
    price: 11999,
    priceUnit: 'person',
    originalPrice: 17500,
    badge: 'Adventure High',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trek the alpine meadows of Bhrigu Lake / Hampta Pass with certified mountain guides, alpine camping equipment, and river rafting.',
    features: ['Certified Mountain Guides', 'Camping Equipment & Alpine Tents', 'Beas River Rafting included', 'All Meals at High-Altitude Camps'],
    itinerary: [
      {
        day: 1,
        title: 'Base Camp Assembly in Manali',
        description: 'Report at Manali base camp. Briefing, gear check, and acclimatization walk to Jogini Waterfalls.',
        activities: ['Base camp briefing', 'Acclimatization trek to Jogini falls', 'Equipment distribution', 'Campfire dinner']
      },
      {
        day: 2,
        title: 'Trek from Gulaba to Rola Kholi Camp',
        description: 'Scenic ascent through deodar and oak forests opening into lush green alpine meadows of Rola Kholi.',
        activities: ['Drive to Gulaba trailhead', '5 hours scenic trek', 'Alpine camp pitch', 'Stargazing at night']
      },
      {
        day: 3,
        title: 'Summit Day: Trek to Sacred Bhrigu Lake',
        description: 'Trek up to the high-altitude glacial Bhrigu Lake (14,100 ft). Marvel at panoramic Himalayan peaks before descending to camp.',
        activities: ['Early morning summit trek', 'Bhrigu Lake glacial view', 'Summit celebration', 'Descent to camp']
      },
      {
        day: 4,
        title: 'Descent to Vashisht & Hot Spring Bath',
        description: 'Trek down to Vashisht village. Soothe tired muscles in natural hot sulfur spring baths and return to hotel.',
        activities: ['Descent trek', 'Hot sulfur bath at Vashisht', 'Hotel check-in and warm celebration dinner']
      },
      {
        day: 5,
        title: 'Beas River White Water Rafting & Paragliding',
        description: 'Head to Kullu for 14km thrilling grade-III river rafting on the Beas river and tandem paragliding.',
        activities: ['14km river rafting expedition', 'Tandem paragliding over Kullu valley', 'Camp celebration']
      },
      {
        day: 6,
        title: 'Atal Tunnel & Sissu Ice Lake Trek',
        description: 'Drive through Atal Tunnel into Lahaul valley for a short glacier walk near Sissu.',
        activities: ['Atal Tunnel traverse', 'Lahaul valley photography', 'Sissu waterfall & lake trail']
      },
      {
        day: 7,
        title: 'Old Manali Cafe Culture & Jam Session',
        description: 'Explore artistic cafes, live music, and pine trails in Old Manali. Farewell BBQ night.',
        activities: ['Old Manali cafe exploration', 'Live acoustic music session', 'Farewell barbecue night']
      },
      {
        day: 8,
        title: 'Certificate Distribution & Departure',
        description: 'Receive your trek completion certificate. Depart for Delhi/Chandigarh by evening Volvo coach.',
        activities: ['Trek certificate ceremony', 'Group photo & souvenir sharing', 'Board departure bus']
      }
    ],
    inclusions: ['Professional Certified IMF / Mountaineering Guides', 'All High-altitude camping gear (tents, sleeping bags, crampons)', 'All nutritious camp meals (Breakfast, Lunch, Snacks, Dinner)', 'First aid kit, oxygen cylinders, and emergency response', 'White water rafting passes', 'Trek completion certificate'],
    exclusions: ['Personal trekking shoes and backpack', 'Trekking pole/gaiters (available on rent)', 'Personal insurance']
  },
  {
    id: 'pkg-group-kashmir-special',
    title: 'Kashmir Group Special (20+ Pax)',
    category: 'Group & Adventure',
    destinationId: 'kashmir',
    destinationName: 'Kashmir',
    duration: '5 Nights / 6 Days',
    durationDays: 6,
    price: 13499,
    priceUnit: 'person',
    originalPrice: 19500,
    badge: 'Group Special 20+ Pax',
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Perfect for college groups, corporate team offsites, and extended family gatherings. Dedicated tour manager and luxury AC coach.',
    features: ['Group Discount Applied', 'Luxury 27-Seater AC Coach', 'Dedicated Tour Coordinator', 'Houseboat Night Stay + All Inclusive Meals'],
    itinerary: [
      {
        day: 1,
        title: 'Group Arrival in Srinagar & Shikara Race',
        description: 'Airport reception with banner. Check in to Deluxe Houseboats and enjoy fun group Shikara race and tea.',
        activities: ['Group airport pickup in luxury coach', 'Houseboat allotment', 'Group Shikara boating', 'Kashmiri Wazwan welcome dinner']
      },
      {
        day: 2,
        title: 'Gulmarg Snow Adventure & Group Team Games',
        description: 'Excursion to Gulmarg with team snow games, sledging, and Gondola cable car ride.',
        activities: ['Luxury coach drive to Gulmarg', 'Gondola ride', 'Snow volleyball / cricket in Gulmarg', 'Group photo session']
      },
      {
        day: 3,
        title: 'Pahalgam Lidder Riverside Camping & Bonfire',
        description: 'Drive to Pahalgam. Group picnic at Betaab Valley and evening music & bonfire night alongside Lidder River.',
        activities: ['Pampore saffron stop', 'Betaab Valley group picnic', 'Evening bonfire, karaoke, and BBQ dinner']
      },
      {
        day: 4,
        title: 'Aru Valley Trek & River Crossing',
        description: 'Short group adventure trek in Aru valley followed by trout fishing and apple orchard visits.',
        activities: ['Aru valley nature walk', 'Group photography', 'Apple orchard tour & fresh juice tasting']
      },
      {
        day: 5,
        title: 'Srinagar Old City Tour & Shopping Bazaar',
        description: 'Return to Srinagar for Mughal Gardens, Shankaracharya hill view, and group shopping discounts on Kashmiri Shawls.',
        activities: ['Nishat & Shalimar Gardens', 'Government Arts Emporium visit', 'Group dinner at top Srinagar restaurant']
      },
      {
        day: 6,
        title: 'Group Farewell & Airport Drop',
        description: 'Transfer in private coach to Srinagar airport with memorable group moments.',
        activities: ['Group certificate & gift hampers', 'Airport drop in private coach']
      }
    ],
    inclusions: ['5 Nights accommodation in 3-star / 4-star hotels & houseboats', 'All Meals included: Breakfast, Lunch, and Dinner (Wazwan specials)', 'Dedicated 27/35 Seater Luxury AC Coach', 'Dedicated 24/7 Tour Manager traveling with group', 'Bonfire and music night setup in Pahalgam', 'All toll, parking, and driver allowances'],
    exclusions: ['Airfare', 'Personal shopping and extra beverages']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'domestic-tours',
    title: 'Domestic Tours',
    subtitle: 'Handpicked destinations across India',
    icon: 'fa-earth-asia',
    category: 'primary',
    description: 'Explore the incredible diversity of India with our handcrafted domestic tour packages. From snow-laden peaks of Kashmir to tropical beaches of Goa, our itineraries cover India’s most iconic destinations.',
    features: [
      'Kashmir, Goa, Manali, Kerala, Rajasthan & more',
      'Comfortable AC buses and private cars',
      'Verified hotels and luxury resorts',
      'Professional local guides at each destination',
      'Group and private customizable tour options'
    ],
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=700'
  },
  {
    id: 'international-tours',
    title: 'International Tours',
    subtitle: 'Dubai, Bali, Thailand, Singapore & beyond',
    icon: 'fa-plane-departure',
    category: 'primary',
    description: 'Step beyond borders and experience the world with Triotrips’s international packages. We handle everything — from visas to accommodation — so you can focus on making memories.',
    features: [
      'Dubai, Bali, Thailand, Singapore & Europe',
      'Visa guidance and complete documentation support',
      'International flight coordination & transfers',
      'Currency exchange & travel insurance guidance',
      'Carefully curated 4-star & 5-star hotel options'
    ],
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=700'
  },
  {
    id: 'group-tours',
    title: 'Group Tours',
    subtitle: 'Fun-filled tours for large groups & teams',
    icon: 'fa-users-line',
    category: 'primary',
    description: 'Planning a trip with colleagues, college friends, or an extended family? Our group packages are designed for 10 to 100+ travelers, ensuring seamless coordination and maximum fun.',
    features: [
      'Corporate outings and company team trips',
      'College and school excursions with safety staff',
      'Exclusive group bulk discounts & perks',
      'Dedicated group coordinator traveling on tour',
      'Fully customizable itineraries for groups'
    ],
    image: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=700'
  },
  {
    id: 'trekking-tours',
    title: 'Trekking Tours',
    subtitle: 'Himalayan treks with certified expert guides',
    icon: 'fa-person-hiking',
    category: 'primary',
    description: 'For the adventure seeker in you — our trekking packages take you through spectacular Himalayan trails with experienced, certified mountain guides ensuring your safety every step of the way.',
    features: [
      'Kashmir Great Lakes, Manali-Leh, Hampta Pass & Bhrigu',
      'Certified mountain guides and first aid response',
      'Complete safety gear & high-altitude tents provided',
      'Nutritious high-energy meals at base camps',
      'Beginner, intermediate & expert trekking routes'
    ],
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=700'
  },
  // Add-ons
  {
    id: 'taxi-services',
    title: 'Taxi Services',
    subtitle: 'Comfortable, timely cab booking',
    icon: 'fa-taxi',
    category: 'addon',
    description: 'Comfortable, AC cabs for airport transfers, local sightseeing, and intercity travel across Maharashtra and pan-India with verified chauffeurs.',
    features: ['Airport & railway station pickups', 'Sedans, SUVs, and Tempo Travellers', 'Verified drivers with route expertise', 'Transparent billing with no hidden tolls']
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking',
    subtitle: 'Budget to luxury stays arranged',
    icon: 'fa-hotel',
    category: 'addon',
    description: 'Curated selection from budget guesthouses to 5-star luxury resorts and heritage palaces with exclusive Triotrips discount rates.',
    features: ['Verified clean & safe properties', 'Best price guarantee', 'Flexible cancellation options', 'Free breakfast & room upgrades when available']
  },
  {
    id: 'food-arrangements',
    title: 'Food Arrangements',
    subtitle: 'Local cuisine & special diet options',
    icon: 'fa-utensils',
    category: 'addon',
    description: 'Authentic local cuisine, multi-cuisine options, Jain, Pure Veg, and Halal menus arranged at top hygienic partner restaurants and hotels.',
    features: ['Jain and pure vegetarian options', 'Regional specialties (Kashmiri Wazwan, Goan seafood)', 'On-board meal arrangements during transit']
  },
  {
    id: 'tour-guides',
    title: 'Professional Guides',
    subtitle: 'Multilingual & certified local storytellers',
    icon: 'fa-id-badge',
    category: 'addon',
    description: 'Knowledgeable, multilingual tour guides who bring history, culture, and destinations to life with deep local insights and photography spots.',
    features: ['English, Hindi, Marathi speaking guides', 'Deep historical and cultural context', 'Expert tips for hidden gems & photo locations']
  },
  {
    id: 'photography-tours',
    title: 'Photography Tours',
    subtitle: 'Specially curated scenic landscape itineraries',
    icon: 'fa-camera',
    category: 'addon',
    description: 'Specially curated itineraries for photography enthusiasts and couples to capture stunning golden hour landscapes and memorable portraits.',
    features: ['Golden hour timing itineraries', 'Drone shot permissions assistance', 'Drone & DSLR shoot packages on request']
  },
  {
    id: 'visa-assistance',
    title: 'Visa & Documentation',
    subtitle: 'Hassle-free international travel paperwork',
    icon: 'fa-passport',
    category: 'addon',
    description: 'Complete assistance with visa applications, documentation, flight reservations, and travel insurance for all international destinations.',
    features: ['UAE, Bali, Thailand visa documentation', 'Travel insurance policy issuance', 'Step-by-step guidance for first-time international travelers']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Ravi Shinde',
    location: 'Pune, Maharashtra',
    initials: 'RS',
    rating: 5,
    quote: 'Best Kashmir trip ever! Triotrips organized everything perfectly – luxury houseboat on Dal Lake, private cab, delicious food, and friendly driver. Will definitely book again with family!',
    tourTaken: 'Kashmir Family Dream',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 't2',
    name: 'Priya & Kiran',
    location: 'Aurangabad, Maharashtra',
    initials: 'PK',
    rating: 5,
    quote: 'Our honeymoon in Kerala was absolutely magical. The private houseboat in Alleppey and the candlelight dinner exceeded all our expectations. The team was constantly available on WhatsApp.',
    tourTaken: 'Kerala Backwater Romance',
    avatarColor: 'bg-rose-600'
  },
  {
    id: 't3',
    name: 'Amol More',
    location: 'Parbhani, Maharashtra',
    initials: 'AM',
    rating: 5,
    quote: 'Went to Goa with 25 colleagues from our firm – Triotrips handled the group tour flawlessly. Great pricing, smooth bus transport, and amazing resort in Candolim.',
    tourTaken: 'Goa Family Funfest',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 't4',
    name: 'Suresh Patil',
    location: 'Latur, Maharashtra',
    initials: 'SP',
    rating: 5,
    quote: 'The Rajasthan heritage tour was incredible. Our guide was knowledgeable, the desert tent stay in Jaisalmer was authentic with royal folk dances, and the itinerary was relaxed.',
    tourTaken: 'Rajasthan Heritage Tour',
    avatarColor: 'bg-amber-600'
  },
  {
    id: 't5',
    name: 'Neha Kulkarni',
    location: 'Nanded, Maharashtra',
    initials: 'NK',
    rating: 5,
    quote: 'Dubai trip with my family was completely seamless – visa stamped in 48 hours, 4-star hotel in Bur Dubai, desert safari was super thrilling! Thank you Triotrips team.',
    tourTaken: 'Dubai Family Adventure',
    avatarColor: 'bg-purple-600'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a tour with Triotrips?',
    answer: 'You can easily book by submitting the inquiry form on our website, calling our support numbers directly (8421809065 / 8468858258 / 8799909936), or messaging us on Instagram @Triotrips / WhatsApp. Our travel expert will get in touch within 24 hours with a customized itinerary and quotation.',
    category: 'booking'
  },
  {
    id: 'faq-2',
    question: 'What is the booking and payment process?',
    answer: 'The process is simple: 1) Submit inquiry or request a custom quote → 2) We discuss and tailor your dream itinerary → 3) Confirm your booking by paying a 30% advance deposit → 4) Receive official travel vouchers and hotel confirmations → 5) Clear remaining balance prior to or upon arrival.',
    category: 'booking'
  },
  {
    id: 'faq-3',
    question: 'Do you offer customized tours?',
    answer: 'Yes, customized tours are our specialty! Whether you are traveling solo, as a couple on honeymoon, or with a group of 50 people, we adjust destinations, hotel tiers, vehicle types, meal plans, and activities according to your exact budget and preference.',
    category: 'custom'
  },
  {
    id: 'faq-4',
    question: 'What is your cancellation and refund policy?',
    answer: 'We provide fair and transparent cancellation terms: Cancellations made 15+ days prior to departure receive a full refund (minus minimal processing fee). Cancellations made 7–14 days prior receive a 50% refund. Cancellations under 7 days are non-refundable due to pre-booked hotels and transport.',
    category: 'booking'
  },
  {
    id: 'faq-5',
    question: 'Do you assist with visa for international tours like Dubai & Bali?',
    answer: 'Yes! For international destinations such as Dubai, Bali, Thailand, and Singapore, we provide complete visa assistance, document review, flight booking coordination, and mandatory travel insurance.',
    category: 'international'
  },
  {
    id: 'faq-6',
    question: 'Can I pay in installments for high-value tour packages?',
    answer: 'Yes, for packages booked at least 30 days in advance, we offer convenient flexible milestone payments: 30% at confirmation, 40% two weeks prior to travel, and the remaining 30% 3 days before travel or at check-in.',
    category: 'packages'
  }
];

export const CONTACT_INFO = {
  companyName: 'Triotrips',
  tagline: 'Explore the World with Triotrips',
  subtag: '4 Years of Crafting Unforgettable Journeys from Parbhani, Maharashtra',
  phone: '8421809065',
  phoneFormatted: '+91 8421809065',
  phoneNumbers: [
    { number: '8421809065', formatted: '+91 8421809065', label: 'Primary Helpline' },
    { number: '8468858258', formatted: '+91 8468858258', label: 'Support Line' },
    { number: '8799909936', formatted: '+91 8799909936', label: 'Booking Desk' }
  ],
  email: 'triotrips@gmail.com',
  address: 'Parbhani, Maharashtra, India',
  instagramHandle: '@Triotrips',
  instagramUrl: 'https://instagram.com/Triotrips',
  workingHours: 'Mon – Sun, 8:00 AM – 9:00 PM',
  establishedYear: 2020,
  yearsOfExcellence: 4,
  happyTravelers: '1,200+',
  destinationsCount: '50+',
  satisfactionRate: '99%'
};

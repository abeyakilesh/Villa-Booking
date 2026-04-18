require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Villa = require('./src/models/Villa');

const villas = [
  {
    name: 'Villa Serenity',
    location: 'Seminyak, Bali, Indonesia',
    description:
      'Nestled among lush tropical gardens, Villa Serenity offers an unparalleled escape with its stunning infinity pool overlooking rice terraces. This luxurious 4-bedroom villa features open-air living spaces that seamlessly blend indoor comfort with the natural beauty of Bali. Wake up to the sound of birdsong, enjoy your breakfast by the pool, and let the warm tropical breeze guide you into a state of pure relaxation. Each room is meticulously designed with handcrafted Balinese furniture, premium linens, and floor-to-ceiling windows that frame the breathtaking landscape.',
    pricePerNight: 350,
    amenities: [
      'Private Infinity Pool',
      'Rice Terrace Views',
      'Open-air Living',
      'Full Kitchen',
      'Daily Housekeeping',
      'Free WiFi',
      'Air Conditioning',
      'Private Garden',
      'Outdoor Shower',
      'Yoga Deck',
    ],
    images: ['/images/villa-1.jpg'],
    maxGuests: 8,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    name: 'Azure Coast Manor',
    location: 'Oia, Santorini, Greece',
    description:
      'Perched on the iconic cliffs of Oia, Azure Coast Manor commands panoramic views of the Aegean Sea and the famous Santorini sunset. This exclusive 3-bedroom villa showcases traditional Cycladic architecture with a modern luxury twist — whitewashed walls, vaulted ceilings, and cobalt blue accents create an atmosphere of timeless elegance. The private heated plunge pool sits at the edge of the caldera, offering an unforgettable vantage point for watching the sun dip below the horizon. Enjoy Mediterranean cuisine prepared in the gourmet kitchen or dine al fresco on the terrace.',
    pricePerNight: 520,
    amenities: [
      'Caldera Views',
      'Heated Plunge Pool',
      'Sunset Terrace',
      'Gourmet Kitchen',
      'Concierge Service',
      'Free WiFi',
      'Air Conditioning',
      'Wine Cellar',
      'Private Parking',
      'Smart Home System',
    ],
    images: ['/images/villa-2.jpg'],
    maxGuests: 6,
    rating: 4.8,
    reviewCount: 94,
  },
  {
    name: 'Emerald Canopy Retreat',
    location: 'Ubud, Bali, Indonesia',
    description:
      'Deep within the emerald rainforest of Ubud, this architectural masterpiece sits above a gentle river valley, surrounded by ancient trees and the symphony of nature. The Emerald Canopy Retreat features 3 luxurious bedrooms with bamboo-vaulted ceilings, natural stone bathrooms, and private balconies that overlook the jungle canopy. The open-air pavilion serves as both a living room and a meditation space, while the river-stone pool invites you to cool off after exploring the nearby temples and art galleries. This is where luxury meets wilderness.',
    pricePerNight: 280,
    amenities: [
      'Jungle Views',
      'River-stone Pool',
      'Open-air Pavilion',
      'Organic Garden',
      'Spa Treatments',
      'Free WiFi',
      'Air Conditioning',
      'Bamboo Architecture',
      'Nature Trails',
      'Meditation Space',
    ],
    images: ['/images/villa-3.jpg'],
    maxGuests: 6,
    rating: 4.7,
    reviewCount: 83,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing villas
    await Villa.deleteMany({});
    console.log('🗑️  Cleared existing villas');

    // Insert seed data
    const created = await Villa.insertMany(villas);
    console.log(`✅ Seeded ${created.length} villas:`);
    created.forEach((v) => {
      console.log(`   - ${v.name} (${v.location}) — $${v.pricePerNight}/night`);
    });

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import VillaCard from './VillaCard';
import VillaDetail from './VillaDetail';
import SkeletonCard from '../ui/SkeletonCard';
import { getVillas } from '../../api/villaApi';

const VillaGrid = () => {
  const [villas, setVillas] = useState([]);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      setLoading(true);
      const res = await getVillas({ limit: 3 });
      setVillas(res.data.villas);
    } catch (err) {
      setError('Failed to load villas. Please try again.');
      // Fallback to demo data if API is not available
      setVillas([
        {
          _id: 'demo-1',
          name: 'Villa Serenity',
          location: 'Seminyak, Bali, Indonesia',
          description: 'Nestled among lush tropical gardens, Villa Serenity offers an unparalleled escape with its stunning infinity pool overlooking rice terraces. This luxurious 4-bedroom villa features open-air living spaces that seamlessly blend indoor comfort with the natural beauty of Bali.',
          pricePerNight: 350,
          amenities: ['Private Infinity Pool', 'Rice Terrace Views', 'Open-air Living', 'Full Kitchen', 'Daily Housekeeping', 'Free WiFi', 'Air Conditioning', 'Private Garden', 'Outdoor Shower', 'Yoga Deck'],
          images: ['/images/villa-1.jpg'],
          maxGuests: 8,
          rating: 4.9,
          reviewCount: 127,
        },
        {
          _id: 'demo-2',
          name: 'Azure Coast Manor',
          location: 'Oia, Santorini, Greece',
          description: 'Perched on the iconic cliffs of Oia, Azure Coast Manor commands panoramic views of the Aegean Sea and the famous Santorini sunset. This exclusive 3-bedroom villa showcases traditional Cycladic architecture with a modern luxury twist.',
          pricePerNight: 520,
          amenities: ['Caldera Views', 'Heated Plunge Pool', 'Sunset Terrace', 'Gourmet Kitchen', 'Concierge Service', 'Free WiFi', 'Air Conditioning', 'Wine Cellar', 'Private Parking', 'Smart Home System'],
          images: ['/images/villa-2.jpg'],
          maxGuests: 6,
          rating: 4.8,
          reviewCount: 94,
        },
        {
          _id: 'demo-3',
          name: 'Emerald Canopy Retreat',
          location: 'Ubud, Bali, Indonesia',
          description: 'Deep within the emerald rainforest of Ubud, this architectural masterpiece sits above a gentle river valley, surrounded by ancient trees and the symphony of nature.',
          pricePerNight: 280,
          amenities: ['Jungle Views', 'River-stone Pool', 'Open-air Pavilion', 'Organic Garden', 'Spa Treatments', 'Free WiFi', 'Air Conditioning', 'Bamboo Architecture', 'Nature Trails', 'Meditation Space'],
          images: ['/images/villa-3.jpg'],
          maxGuests: 6,
          rating: 4.7,
          reviewCount: 83,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {loading
          ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : villas.map((villa, index) => (
              <VillaCard
                key={villa._id}
                villa={villa}
                index={index}
                onClick={setSelectedVilla}
              />
            ))
        }
      </div>

      {/* Villa Detail Overlay */}
      <AnimatePresence>
        {selectedVilla && (
          <VillaDetail
            villa={selectedVilla}
            onClose={() => setSelectedVilla(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default VillaGrid;

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HiOutlineMapPin, HiStar, HiXMark, HiOutlineUserGroup, HiOutlineCheckCircle } from 'react-icons/hi2';
import { formatPrice } from '../../utils/helpers';
import BookingForm from '../booking/BookingForm';

const VillaDetail = ({ villa, onClose }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ container: containerRef });
  const imageY = useTransform(scrollY, [0, 300], [0, -50]);
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const overlayOpacity = useTransform(scrollY, [0, 200], [0.3, 0.7]);

  // Prevent body scroll when detail is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <motion.div
        initial={{ backdropFilter: 'blur(0px)' }}
        animate={{ backdropFilter: 'blur(20px)' }}
        exit={{ backdropFilter: 'blur(0px)' }}
        className="absolute inset-0 bg-black/60"
      />

      {/* Detail Panel */}
      <motion.div
        layoutId={`villa-card-${villa._id}`}
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:w-[95%] sm:h-[92%] sm:max-w-5xl sm:rounded-3xl overflow-y-auto bg-bg border-0 sm:border sm:border-border shadow-2xl"
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onClose}
          className="fixed sm:absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
        >
          <HiXMark className="text-xl" />
        </motion.button>

        {/* Hero Image with Parallax */}
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <motion.img
            layoutId={`villa-image-${villa._id}`}
            src={villa.images?.[0] || '/images/villa-1.jpg'}
            alt={villa.name}
            style={{ y: imageY, scale: imageScale }}
            className="w-full h-full object-cover"
          />
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"
          />

          {/* Hero content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold text-white">
                  <HiStar className="text-primary" />
                  <span>{villa.rating || 4.8}</span>
                  <span className="text-white/60">({villa.reviewCount || 0} reviews)</span>
                </div>
              </div>
              <motion.h1
                layoutId={`villa-name-${villa._id}`}
                className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2"
              >
                {villa.name}
              </motion.h1>
              <div className="flex items-center gap-2 text-white/80">
                <HiOutlineMapPin className="text-primary" />
                <motion.span layoutId={`villa-location-${villa._id}`} className="text-sm sm:text-base">
                  {villa.location}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="px-6 sm:px-10 py-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Description + Amenities */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border">
                  <HiOutlineUserGroup className="text-primary" />
                  <span className="text-sm text-text-secondary">Up to {villa.maxGuests || 6} guests</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border">
                  <span className="text-2xl font-serif font-bold text-gradient">{formatPrice(villa.pricePerNight)}</span>
                  <span className="text-sm text-text-secondary">/night</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-serif font-semibold text-text mb-4">About This Villa</h2>
                <p className="text-text-secondary leading-relaxed">{villa.description}</p>
              </motion.div>

              {/* Amenities */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-serif font-semibold text-text mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {villa.amenities?.map((amenity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="flex items-center gap-2 py-2"
                    >
                      <HiOutlineCheckCircle className="text-primary flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Booking Form */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="sticky top-4">
                <BookingForm villa={villa} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VillaDetail;

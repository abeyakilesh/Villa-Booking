import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiStar } from 'react-icons/hi2';
import { formatPrice } from '../../utils/helpers';

const VillaCard = ({ villa, onClick, index }) => {
  return (
    <motion.div
      layoutId={`villa-card-${villa._id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(villa)}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <motion.img
          layoutId={`villa-image-${villa._id}`}
          src={villa.images?.[0] || '/images/villa-1.jpg'}
          alt={villa.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-semibold text-white">
          <HiStar className="text-primary text-sm" />
          <span>{villa.rating || 4.8}</span>
        </div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.3 }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0A0A0A]"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #E0C96A)' }}
        >
          {formatPrice(villa.pricePerNight)}/night
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <motion.h3
          layoutId={`villa-name-${villa._id}`}
          className="text-lg font-serif font-semibold text-text mb-1 group-hover:text-primary transition-colors"
        >
          {villa.name}
        </motion.h3>
        <div className="flex items-center gap-1 text-text-secondary text-sm">
          <HiOutlineMapPin className="text-primary text-base flex-shrink-0" />
          <motion.span layoutId={`villa-location-${villa._id}`}>
            {villa.location}
          </motion.span>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {villa.amenities?.slice(0, 3).map((amenity, i) => (
            <span key={i} className="text-[10px] font-medium uppercase tracking-wider text-text-muted px-2 py-0.5 rounded-full bg-surface-light border border-border">
              {amenity}
            </span>
          ))}
          {villa.amenities?.length > 3 && (
            <span className="text-[10px] font-medium text-primary px-2 py-0.5">
              +{villa.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VillaCard;

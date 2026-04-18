import { motion } from 'framer-motion';
import VillaGrid from '../components/villa/VillaGrid';
import { HiOutlineSparkles } from 'react-icons/hi2';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-5"
             style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-5"
             style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <HiOutlineSparkles className="text-primary text-xl" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Handpicked Luxury
              </span>
              <HiOutlineSparkles className="text-primary text-xl" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-text leading-tight mb-4">
              Find Your Perfect
              <br />
              <span className="text-gradient">Villa Escape</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Discover the world's most extraordinary private villas.
              Each property is personally inspected and curated for those who
              appreciate the finer things in life.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-8 sm:gap-16 mt-10"
          >
            {[
              { value: '50+', label: 'Luxury Villas' },
              { value: '12', label: 'Countries' },
              { value: '4.9', label: 'Avg Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Villa Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text">Featured Villas</h2>
              <p className="text-text-secondary text-sm mt-1">Our most beloved properties</p>
            </div>
          </motion.div>

          <VillaGrid />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

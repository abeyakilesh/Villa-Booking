import { motion } from 'framer-motion';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #C9A84C, #A68A3E)' }}>
                <span className="text-lg font-bold text-[#0A0A0A]">V</span>
              </div>
              <span className="text-xl font-serif font-bold">
                Villa<span className="text-gradient">Stay</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md">
              Discover the world's most extraordinary villas. Handpicked luxury properties
              for unforgettable escapes, curated for those who appreciate the finer things in life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              {['All Villas', 'Bali Collection', 'Greece Collection', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Cancellation Policy', 'Safety', 'Contact Us'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-border">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} VillaStay. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-text-muted mt-2 sm:mt-0">
            <HiOutlineGlobeAlt />
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

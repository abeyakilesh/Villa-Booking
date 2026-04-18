import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineArrowRightOnRectangle, HiOutlineArrowLeftOnRectangle, HiOutlineUserPlus } from 'react-icons/hi2';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #A68A3E)' }}
            >
              <span className="text-lg sm:text-xl font-bold text-[#0A0A0A]">V</span>
            </motion.div>
            <span className="text-lg sm:text-xl font-serif font-bold text-text">
              Villa<span className="text-gradient">Stay</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1 sm:gap-3">
            <NavLink to="/" active={isActive('/')} icon={<HiOutlineHome />} label="Explore" />

            {isAuthenticated ? (
              <>
                <NavLink to="/bookings" active={isActive('/bookings')} icon={<HiOutlineCalendar />} label="My Trips" />
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light/50 mx-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                       style={{ background: 'linear-gradient(135deg, #C9A84C, #A68A3E)', color: '#0A0A0A' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-text-secondary">{user?.name?.split(' ')[0]}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-text-secondary hover:text-error transition-colors cursor-pointer"
                >
                  <HiOutlineArrowRightOnRectangle className="text-lg" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <NavLink to="/login" active={isActive('/login')} icon={<HiOutlineArrowLeftOnRectangle />} label="Login" />
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#0A0A0A] cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E0C96A)' }}
                  >
                    <HiOutlineUserPlus className="text-lg" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, active, icon, label }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
        active
          ? 'text-primary bg-primary/10'
          : 'text-text-secondary hover:text-text hover:bg-surface-light/50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </motion.div>
  </Link>
);

export default Navbar;

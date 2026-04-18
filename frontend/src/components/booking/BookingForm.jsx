import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../api/bookingApi';
import { formatPrice, calculateNights, getTodayValue, getTomorrowValue } from '../../utils/helpers';
import { HiOutlineCalendarDays, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const BookingForm = ({ villa }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState(getTodayValue());
  const [checkOut, setCheckOut] = useState(getTomorrowValue());
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalPrice = nights > 0 ? nights * villa.pricePerNight : 0;
  const serviceFee = Math.round(totalPrice * 0.12);
  const grandTotal = totalPrice + serviceFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      toast.error('Please login to book a villa');
      navigate('/login');
      return;
    }

    if (nights <= 0) {
      setError('Check-out must be after check-in');
      return;
    }

    if (villa._id?.startsWith('demo-')) {
      toast.error('Connect to MongoDB to enable bookings');
      return;
    }

    try {
      setLoading(true);
      await createBooking({
        villaId: villa._id,
        checkIn,
        checkOut,
        guests,
      });
      setSuccess(true);
      toast.success('Booking confirmed! 🎉');
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}
            >
              <HiOutlineCheckCircle className="text-3xl text-white" />
            </motion.div>
            <h3 className="text-xl font-serif font-bold text-text mb-2">Booking Confirmed!</h3>
            <p className="text-sm text-text-secondary mb-4">
              Your stay at {villa.name} has been reserved.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/bookings')}
              className="w-full py-3 rounded-xl text-sm font-semibold text-[#0A0A0A] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E0C96A)' }}
            >
              View My Trips
            </motion.button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit}>
            {/* Price header */}
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-2xl font-serif font-bold text-gradient">{formatPrice(villa.pricePerNight)}</span>
              <span className="text-sm text-text-secondary">/night</span>
            </div>

            {/* Date inputs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Check-in</label>
                <div className="relative">
                  <HiOutlineCalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="date"
                    value={checkIn}
                    min={getTodayValue()}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Check-out</label>
                <div className="relative">
                  <HiOutlineCalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || getTodayValue()}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {Array.from({ length: villa.maxGuests || 6 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-error/10 border border-error/20 mb-4"
              >
                <HiOutlineExclamationTriangle className="text-error flex-shrink-0" />
                <p className="text-xs text-error">{error}</p>
              </motion.div>
            )}

            {/* Price Breakdown */}
            {nights > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2 mb-6 py-4 border-t border-b border-border"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{formatPrice(villa.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span className="text-text">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Service fee</span>
                  <span className="text-text">{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span className="text-text">Total</span>
                  <span className="text-gradient">{formatPrice(grandTotal)}</span>
                </div>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || nights <= 0}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-shadow hover:shadow-lg hover:shadow-primary/20"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E0C96A)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full inline-block"
                  />
                  Confirming...
                </span>
              ) : (
                isAuthenticated ? 'Reserve Now' : 'Login to Book'
              )}
            </motion.button>

            <p className="text-center text-xs text-text-muted mt-3">You won't be charged yet</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingForm;

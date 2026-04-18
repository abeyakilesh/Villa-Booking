import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserBookings, cancelBooking } from '../../api/bookingApi';
import { formatPrice, formatDate, calculateNights } from '../../utils/helpers';
import { HiOutlineCalendarDays, HiOutlineMapPin, HiOutlineXCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getUserBookings({ page, limit: 10 });
      setBookings(res.data.bookings);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  const statusColors = {
    confirmed: 'bg-success/10 text-success border-success/20',
    pending: 'bg-warning/10 text-warning border-warning/20',
    cancelled: 'bg-error/10 text-error border-error/20',
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-surface animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <HiOutlineCalendarDays className="text-6xl text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-serif font-semibold text-text mb-2">No Trips Yet</h3>
        <p className="text-text-secondary text-sm">When you book a villa, it will appear here.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-surface border border-border hover:border-primary/20 transition-colors"
          >
            {/* Villa Image */}
            <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={booking.villaId?.images?.[0] || '/images/villa-1.jpg'}
                alt={booking.villaId?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Booking Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif font-semibold text-text text-lg">
                    {booking.villaId?.name || 'Villa'}
                  </h3>
                  <div className="flex items-center gap-1 text-text-secondary text-sm mt-0.5">
                    <HiOutlineMapPin className="text-primary text-xs" />
                    <span>{booking.villaId?.location}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-secondary">
                <div className="flex items-center gap-1">
                  <HiOutlineCalendarDays className="text-primary" />
                  <span>{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}</span>
                </div>
                <span className="font-bold text-gradient text-base">
                  {formatPrice(booking.totalPrice)}
                </span>
                <span className="text-text-muted text-xs">
                  {calculateNights(booking.checkIn, booking.checkOut)} nights
                </span>
              </div>

              {booking.status === 'confirmed' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCancel(booking._id)}
                  className="mt-3 flex items-center gap-1 text-xs text-error hover:text-error/80 transition-colors cursor-pointer"
                >
                  <HiOutlineXCircle />
                  <span>Cancel Booking</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => fetchBookings(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                page === pagination.page
                  ? 'bg-primary text-[#0A0A0A]'
                  : 'bg-surface-light text-text-secondary hover:text-text'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

const Booking = require('../models/Booking');
const Villa = require('../models/Villa');

class BookingService {
  /**
   * Create a new booking with overlap detection
   */
  async create({ userId, villaId, checkIn, checkOut, guests }) {
    // Validate villa exists
    const villa = await Villa.findById(villaId);
    if (!villa) {
      const error = new Error('Villa not found');
      error.statusCode = 404;
      throw error;
    }

    // Parse dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate dates
    if (checkInDate < new Date()) {
      const error = new Error('Check-in date cannot be in the past');
      error.statusCode = 400;
      throw error;
    }

    if (checkOutDate <= checkInDate) {
      const error = new Error('Check-out must be after check-in');
      error.statusCode = 400;
      throw error;
    }

    // Check for overlapping bookings
    const overlap = await Booking.findOne({
      villaId,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
      ],
    });

    if (overlap) {
      const error = new Error(
        'This villa is already booked for the selected dates. Please choose different dates.'
      );
      error.statusCode = 409;
      throw error;
    }

    // Calculate total price
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * villa.pricePerNight;

    // Create booking
    const booking = await Booking.create({
      userId,
      villaId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice,
      guests: guests || 1,
      status: 'confirmed',
    });

    return booking.populate('villaId', 'name location images pricePerNight');
  }

  /**
   * Get all bookings for a user with pagination
   */
  async getUserBookings(userId, { page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      Booking.find({ userId })
        .populate('villaId', 'name location images pricePerNight')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Booking.countDocuments({ userId }),
    ]);

    return {
      bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Cancel a booking
   */
  async cancel(bookingId, userId) {
    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) {
      const error = new Error('Booking not found');
      error.statusCode = 404;
      throw error;
    }

    if (booking.status === 'cancelled') {
      const error = new Error('Booking is already cancelled');
      error.statusCode = 400;
      throw error;
    }

    booking.status = 'cancelled';
    await booking.save();

    return booking.populate('villaId', 'name location images pricePerNight');
  }
}

module.exports = new BookingService();

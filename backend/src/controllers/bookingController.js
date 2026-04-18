const Joi = require('joi');
const bookingService = require('../services/bookingService');

const createBookingSchema = Joi.object({
  villaId: Joi.string().required(),
  checkIn: Joi.date().iso().required(),
  checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required(),
  guests: Joi.number().integer().min(1).max(20).optional(),
});

exports.create = async (req, res, next) => {
  try {
    const { error, value } = createBookingSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map((d) => d.message.replace(/"/g, '')),
      });
    }

    const booking = await bookingService.create({
      userId: req.user.id,
      ...value,
    });

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await bookingService.getUserBookings(req.user.id, {
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const booking = await bookingService.cancel(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Booking cancelled',
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};

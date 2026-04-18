const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// All booking routes require authentication
router.use(auth);

router.post('/', bookingController.create);
router.get('/user', bookingController.getUserBookings);
router.patch('/:id/cancel', bookingController.cancel);

module.exports = router;

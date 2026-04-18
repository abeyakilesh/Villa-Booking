const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Villa name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required'],
      min: [0, 'Price cannot be negative'],
    },
    amenities: [{
      type: String,
      trim: true,
    }],
    images: [{
      type: String, // S3 URLs
    }],
    maxGuests: {
      type: Number,
      required: [true, 'Max guests is required'],
      min: [1, 'Must allow at least 1 guest'],
      default: 6,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for efficient queries
villaSchema.index({ location: 1 });
villaSchema.index({ pricePerNight: 1 });
villaSchema.index({ name: 'text', location: 'text', description: 'text' });

module.exports = mongoose.model('Villa', villaSchema);

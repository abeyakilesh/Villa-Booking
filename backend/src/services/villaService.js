const Villa = require('../models/Villa');
const { generateUploadUrl, getPublicUrl } = require('../config/s3');

class VillaService {
  /**
   * Get all villas with pagination
   */
  async getAll({ page = 1, limit = 10, location, minPrice, maxPrice }) {
    const query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [villas, total] = await Promise.all([
      Villa.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Villa.countDocuments(query),
    ]);

    return {
      villas,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a villa by ID
   */
  async getById(id) {
    const villa = await Villa.findById(id).lean();
    if (!villa) {
      const error = new Error('Villa not found');
      error.statusCode = 404;
      throw error;
    }
    return villa;
  }

  /**
   * Generate a pre-signed upload URL for villa images
   */
  async getUploadUrl(villaId, filename, contentType) {
    const key = `villas/${villaId}/${Date.now()}-${filename}`;
    const uploadUrl = await generateUploadUrl(key, contentType);
    const publicUrl = getPublicUrl(key);

    return { uploadUrl, publicUrl, key };
  }
}

module.exports = new VillaService();

const villaService = require('../services/villaService');

exports.getAll = async (req, res, next) => {
  try {
    const { page, limit, location, minPrice, maxPrice } = req.query;
    const result = await villaService.getAll({
      page,
      limit,
      location,
      minPrice,
      maxPrice,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const villa = await villaService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: { villa },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUploadUrl = async (req, res, next) => {
  try {
    const { filename, contentType } = req.query;

    if (!filename || !contentType) {
      return res.status(400).json({
        success: false,
        message: 'filename and contentType query parameters are required',
      });
    }

    const result = await villaService.getUploadUrl(
      req.params.id,
      filename,
      contentType
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

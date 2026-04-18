/**
 * Joi validation middleware factory
 * @param {import('joi').Schema} schema - Joi schema to validate against
 * @param {string} property - Request property to validate ('body', 'params', 'query')
 * @returns {Function} Express middleware
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((d) => d.message.replace(/"/g, ''));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;

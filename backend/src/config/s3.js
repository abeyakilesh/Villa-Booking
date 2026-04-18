const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Generate a pre-signed URL for uploading a file to S3
 * @param {string} key - S3 object key (e.g., 'villas/123/image.jpg')
 * @param {string} contentType - MIME type of the file
 * @param {number} expiresIn - URL expiration in seconds (default: 900 = 15 min)
 * @returns {Promise<string>} Pre-signed PUT URL
 */
const generateUploadUrl = async (key, contentType, expiresIn = 900) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * Generate a pre-signed URL for reading a file from S3
 * @param {string} key - S3 object key
 * @param {number} expiresIn - URL expiration in seconds (default: 3600 = 1 hour)
 * @returns {Promise<string>} Pre-signed GET URL
 */
const generateReadUrl = async (key, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * Get the public URL for an S3 object (assumes bucket policy allows public read)
 * @param {string} key - S3 object key
 * @returns {string} Public URL
 */
const getPublicUrl = (key) => {
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

module.exports = {
  s3Client,
  generateUploadUrl,
  generateReadUrl,
  getPublicUrl,
};

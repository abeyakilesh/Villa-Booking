const express = require('express');
const router = express.Router();
const villaController = require('../controllers/villaController');
const auth = require('../middleware/auth');

router.get('/', villaController.getAll);
router.get('/:id', villaController.getById);
router.get('/:id/upload-url', auth, villaController.getUploadUrl);

module.exports = router;

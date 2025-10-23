const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 150 * 1024 * 1024 }, // 150MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
});

// @route   POST api/documents/upload
// @desc    Upload a supporting document
// @access  Private
router.post(
  '/upload',
  upload.single('document'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    res.json({ msg: 'File uploaded successfully' });
  }
);

module.exports = router;

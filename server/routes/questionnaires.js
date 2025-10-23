const express = require('express');
const router = express.Router();
const multer = require('multer');
const docxParser = require('docx-parser');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 150 * 1024 * 1024 }, // 150MB
});

// @route   POST api/questionnaires/upload
// @desc    Upload and parse a questionnaire
// @access  Private
router.post('/upload', upload.single('questionnaire'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  docxParser.parseDocx(req.file.buffer, function (data) {
    res.json({ text: data });
  });
});

module.exports = router;

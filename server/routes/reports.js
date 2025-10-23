const express = require('express');
const router = express.Router();
const { Document, Packer, Paragraph, TextRun } = require('docx');

// @route   GET api/reports/generate
// @desc    Generate a new report
// @access  Private
router.get('/generate', async (req, res) => {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Hello World'),
                new TextRun({
                  text: 'Foo Bar',
                  bold: true,
                }),
                new TextRun({
                  text: 'Github is the best',
                  bold: true,
                }).break(),
              ],
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=My Document.docx'
    );
    res.send(buffer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

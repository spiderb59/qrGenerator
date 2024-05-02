const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image'); // Import qr-image library
const pdf = require('html-pdf');
const fs = require('fs');
const db = require('./db');
const app = express();
const port = 8122;
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Endpoint to handle saving visitor details
app.post('/save-visitor-details', async (req, res) => {
  try {
    const { id, name, company_name, phone, email, date , pass_path} = req.body;

    // Save visitor details to the database
    await db.saveVisitorDetails(id, name, company_name, phone, email, date, pass_path);

    // Generate QR code image
    const qr_png = qr.imageSync(`http://localhost:8122/view?id=${id}`, { type: 'png' });

    // Embed QR code image in base64 format
    const qrImageBase64 = qr_png.toString('base64');

    // Create visitor pass HTML content with embedded QR code
    const htmlContent = `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      width: 400px;
      height: 500px;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
    }

    h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 5px;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  </style>
</head>
<body>
  <h1>Visitor Pass</h1>
  <p>ID: ${id}</p>
  <p>Name: ${name}</p>
  <p>Company Name: ${company_name}</p>
  <p>Phone Number: ${phone}</p>
  <p>Email: ${email}</p>
  <p>Date: ${date}</p>
  <img src="data:image/png;base64,${qrImageBase64}" alt="QR Code" />
</body>
</html>
`;

    // Options for PDF generation
    const pdfOptions = { format: 'Letter' };

    // Generate PDF from HTML content
    pdf.create(htmlContent, pdfOptions).toFile(`public/visitor-pass/${id}.pdf`, async (err, _) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).json({ message: 'Failed to generate PDF' });
        return;
      }

      // Success message
      console.log('Visitor pass PDF generated successfully');

      // Send success response
      res.status(201).json({ message: 'Visitor details saved successfully.' });
    });
  } catch (error) {
    console.error('Error saving visitor details:', error);
    res.status(500).json({ message: 'Failed to save visitor details.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
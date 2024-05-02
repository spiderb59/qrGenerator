const db = require('../models/passModel');
const qr = require('qr-image');
const pdf = require('html-pdf');

const passController = {};

passController.saveVisitorDetails = async (req, res) => {
  try {
    const { id, name, company_name, phone, email } = req.body;
    const pass_path = `visitor-pass/${id}.pdf`;

    // Save visitor details to the database
    const saveResult = await db.saveVisitorDetails(id, name, company_name, phone, email, pass_path);
    if (!saveResult.success) {
      // If saving to the database fails, return an error response
      return res.status(500).json({ message: saveResult.message });
    }

    // Generate QR code image
    const qr_png = qr.imageSync(`http://localhost:8122/view?id=${id}`, { type: 'png' });
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
          <h1>Company Name: Visitor Pass</h1>
          <p>ID: ${id}</p>
          <p>Name: ${name}</p>
          <p>Company Name: ${company_name}</p>
          <p>Phone Number: ${phone}</p>
          <p>Email: ${email}</p>
          <p>Date Issued: ${new Date().toLocaleString()}</p>
          <img src="data:image/png;base64,${qrImageBase64}" alt="QR Code" />
        </body>
      </html>
    `;

    // Options for PDF generation
    const pdfOptions = { format: 'Letter' };

    // Generate PDF from HTML content
    pdf.create(htmlContent, pdfOptions).toFile(pass_path, async (err, _) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).json({ message: 'Failed to generate PDF' });
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
};

module.exports = passController;

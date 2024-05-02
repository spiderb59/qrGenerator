const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the db.js file
const app = express();
const port = 8122;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Endpoint to handle saving visitor details
app.post('/save-visitor-details', async (req, res) => {
  const { id, name, company_name, phone, email, date } = req.body;
  const result = await db.saveVisitorDetails(id, name, company_name, phone, email, date);
  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
no 
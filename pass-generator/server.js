const express = require('express');
const bodyParser = require('body-parser');
const passController = require('./controllers/passController');
const app = express();
const port = 8122;

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Endpoint to handle saving visitor details
app.post('/save-visitor-details', passController.saveVisitorDetails);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

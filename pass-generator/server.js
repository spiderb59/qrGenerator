const express = require('express');
const bodyParser = require('body-parser');
const passController = require('./controllers/passController');
const userController = require('./controllers/userController'); // Import the new controller
const app = express();
const port = 8122;

app.use(bodyParser.json());

// Routes
app.use(express.static(__dirname + '/public'));
app.get('/userDetails/:id', (req, res) => {
  res.sendFile(__dirname + '/public/userDetails.html');
});
app.use('/visitor-pass', express.static(__dirname + '/visitor-pass'));
// Endpoint to handle saving visitor details
app.post('/save-visitor-details', passController.saveVisitorDetails);

// Endpoint to handle fetching user details
app.get('/user/:id', userController.getUserDetails);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

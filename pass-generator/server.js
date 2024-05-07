const express = require('express');
const bodyParser = require('body-parser');
const passController = require('./controllers/passController');
const userController = require('./controllers/userController'); // Import the new controller
const allUserControllers = require('./controllers/allUserControllers'); // Import the new controller

const app = express();
const port = 8122;

app.use(bodyParser.json());

// Routes
app.use(express.static(__dirname + '/public'));
app.get('/userDetails/:id', (req, res) => {
  res.sendFile(__dirname + '/public/userDetails.html');
});
app.get('/visitors', (req, res) => {
  res.sendFile(__dirname + '/public/users.html');
});
app.use('/visitor-pass', express.static(__dirname + '/visitor-pass'));



// Endpoint to handle saving visitor details
app.post('/save-visitor-details', passController.saveVisitorDetails);



app.route('/user/:id')
  .get(userController.getUserDetails)
  .put(userController.updateUserDetails);


//Enfpoint to handle fetching all user details
app.get('/all-visitors', allUserControllers.getAllVisitorDetails);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const passController = require('./controllers/passController');
const userController = require('./controllers/userController'); // Import the new controller
const allUserControllers = require('./controllers/allUserControllers'); // Import the new controller

const app = express();
const port = 8122;

// Session Configuration
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Keycloak Configuration
const keycloak = new Keycloak({
  store: memoryStore
}, {
  realm: 'admin',
  'auth-server-url': 'http://localhost:8080/auth',
  'ssl-required': 'external',
  resource: 'nodejs-app',
  'public-client': true,
  'confidential-port': 0
});

app.use(keycloak.middleware());

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/visitor-pass', express.static(__dirname + '/visitor-pass'));

// Serve HTML pages
app.get('/userDetails/:id', (req, res) => {
  res.sendFile(__dirname + '/public/userDetails.html');
});

app.get('/visitors', (req, res) => {
  res.sendFile(__dirname + '/public/users.html');
});

// API Endpoints
app.post('/save-visitor-details', keycloak.protect(), passController.saveVisitorDetails);

app.route('/user/:id')
  .get(keycloak.protect(), userController.getUserDetails)
  .put(keycloak.protect(), userController.updateUserDetails);

app.get('/all-visitors', keycloak.protect(), allUserControllers.getAllVisitorDetails);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
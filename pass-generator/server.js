const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 8122; 
app.use(express.static('public'));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pass_generator',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

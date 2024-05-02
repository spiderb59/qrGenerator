const mysql = require('mysql2/promise');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'pass_generator', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to insert visitor details into the database
async function saveVisitorDetails(id, name, company_name, phone, email, date) {
  try {
    const query = `
      INSERT INTO visitor_details (id, name, company_name, phone, email, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [id, name, company_name, phone, email, date]);
    return { success: true, message: 'Visitor details saved successfully.' };
  } catch (error) {
    console.error('Error saving visitor details:', error);
    return { success: false, message: 'Failed to save visitor details.' };
  }
}

module.exports = {
  saveVisitorDetails
};

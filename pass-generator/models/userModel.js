const pool = require('../config/database');

async function getUserDetailsById(id) {
  try {
    const query = `
      SELECT * FROM visitor_details WHERE id = ?
    `;
    const [rows, fields] = await pool.query(query, [id]);
    return rows[0]; // Assuming id is unique, so only one row will be returned
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = {
  getUserDetailsById
};

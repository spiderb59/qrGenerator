const pool = require('../config/database');

async function getAllVisitorDetails() {
  try {
    const query = `
      SELECT * FROM visitor_details
    `;
    const [rows, fields] = await pool.query(query);
    return rows; 
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    throw error; 
  }
}

module.exports = {
  getAllVisitorDetails
};

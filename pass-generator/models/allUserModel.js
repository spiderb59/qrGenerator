const pool = require('../config/database');

/**
 * Fetches all visitor details from the database.
 *
 * @returns {Promise<object[]>} An array containing visitor details objects.
 */
async function getAllVisitorDetails() {
  try {
    const query = `
      SELECT * FROM visitor_details
    `;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = {
  getAllVisitorDetails,
};

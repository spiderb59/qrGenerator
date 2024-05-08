const pool = require('../config/database');

/**
 * Fetches user details by their ID from the database.
 *
 * @param {string} id - Unique identifier for the user.
 * @returns {Promise<object>} An object containing user details or null if not found.
 */
async function getUserDetailsById(id) {
  try {
    const query = `
      SELECT * FROM visitor_details WHERE id = ?
    `;
    const [rows] = await pool.query(query, [id]);
    return rows[0] || null; // Return user data or null if not found
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; // Propagate the error to the caller
  }
}

/**
 * Updates user's last scanned time and scan count by 1.
 *
 * @param {string} id - Unique identifier for the user.
 * @returns {Promise<void>}
 */
async function updateUserDetails(id) {
  try {
    // Prepare data with Japan timezone-aware timestamp
    const formattedDateTime = await getJapanDateTimeString();

    const query = `
      UPDATE visitor_details SET last_scanned = ?, scan_count = scan_count + 1 WHERE id = ?
    `;

    await pool.query(query, [formattedDateTime, id]);

    console.log('QR Code Scanned'); // Log success message
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error; // Propagate the error to the caller
  }
}

/**
 * Generates a formatted date and time string in Japan timezone.
 *
 * @returns {Promise<string>} The formatted date and time string.
 */
async function getJapanDateTimeString() {
  const options = { timeZone: 'Asia/Tokyo' };
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
}



module.exports = {
  getUserDetailsById,
  updateUserDetails,
};

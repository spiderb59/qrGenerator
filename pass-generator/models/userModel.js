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

async function updateUserDetails(id) {
  try {
    // Get the current date and time
    const options = { timeZone: 'Asia/Tokyo' };
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', options);
      
    // Extract date and time parts
    const [datePart, timePart] = formattedDateTime.split(', ');
    const [month, day, year] = datePart.split('/');
    const [hoursMinutesSeconds, amPm] = timePart.split(' ');
    const [hours, minutes, seconds] = hoursMinutesSeconds.split(':');

    // Convert 12-hour time to 24-hour time
    let hour24 = parseInt(hours, 10);
    if (amPm === 'PM') {
      hour24 += 12;
    }
      
    // Construct MySQL-compatible datetime string
    const mysqlFormattedDateTime = `${year}:${month}:${day} ${hour24}:${minutes}:${seconds}`;
    
    const query = `
      UPDATE visitor_details SET last_scanned = ?, scan_count = scan_count + 1 WHERE id = ?
    `;
    
    await pool.query(query, [mysqlFormattedDateTime, id]);
    
    console.log('QR Code Scanned'); // Log success message
    
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error; // Propagate the error to the caller
  }
}




module.exports = {
  getUserDetailsById,
  updateUserDetails
};

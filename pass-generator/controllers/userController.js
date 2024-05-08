const userModel = require('../models/userModel');

const userController = {};

// Function to handle fetching user details
userController.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch user details from the userModel
    const userDetails = await userModel.getUserDetailsById(id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userAgent = req.headers['user-agent'];
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // If the request is coming from a mobile device, call updateUserDetails
    if (!isMobile) {
      // Update user details with current date and time and increase scan count by 1
      await userModel.updateUserDetails(id);
    }
    // Send user details as JSON response
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};

// Function to handle updating user details when QR code is scanned
userController.updateUserDetails = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch user details from the userModel
    let userDetails = await userModel.getUserDetailsById(id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle missing or invalid lastScanDateTime
    if (!userDetails.lastScanDateTime) {
      userDetails.lastScanDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Set default current date and time
    } else {
      // Assuming existing value might need conversion (adapt based on your logic)
      const formattedDateTime = userDetails.lastScanDateTime; // Assuming conversion happens elsewhere
      userDetails.lastScanDateTime = formattedDateTime;
    }

    userDetails.scanCount += 1;

    if (userDetails.scanCount > 5) {
      userDetails.scanLimitReached = true;
    }

    // Save updated user details to the userModel
    await userModel.updateUserDetails(userDetails);

    // Send success response
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Failed to update user details' });
  }
};


module.exports = userController;

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
    await userModel.updateUserDetails(id);
    // Send user details as JSON response
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};

// Function to handle updating user details when QR code is scanned
userController.updateUserDetails= async (req, res) => {
  try {
    console.log('Updating user details...');
    const id = req.params.id;
    // Fetch user details from the userModel
    let userDetails = await userModel.getUserDetailsById(id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update user details with current date and time and increase scan count by 1
    userDetails.lastScanDateTime = new Date();
    userDetails.scanCount += 1;

    // Check if scan count exceeds 5
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

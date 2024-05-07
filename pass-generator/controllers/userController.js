const userModel = require('../models/userModel');

const userController = {};

userController.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch user details from the userModel
    const userDetails = await userModel.getUserDetailsById(id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Send user details as JSON response
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};

module.exports = userController;

const userModel = require('../models/allUserModel');

const userController = {};

userController.getAllVisitorDetails = async (req, res) => {
  try {
    // Fetch all visitor details from the userModel
    const allVisitorDetails = await userModel.getAllVisitorDetails();
    res.status(200).json(allVisitorDetails);
  } catch (error) {
    console.error('Error fetching all visitor details:', error);
    res.status(500).json({ message: 'Failed to fetch all visitor details' });
  }
};

module.exports = userController;

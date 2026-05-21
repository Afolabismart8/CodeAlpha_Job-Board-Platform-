const User = require("../models/userModel");

exports.uploadResume = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume: user.resume
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};
const User = require("../models/userModel");
const Job = require("../models/jobModels");
const Application = require("../models/applicationModel");

exports.getStats = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,
      usersByRole,
      applicationsByStatus
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
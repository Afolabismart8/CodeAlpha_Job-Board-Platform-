const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  requirements: {
    type: String
  },

  salary: {
    type: Number
  },

  location: {
    type: String
  },

  jobType: {
    type: String,
    enum: ["full-time", "part-time", "remote", "internship"]
  },

  category: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
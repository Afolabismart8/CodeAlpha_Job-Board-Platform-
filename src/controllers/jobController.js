const Job = require("../models/jobModels");
const Application = require("../models/applicationModel")

exports.createJob = async (req, res) => {

  try {

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      category
    } = req.body;

    const job = await Job.create({

      employer: req.user.id,

      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      category

    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

exports.applyForJob = async (req, res) => {

  try { const { coverLetter } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const existingApplication =
      await Application.findOne({
        job: req.params.id,
        candidate: req.user.id
      });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already applied"
      });
    }

    const application = await Application.create({

      job: req.params.id,

      candidate: req.user.id,

      coverLetter

    });

    res.status(201).json({
      message: "Application submitted",
      application
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


exports.getJobs = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const filters = {};

    // FILTERS
    if (req.query.location) {
      filters.location = req.query.location;
    }

    if (req.query.jobType) {
      filters.jobType = req.query.jobType;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    // SEARCH (keyword search)
    if (req.query.search) {
      filters.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    const jobs = await Job.find(filters)
      .populate("employer", "name email")
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments(filters);

    res.status(200).json({
      totalJobs: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      jobs
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


exports.getSingleJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id)
      .populate("employer", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getJobApplications = async (req, res) => {

  try {

    const applications = await Application.find({
      job: req.params.id
    })

    .populate("candidate", "name email")
    .populate("job", "title");

    res.status(200).json({
      count: applications.length,
      applications
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

exports.updateApplicationStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Check if logged-in user owns the job
    if (
      application.job.employer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};
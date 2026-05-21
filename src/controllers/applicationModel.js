exports.applyForJob = async (req, res) => {

  try { const { coverLetter } = req.body;

    // Check job exists
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Prevent duplicate application
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

    // Create application
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
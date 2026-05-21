const express = require("express");

const router = express.Router();

const {createJob,getJobs,getSingleJob,applyForJob,
    getJobApplications,updateApplicationStatus} = require("../controllers/jobController");

const {protect} = require("../middlewares/authMiddleware");
const {authorizeRoles} = require("../middlewares/roleMiddleware");

// Create Job
router.post("/",protect,authorizeRoles("employer"),createJob);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getSingleJob);

// Apply For Job
router.post("/:id/apply", protect,authorizeRoles("candidate"),applyForJob);

// Employer View Applications
router.get("/:id/applications",protect,authorizeRoles("employer"),getJobApplications);

// Update Application Status
router.patch("/:id/applications/status",protect,authorizeRoles("employer"),updateApplicationStatus);

module.exports = router;
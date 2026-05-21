const express = require("express");
const router = express.Router();

const {getStats,getAllUsers,getAllJobs,deleteUser,deleteJob} = require("../controllers/adminController");

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// Stats
router.get("/stats", protect, authorizeRoles("admin"), getStats);

// Users
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);

// Jobs
router.get("/jobs", protect, authorizeRoles("admin"), getAllJobs);
router.delete("/jobs/:id", protect, authorizeRoles("admin"), deleteJob);

module.exports = router;
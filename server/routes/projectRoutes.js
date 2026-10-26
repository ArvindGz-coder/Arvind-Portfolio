const express = require("express");

const router = express.Router();

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// Public route
router.get("/", getProjects);

// Protected admin routes
router.post("/", authMiddleware, createProject);

router.put("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
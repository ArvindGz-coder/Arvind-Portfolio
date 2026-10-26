const express = require("express");
const router = express.Router();

const {
  getMessages,
  markMessageAsRead,
  deleteMessage,
} = require("../controllers/messageController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getMessages);

router.patch("/:id/read", authMiddleware, markMessageAsRead);

router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;
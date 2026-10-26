const Contact = require("../models/Contacts");

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

// Mark message as read
const markMessageAsRead = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    console.error("Mark message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
};

// Delete message
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};

module.exports = {
  getMessages,
  markMessageAsRead,
  deleteMessage,
};
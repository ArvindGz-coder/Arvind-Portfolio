const Project = require("../models/Projects");
const Contact = require("../models/Contacts");

const getStats = async (req, res) => {
  try {
    const [projectCount, messageCount, unreadCount] =
      await Promise.all([
        Project.countDocuments(),
        Contact.countDocuments(),
        Contact.countDocuments({ read: false }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        projects: projectCount,
        messages: messageCount,
        unreadMessages: unreadCount,
      },
    });
  } catch (error) {
    console.error("Get admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin statistics",
    });
  }
};

module.exports = {
  getStats,
};
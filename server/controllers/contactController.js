const Contact = require("../models/Contacts");
const { sendContactEmail } = require("../services/emailService");

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    let contact = null;
    // Attempt to save message to MongoDB if available
    try {
      contact = await Contact.create({
        name,
        email,
        message,
        status: "new",
      });
    } catch (dbError) {
      console.warn("MongoDB write skipped or failed:", dbError.message);
    }

    // Send email notification to Arvind Gupta
    try {
      await sendContactEmail({
        name,
        email,
        message,
      });

      return res.status(201).json({
        success: true,
        message: "Message sent and delivered to Arvind's inbox successfully!",
        data: contact || { name, email, message },
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);

      if (contact) {
        return res.status(201).json({
          success: true,
          message: "Message received and stored in database.",
          data: contact,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to send email notification.",
        error: emailError.message,
      });
    }
  } catch (error) {
    console.error("Create contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
};
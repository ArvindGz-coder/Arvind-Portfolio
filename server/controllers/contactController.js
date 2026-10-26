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

    // Save message to MongoDB
    const contact = await Contact.create({
      name,
      email,
      message,
      status: "new",
    });

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        message,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);

      // Message is still safely stored in MongoDB
      return res.status(201).json({
        success: true,
        message:
          "Message received, but email notification could not be sent.",
        data: contact,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
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
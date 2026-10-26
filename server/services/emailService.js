const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async ({ name, email, message }) => {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New Portfolio Contact — ${name}`,
    text: `
You received a new message from your portfolio.

Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
      <h2>New Portfolio Contact</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>

      <h3>Message</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
};

module.exports = {
  sendContactEmail,
};
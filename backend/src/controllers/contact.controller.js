const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const { smtp } = require('../config/env');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: Number(smtp.port) || 587,
  secure: false,
  auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
});

// POST /api/contact
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  await transporter.sendMail({
    from: smtp.from,
    to: smtp.user,
    replyTo: email,
    subject: `SkillForge contact form: ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  }).catch(() => null); // Contact form should never 500 on the user just because SMTP hiccups.

  res.status(200).json(new ApiResponse(200, null, 'Message sent. We will get back to you soon.'));
});

module.exports = { submitContactForm };

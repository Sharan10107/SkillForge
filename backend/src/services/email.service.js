const nodemailer = require('nodemailer');
const { smtp, clientUrl } = require('../config/env');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: Number(smtp.port) || 587,
  secure: false,
  auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
});

const send = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({ from: smtp.from, to, subject, html });
  } catch (err) {
    // Email failures should never crash the request that triggered them
    // (e.g. signup should still succeed even if the verification email fails).
    logger.error('Email send failed:', err.message);
  }
};

const sendVerificationEmail = (to, token) =>
  send({
    to,
    subject: 'Verify your SkillForge email',
    html: `<p>Welcome to SkillForge. Click below to verify your email:</p>
           <p><a href="${clientUrl}/verify-email?token=${token}">Verify Email</a></p>`,
  });

const sendPasswordResetEmail = (to, token) =>
  send({
    to,
    subject: 'Reset your SkillForge password',
    html: `<p>You requested a password reset. Click below to continue:</p>
           <p><a href="${clientUrl}/reset-password?token=${token}">Reset Password</a></p>
           <p>If you didn't request this, you can safely ignore this email.</p>`,
  });

module.exports = { sendVerificationEmail, sendPasswordResetEmail };

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../config/constants');

const socialLinksSchema = new mongoose.Schema(
  {
    github: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    portfolio: { type: String, trim: true, default: '' },
    twitter: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, trim: true },
    startYear: { type: Number },
    endYear: { type: Number },
    description: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, trim: true, maxlength: 800 },
  },
  { timestamps: true }
);

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: Date },
    credentialUrl: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, maxlength: 500 },
    date: { type: Date },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 80 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email'],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.STUDENT },

    headline: { type: String, trim: true, maxlength: 120, default: '' },
    bio: { type: String, trim: true, maxlength: 600, default: '' },
    avatarUrl: { type: String, default: '' },
    avatarPublicId: { type: String, default: '' },
    bannerUrl: { type: String, default: '' },
    bannerPublicId: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    location: { type: String, trim: true, default: '' },

    skills: [{ type: String, trim: true }],
    socialLinks: { type: socialLinksSchema, default: () => ({}) },
    education: [educationSchema],
    experience: [experienceSchema],
    certificates: [certificateSchema],
    achievements: [achievementSchema],

    isEmailVerified: { type: Boolean, default: false },
    emailVerificationTokenHash: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },

    isBanned: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    slug: { type: String, unique: true, sparse: true, index: true },
  },
  { timestamps: true }
);

userSchema.index({ name: 'text', headline: 'text', skills: 'text' });

// Hash the password whenever it's set or changed, never on unrelated saves.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.emailVerificationTokenHash;
  delete obj.passwordResetTokenHash;
  return obj;
};

module.exports = mongoose.model('User', userSchema);

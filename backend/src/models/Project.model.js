const mongoose = require('mongoose');
const slugify = require('slugify');
const { PROJECT_STATUS, PROJECT_CATEGORIES } = require('../config/constants');

const galleryImageSchema = new mongoose.Schema(
  { url: { type: String, required: true }, publicId: { type: String, required: true } },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 120 },
    slug: { type: String, unique: true, index: true },
    tagline: { type: String, trim: true, maxlength: 160 },
    description: { type: String, required: [true, 'Description is required'], trim: true, maxlength: 5000 },
    category: { type: String, enum: PROJECT_CATEGORIES, required: true },
    tags: [{ type: String, trim: true, lowercase: true }],

    coverImage: { url: { type: String, default: '' }, publicId: { type: String, default: '' } },
    gallery: [galleryImageSchema],

    githubUrl: { type: String, trim: true, default: '' },
    liveUrl: { type: String, trim: true, default: '' },
    videoUrl: { type: String, trim: true, default: '' },

    techStack: [{ type: String, trim: true }],
    status: { type: String, enum: Object.values(PROJECT_STATUS), default: PROJECT_STATUS.PUBLISHED },
    isFeatured: { type: Boolean, default: false },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },

    isReported: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index powers full-text search across title/description/tags.
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });
projectSchema.index({ category: 1, status: 1, createdAt: -1 });
projectSchema.index({ likesCount: -1 });

projectSchema.pre('validate', function generateSlug(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = `${slugify(this.title || 'project', { lower: true, strict: true })}-${Date.now()
      .toString(36)}`;
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);

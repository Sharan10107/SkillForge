const mongoose = require('mongoose');
const { REPORT_STATUS } = require('../config/constants');

const reportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    reason: { type: String, required: true, trim: true, maxlength: 500 },
    status: { type: String, enum: Object.values(REPORT_STATUS), default: REPORT_STATUS.PENDING },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);

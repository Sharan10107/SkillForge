const Notification = require('../models/Notification.model');

// Fire-and-forget notification creator used by like/comment/bookmark flows.
// Never notify a user about their own action.
const notify = async ({ recipient, sender, type, project, message }) => {
  if (String(recipient) === String(sender)) return null;
  return Notification.create({ recipient, sender, type, project, message });
};

module.exports = { notify };

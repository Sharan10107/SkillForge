const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');
const logger = require('./utils/logger');

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    logger.info(`SkillForge API listening on port ${port}`);
  });
};

start();

// Surface unhandled promise rejections instead of failing silently.
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled promise rejection:', err);
  process.exit(1);
});

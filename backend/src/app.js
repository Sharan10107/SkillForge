const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const { clientUrl, nodeEnv } = require('./config/env');
const { apiLimiter } = require('./middlewares/rateLimiter.middleware');
const errorHandler = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notFound.middleware');
const routes = require('./routes');

const app = express();
app.set('trust proxy', 1);

// --- Security & parsing middleware ---
app.use(helmet());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

if (nodeEnv === 'development') app.use(morgan('dev'));

app.use('/api', apiLimiter);

// --- Health check (used by Render/uptime monitors) ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'SkillForge API is running', timestamp: new Date().toISOString() });
});

// --- Main API routes ---
app.use('/api', routes);

// --- 404 + centralized error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;

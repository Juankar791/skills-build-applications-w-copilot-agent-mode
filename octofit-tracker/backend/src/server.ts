import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Codespaces support - generate API URL based on environment
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

const API_URL = getApiUrl();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker Backend is running',
    apiUrl: API_URL,
    port: PORT,
    mongodb: MONGODB_URI,
    codespace: process.env.CODESPACE_NAME || 'local'
  });
});

// Import route handlers
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

// Mount routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║      OctoFit Tracker Backend - Logic Tier Started          ║
╠════════════════════════════════════════════════════════════╣
║  API URL:     ${API_URL.padEnd(50)}║
║  Port:        ${PORT.toString().padEnd(50)}║
║  MongoDB:     ${MONGODB_URI.padEnd(50)}║
║  Codespace:   ${(process.env.CODESPACE_NAME || 'local').padEnd(50)}║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;

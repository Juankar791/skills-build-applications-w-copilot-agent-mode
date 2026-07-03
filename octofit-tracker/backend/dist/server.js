"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Codespaces support - generate API URL based on environment
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const API_URL = getApiUrl();
// Middleware
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
// Health Check
app.get('/api/health', (req, res) => {
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
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
// Mount routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Error handling middleware
app.use((err, req, res) => {
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
exports.default = app;
//# sourceMappingURL=server.js.map
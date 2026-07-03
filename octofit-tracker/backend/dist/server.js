"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
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
// Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker Backend is running',
        port: PORT,
        mongodb: MONGODB_URI
    });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment:`);
    console.log(`  - Backend Port: ${PORT}`);
    console.log(`  - MongoDB URI: ${MONGODB_URI}`);
    console.log(`  - Frontend Port: 5173`);
});
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    activitiesCompleted: { type: Number, default: 0 },
    period: { type: String, enum: ['global', 'weekly', 'monthly'], default: 'global' }
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
//# sourceMappingURL=Leaderboard.js.map
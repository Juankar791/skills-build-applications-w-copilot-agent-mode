"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
/**
 * GET /api/leaderboard
 * Retrieve global leaderboard (top users by activity/points)
 */
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period: 'global' })
            .sort({ rank: 1 })
            .populate('userId', 'username email');
        res.json({
            message: 'Get global leaderboard',
            count: leaderboard.length,
            data: leaderboard
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * GET /api/leaderboard/teams
 * Retrieve team leaderboard
 */
router.get('/teams', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find()
            .sort({ totalPoints: -1 })
            .limit(10);
        res.json({
            message: 'Get team leaderboard',
            count: leaderboard.length,
            data: leaderboard
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * GET /api/leaderboard/weekly
 * Retrieve weekly leaderboard
 */
router.get('/weekly', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period: 'weekly' })
            .sort({ rank: 1 })
            .populate('userId', 'username email');
        res.json({
            message: 'Get weekly leaderboard',
            count: leaderboard.length,
            data: leaderboard
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * GET /api/leaderboard/monthly
 * Retrieve monthly leaderboard
 */
router.get('/monthly', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period: 'monthly' })
            .sort({ rank: 1 })
            .populate('userId', 'username email');
        res.json({
            message: 'Get monthly leaderboard',
            count: leaderboard.length,
            data: leaderboard
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * GET /api/leaderboard/user/:userId
 * Retrieve user's position on leaderboard
 */
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const entry = await Leaderboard_1.Leaderboard.findOne({ userId, period: 'global' })
            .populate('userId', 'username email');
        if (!entry) {
            return res.status(404).json({ error: 'User not found on leaderboard' });
        }
        res.json({
            message: 'Get user leaderboard position',
            data: entry
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * GET /api/leaderboard/team/:teamId
 * Retrieve team members leaderboard
 */
router.get('/team/:teamId', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find()
            .sort({ totalPoints: -1 })
            .populate('userId', 'username email');
        res.json({
            message: 'Get team members leaderboard',
            count: leaderboard.length,
            data: leaderboard
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map
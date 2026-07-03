"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
/**
 * GET /api/workouts
 * Retrieve all available workouts
 */
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('userId', 'username email');
        res.json({
            message: 'Get all workouts',
            count: workouts.length,
            data: workouts
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * POST /api/workouts
 * Create a new personalized workout suggestion
 */
router.post('/', async (req, res) => {
    try {
        const newWorkout = new Workout_1.Workout(req.body);
        await newWorkout.save();
        res.status(201).json({
            message: 'Workout created successfully',
            data: newWorkout
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
/**
 * GET /api/workouts/:id
 * Retrieve a specific workout by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findById(id).populate('userId', 'username email');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: 'Get workout by ID',
            data: workout
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * GET /api/workouts/user/:userId
 * Retrieve personalized workout suggestions for a user
 */
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const workouts = await Workout_1.Workout.find({ userId });
        res.json({
            message: 'Get personalized workouts for user',
            count: workouts.length,
            data: workouts
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * PUT /api/workouts/:id
 * Update workout details
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkout = await Workout_1.Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: 'Workout updated successfully',
            data: updatedWorkout
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
/**
 * DELETE /api/workouts/:id
 * Delete workout
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkout = await Workout_1.Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: 'Workout deleted successfully',
            data: deletedWorkout
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * POST /api/workouts/:id/complete
 * Mark workout as completed
 */
router.post('/:id/complete', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkout = await Workout_1.Workout.findByIdAndUpdate(id, {
            completed: true,
            completedDate: new Date()
        }, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: 'Workout marked as completed',
            data: updatedWorkout
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map
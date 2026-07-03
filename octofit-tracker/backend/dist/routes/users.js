"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
/**
 * GET /api/users
 * Retrieve all users
 */
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json({
            message: 'Get all users',
            count: users.length,
            data: users
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * POST /api/users
 * Create a new user
 */
router.post('/', async (req, res) => {
    try {
        const newUser = new User_1.User(req.body);
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
/**
 * GET /api/users/:id
 * Retrieve a specific user by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: 'Get user by ID',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * PUT /api/users/:id
 * Update user profile
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User_1.User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
/**
 * DELETE /api/users/:id
 * Delete user account
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User_1.User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map
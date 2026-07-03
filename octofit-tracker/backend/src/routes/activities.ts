import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

/**
 * GET /api/activities
 * Retrieve all activities
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'username email');
    res.json({
      message: 'Get all activities',
      count: activities.length,
      data: activities
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/activities
 * Log a new activity
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json({
      message: 'Activity logged successfully',
      data: newActivity
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/activities/:id
 * Retrieve a specific activity by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId', 'username email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: 'Get activity by ID',
      data: activity
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/activities/user/:userId
 * Retrieve all activities for a specific user
 */
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ userId }).sort({ createdAt: -1 });
    res.json({
      message: 'Get activities for user',
      count: activities.length,
      data: activities
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/activities/:id
 * Update activity details
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: 'Activity updated successfully',
      data: updatedActivity
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/activities/:id
 * Delete activity
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: 'Activity deleted successfully',
      data: deletedActivity
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

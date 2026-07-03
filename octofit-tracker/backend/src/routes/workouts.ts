import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

/**
 * GET /api/workouts
 * Retrieve all available workouts
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId', 'username email');
    res.json({
      message: 'Get all workouts',
      count: workouts.length,
      data: workouts
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/workouts
 * Create a new personalized workout suggestion
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json({
      message: 'Workout created successfully',
      data: newWorkout
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/workouts/:id
 * Retrieve a specific workout by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('userId', 'username email');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: 'Get workout by ID',
      data: workout
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/workouts/user/:userId
 * Retrieve personalized workout suggestions for a user
 */
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId });
    res.json({
      message: 'Get personalized workouts for user',
      count: workouts.length,
      data: workouts
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/workouts/:id
 * Update workout details
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: 'Workout updated successfully',
      data: updatedWorkout
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/workouts/:id
 * Delete workout
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: 'Workout deleted successfully',
      data: deletedWorkout
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/workouts/:id/complete
 * Mark workout as completed
 */
router.post('/:id/complete', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      {
        completed: true,
        completedDate: new Date()
      },
      { new: true }
    );
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: 'Workout marked as completed',
      data: updatedWorkout
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

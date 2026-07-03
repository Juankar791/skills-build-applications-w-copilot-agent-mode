import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

/**
 * GET /api/teams
 * Retrieve all teams
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('leader members', 'username email firstName lastName');
    res.json({
      message: 'Get all teams',
      count: teams.length,
      data: teams
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/teams
 * Create a new team
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json({
      message: 'Team created successfully',
      data: newTeam
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/teams/:id
 * Retrieve a specific team by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('leader members', 'username email firstName lastName');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: 'Get team by ID',
      data: team
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/teams/:id
 * Update team details
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: 'Team updated successfully',
      data: updatedTeam
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/teams/:id
 * Delete team
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: 'Team deleted successfully',
      data: deletedTeam
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/teams/:id/members
 * Add member to team
 */
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      id,
      { $addToSet: { members: userId } },
      { new: true }
    );
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: 'Member added to team',
      data: team
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

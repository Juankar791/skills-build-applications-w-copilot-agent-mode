import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/leaderboard
 * Retrieve global leaderboard (top users by activity/points)
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get global leaderboard',
    endpoint: '/api/leaderboard',
    method: 'GET',
    status: 'Not implemented yet'
  });
});

/**
 * GET /api/leaderboard/teams
 * Retrieve team leaderboard
 */
router.get('/teams', (req: Request, res: Response) => {
  res.json({
    message: 'Get team leaderboard',
    endpoint: '/api/leaderboard/teams',
    method: 'GET',
    status: 'Not implemented yet'
  });
});

/**
 * GET /api/leaderboard/weekly
 * Retrieve weekly leaderboard
 */
router.get('/weekly', (req: Request, res: Response) => {
  res.json({
    message: 'Get weekly leaderboard',
    endpoint: '/api/leaderboard/weekly',
    method: 'GET',
    status: 'Not implemented yet'
  });
});

/**
 * GET /api/leaderboard/monthly
 * Retrieve monthly leaderboard
 */
router.get('/monthly', (req: Request, res: Response) => {
  res.json({
    message: 'Get monthly leaderboard',
    endpoint: '/api/leaderboard/monthly',
    method: 'GET',
    status: 'Not implemented yet'
  });
});

/**
 * GET /api/leaderboard/user/:userId
 * Retrieve user's position on leaderboard
 */
router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({
    message: 'Get user leaderboard position',
    endpoint: '/api/leaderboard/user/:userId',
    method: 'GET',
    userId: userId,
    status: 'Not implemented yet'
  });
});

/**
 * GET /api/leaderboard/team/:teamId
 * Retrieve team members leaderboard
 */
router.get('/team/:teamId', (req: Request, res: Response) => {
  const { teamId } = req.params;
  res.json({
    message: 'Get team members leaderboard',
    endpoint: '/api/leaderboard/team/:teamId',
    method: 'GET',
    teamId: teamId,
    status: 'Not implemented yet'
  });
});

export default router;

import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/User';
import TeamModel from './models/Team';
import ActivityModel from './models/Activity';
import LeaderboardEntryModel from './models/LeaderboardEntry';
import WorkoutModel from './models/Workout';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:8000`;
const apiBaseUrl = `${apiHost}/api`;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiBaseUrl,
    routes: {
      users: `${apiBaseUrl}/users/`,
      teams: `${apiBaseUrl}/teams/`,
      activities: `${apiBaseUrl}/activities/`,
      leaderboard: `${apiBaseUrl}/leaderboard/`,
      workouts: `${apiBaseUrl}/workouts/`,
    },
  });
});

app.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find().sort({ name: 1 });
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find()
    .populate('owner', 'name email')
    .populate('members', 'name email');
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find()
    .populate('user', 'name email')
    .sort({ date: -1 });
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntryModel.find()
    .populate('user', 'name email')
    .sort({ rank: 1 });
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ durationMinutes: 1 });
  res.json(workouts);
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
      if (codespaceName) {
        console.log(`Codespaces-aware API base URL: ${apiBaseUrl}`);
      }
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();

import mongoose from 'mongoose';
import UserModel from '../models/User';
import TeamModel from '../models/Team';
import ActivityModel from '../models/Activity';
import LeaderboardEntryModel from '../models/LeaderboardEntry';
import WorkoutModel from '../models/Workout';

// Seed the octofit_db database with test data
async function seedDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  console.log('Connecting to MongoDB for seed:', mongoUri);
  await mongoose.connect(mongoUri);

  try {
    console.log('Clearing existing collections...');
    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      { name: 'Avery Octo', email: 'avery@octofit.app' },
      { name: 'Sam Tracker', email: 'sam@octofit.app' },
      { name: 'Morgan Pace', email: 'morgan@octofit.app' },
    ]);

    const teams = await TeamModel.create([
      {
        name: 'Team Kraken',
        description: 'Highly motivated athletes focused on strength and endurance.',
        owner: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'OctoSprinters',
        description: 'Agile runners chasing weekly speed and distance goals.',
        owner: users[1]._id,
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await UserModel.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await UserModel.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await UserModel.updateOne({ _id: users[2]._id }, { team: teams[1]._id });

    const workouts = await WorkoutModel.create([
      {
        title: 'Full Body Strength',
        description: 'A balanced strength routine for core, legs, and upper body.',
        difficulty: 'Intermediate',
        durationMinutes: 60,
        category: 'Strength',
      },
      {
        title: 'HIIT Endurance',
        description: 'High intensity interval training with running and bodyweight circuits.',
        difficulty: 'Advanced',
        durationMinutes: 30,
        category: 'Endurance',
      },
      {
        title: 'Recovery Flow',
        description: 'Gentle stretching and mobility to help with muscle recovery.',
        difficulty: 'Beginner',
        durationMinutes: 25,
        category: 'Recovery',
      },
    ]);

    const activities = await ActivityModel.create([
      {
        user: users[0]._id,
        type: 'Running',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        durationMinutes: 35,
        caloriesBurned: 380,
        distanceKm: 5.2,
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        durationMinutes: 50,
        caloriesBurned: 520,
        distanceKm: 18.3,
      },
      {
        user: users[2]._id,
        type: 'Strength Training',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        durationMinutes: 55,
        caloriesBurned: 430,
      },
    ]);

    const leaderboard = await LeaderboardEntryModel.create([
      { user: users[0]._id, rank: 1, score: 980, weeklyPoints: 240 },
      { user: users[1]._id, rank: 2, score: 920, weeklyPoints: 215 },
      { user: users[2]._id, rank: 3, score: 860, weeklyPoints: 190 },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded workouts:', workouts.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard entries:', leaderboard.length);
    console.log('Seed the octofit_db database with test data completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});

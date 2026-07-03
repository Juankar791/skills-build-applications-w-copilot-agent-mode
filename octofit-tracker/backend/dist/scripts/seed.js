"use strict";
/**
 * Seed the octofit_db database with test data
 *
 * This script initializes the OctoFit Tracker database with sample users,
 * teams, activities, leaderboard entries, and workouts for testing purposes.
 *
 * Run with: npm run seed
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const seedDatabase = async () => {
    try {
        console.log('🌱 Seeding the octofit_db database with test data...\n');
        // Connect to MongoDB
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✓ Connected to MongoDB\n');
        // Clear existing data
        console.log('🧹 Clearing existing collections...');
        await Promise.all([
            User_1.User.deleteMany({}),
            Team_1.Team.deleteMany({}),
            Activity_1.Activity.deleteMany({}),
            Leaderboard_1.Leaderboard.deleteMany({}),
            Workout_1.Workout.deleteMany({})
        ]);
        console.log('✓ Collections cleared\n');
        // Create sample users
        console.log('👥 Creating sample users...');
        const users = await User_1.User.insertMany([
            {
                username: 'alex_fitness',
                email: 'alex@example.com',
                password: 'hashed_password_123',
                firstName: 'Alex',
                lastName: 'Johnson',
                bio: 'Fitness enthusiast and marathon runner',
                points: 1250,
                level: 5
            },
            {
                username: 'jordan_active',
                email: 'jordan@example.com',
                password: 'hashed_password_456',
                firstName: 'Jordan',
                lastName: 'Smith',
                bio: 'Love yoga and outdoor activities',
                points: 980,
                level: 4
            },
            {
                username: 'sam_gym',
                email: 'sam@example.com',
                password: 'hashed_password_789',
                firstName: 'Sam',
                lastName: 'Williams',
                bio: 'Gym rat and strength training advocate',
                points: 1520,
                level: 6
            },
            {
                username: 'morgan_runner',
                email: 'morgan@example.com',
                password: 'hashed_password_101',
                firstName: 'Morgan',
                lastName: 'Davis',
                bio: 'Trail runner and outdoor explorer',
                points: 850,
                level: 3
            },
            {
                username: 'casey_cyclist',
                email: 'casey@example.com',
                password: 'hashed_password_102',
                firstName: 'Casey',
                lastName: 'Brown',
                bio: 'Cycling enthusiast',
                points: 720,
                level: 3
            }
        ]);
        console.log(`✓ Created ${users.length} users\n`);
        // Create sample teams
        console.log('🏆 Creating sample teams...');
        const teams = await Team_1.Team.insertMany([
            {
                name: 'Morning Warriors',
                description: 'Early risers who love morning workouts',
                leader: users[0]._id,
                members: [users[0]._id, users[1]._id, users[3]._id],
                totalPoints: 3080
            },
            {
                name: 'Gym Legends',
                description: 'Dedicated strength training team',
                leader: users[2]._id,
                members: [users[2]._id, users[4]._id],
                totalPoints: 2240
            }
        ]);
        console.log(`✓ Created ${teams.length} teams\n`);
        // Create sample activities
        console.log('🏃 Creating sample activities...');
        const activities = await Activity_1.Activity.insertMany([
            {
                userId: users[0]._id,
                activityType: 'Running',
                duration: 45,
                distance: 8.5,
                caloriesBurned: 620,
                intensity: 'high',
                points: 150,
                description: 'Morning run in the park'
            },
            {
                userId: users[0]._id,
                activityType: 'Yoga',
                duration: 60,
                caloriesBurned: 200,
                intensity: 'low',
                points: 80,
                description: 'Relaxing evening yoga session'
            },
            {
                userId: users[1]._id,
                activityType: 'Cycling',
                duration: 90,
                distance: 35,
                caloriesBurned: 800,
                intensity: 'medium',
                points: 180,
                description: 'Long distance cycling'
            },
            {
                userId: users[2]._id,
                activityType: 'Weight Lifting',
                duration: 75,
                caloriesBurned: 550,
                intensity: 'high',
                points: 160,
                description: 'Chest and triceps day'
            },
            {
                userId: users[2]._id,
                activityType: 'Swimming',
                duration: 45,
                distance: 2.0,
                caloriesBurned: 450,
                intensity: 'medium',
                points: 120,
                description: 'Lap swimming'
            },
            {
                userId: users[3]._id,
                activityType: 'Trail Running',
                duration: 60,
                distance: 10,
                caloriesBurned: 700,
                intensity: 'high',
                points: 170,
                description: 'Challenging trail run'
            },
            {
                userId: users[4]._id,
                activityType: 'Cycling',
                duration: 120,
                distance: 50,
                caloriesBurned: 1000,
                intensity: 'high',
                points: 220,
                description: 'Century ride'
            }
        ]);
        console.log(`✓ Created ${activities.length} activities\n`);
        // Create leaderboard entries
        console.log('📊 Creating leaderboard entries...');
        const leaderboardEntries = await Leaderboard_1.Leaderboard.insertMany([
            {
                userId: users[2]._id,
                username: users[2].username,
                rank: 1,
                totalPoints: 1520,
                activitiesCompleted: 5,
                period: 'global'
            },
            {
                userId: users[0]._id,
                username: users[0].username,
                rank: 2,
                totalPoints: 1250,
                activitiesCompleted: 4,
                period: 'global'
            },
            {
                userId: users[1]._id,
                username: users[1].username,
                rank: 3,
                totalPoints: 980,
                activitiesCompleted: 3,
                period: 'global'
            },
            {
                userId: users[3]._id,
                username: users[3].username,
                rank: 4,
                totalPoints: 850,
                activitiesCompleted: 2,
                period: 'global'
            },
            {
                userId: users[4]._id,
                username: users[4].username,
                rank: 5,
                totalPoints: 720,
                activitiesCompleted: 2,
                period: 'global'
            }
        ]);
        console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries\n`);
        // Create sample workouts
        console.log('💪 Creating sample workouts...');
        const workouts = await Workout_1.Workout.insertMany([
            {
                name: 'Beginner Full Body',
                description: 'Great for starting your fitness journey',
                difficulty: 'beginner',
                duration: 30,
                caloriesBurned: 200,
                exercises: [
                    { name: 'Squats', sets: 3, reps: 12 },
                    { name: 'Push-ups', sets: 3, reps: 8 },
                    { name: 'Plank', sets: 3, reps: 1, duration: 30 }
                ]
            },
            {
                name: 'Intermediate HIIT',
                description: 'High intensity interval training for cardio',
                difficulty: 'intermediate',
                duration: 20,
                caloriesBurned: 300,
                exercises: [
                    { name: 'Burpees', sets: 4, reps: 10 },
                    { name: 'Mountain Climbers', sets: 4, reps: 20 },
                    { name: 'Jump Squats', sets: 4, reps: 15 }
                ]
            },
            {
                name: 'Advanced CrossFit WOD',
                description: 'Complex CrossFit workout of the day',
                difficulty: 'advanced',
                duration: 45,
                caloriesBurned: 500,
                exercises: [
                    { name: 'Deadlifts', sets: 5, reps: 5 },
                    { name: 'Muscle Ups', sets: 3, reps: 8 },
                    { name: 'Box Jumps', sets: 4, reps: 12 }
                ]
            },
            {
                userId: users[0]._id,
                name: 'Morning Run Prep',
                description: 'Warm-up stretches before running',
                difficulty: 'beginner',
                duration: 15,
                caloriesBurned: 50,
                exercises: [
                    { name: 'Leg Swings', sets: 2, reps: 10 },
                    { name: 'Walking Lunges', sets: 2, reps: 8 }
                ],
                completed: true,
                completedDate: new Date()
            },
            {
                userId: users[2]._id,
                name: 'Chest Day',
                description: 'Focused chest and triceps workout',
                difficulty: 'intermediate',
                duration: 50,
                caloriesBurned: 400,
                exercises: [
                    { name: 'Bench Press', sets: 4, reps: 8 },
                    { name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
                    { name: 'Tricep Dips', sets: 3, reps: 12 }
                ],
                completed: true,
                completedDate: new Date()
            }
        ]);
        console.log(`✓ Created ${workouts.length} workouts\n`);
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✅ Database seeding completed successfully!');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('\n📊 Summary:');
        console.log(`  • Users: ${users.length}`);
        console.log(`  • Teams: ${teams.length}`);
        console.log(`  • Activities: ${activities.length}`);
        console.log(`  • Leaderboard Entries: ${leaderboardEntries.length}`);
        console.log(`  • Workouts: ${workouts.length}`);
        console.log(`\n🔗 Database: ${MONGODB_URI}\n`);
        await mongoose_1.default.connection.close();
        console.log('Disconnected from MongoDB\n');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};
// Run the seed function
seedDatabase();
//# sourceMappingURL=seed.js.map
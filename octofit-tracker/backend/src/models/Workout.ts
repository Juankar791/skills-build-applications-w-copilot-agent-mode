import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  userId?: Types.ObjectId;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  caloriesBurned: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }[];
  completed: boolean;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        duration: { type: Number }
      }
    ],
    completed: { type: Boolean, default: false },
    completedDate: { type: Date }
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);

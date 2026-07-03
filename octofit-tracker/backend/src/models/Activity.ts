import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  activityType: string;
  duration: number;
  distance?: number;
  caloriesBurned: number;
  intensity: 'low' | 'medium' | 'high';
  points: number;
  description?: string;
  timestamp: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    caloriesBurned: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    points: { type: Number, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);

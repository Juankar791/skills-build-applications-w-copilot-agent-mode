import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  username: string;
  rank: number;
  totalPoints: number;
  activitiesCompleted: number;
  period: 'global' | 'weekly' | 'monthly';
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    activitiesCompleted: { type: Number, default: 0 },
    period: { type: String, enum: ['global', 'weekly', 'monthly'], default: 'global' }
  },
  { timestamps: true }
);

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);

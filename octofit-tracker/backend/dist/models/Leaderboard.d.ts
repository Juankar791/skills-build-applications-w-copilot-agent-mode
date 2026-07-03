import { Document, Types } from 'mongoose';
export interface ILeaderboardEntry extends Document {
    userId: Types.ObjectId;
    username: string;
    rank: number;
    totalPoints: number;
    activitiesCompleted: number;
    period: 'global' | 'weekly' | 'monthly';
    updatedAt: Date;
}
export declare const Leaderboard: import("mongoose").Model<ILeaderboardEntry, {}, {}, {}, Document<unknown, {}, ILeaderboardEntry, {}, {}> & ILeaderboardEntry & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Leaderboard.d.ts.map
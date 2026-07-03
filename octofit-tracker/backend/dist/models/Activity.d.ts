import { Document, Types } from 'mongoose';
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
export declare const Activity: import("mongoose").Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, {}> & IActivity & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Activity.d.ts.map
import { Document, Types } from 'mongoose';
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
export declare const Workout: import("mongoose").Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, {}> & IWorkout & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Workout.d.ts.map
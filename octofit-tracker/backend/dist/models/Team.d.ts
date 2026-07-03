import { Document, Types } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    description: string;
    leader: Types.ObjectId;
    members: Types.ObjectId[];
    totalPoints: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Team: import("mongoose").Model<ITeam, {}, {}, {}, Document<unknown, {}, ITeam, {}, {}> & ITeam & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Team.d.ts.map
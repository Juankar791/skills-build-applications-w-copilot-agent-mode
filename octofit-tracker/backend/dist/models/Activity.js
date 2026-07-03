"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    caloriesBurned: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    points: { type: Number, required: true },
    description: { type: String }
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
//# sourceMappingURL=Activity.js.map
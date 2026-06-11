import { Schema, model, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  date: Date;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    date: { type: Date, default: () => new Date() },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number },
  },
  { timestamps: true }
);

const ActivityModel = model<ActivityDocument>('Activity', activitySchema);
export default ActivityModel;

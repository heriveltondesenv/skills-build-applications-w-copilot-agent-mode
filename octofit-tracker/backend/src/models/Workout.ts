import { Schema, model, Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  category: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema);
export default WorkoutModel;

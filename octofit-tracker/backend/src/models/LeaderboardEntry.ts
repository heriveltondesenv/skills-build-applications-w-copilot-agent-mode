import { Schema, model, Document } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  user: Schema.Types.ObjectId;
  rank: number;
  score: number;
  weeklyPoints: number;
}

const leaderboardSchema = new Schema<LeaderboardEntryDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    weeklyPoints: { type: Number, required: true },
  },
  { timestamps: true }
);

const LeaderboardEntryModel = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntryModel;

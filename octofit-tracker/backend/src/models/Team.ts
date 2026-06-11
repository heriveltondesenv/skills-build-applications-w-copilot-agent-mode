import { Schema, model, Document } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const TeamModel = model<TeamDocument>('Team', teamSchema);
export default TeamModel;

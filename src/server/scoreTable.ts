import { model, Schema, Document } from 'mongoose';

export interface IScoreTable extends Document {
  name: string;
  time: number;
  moves: number;
}

const ScoreTable = new Schema(
  {
    name: { type: String, required: true },
    time: { type: Number, default: 0 },
    moves: { type: Number, default: 0 },
  }
);

const ScoreTableModel = model<IScoreTable>('ScoreTable', ScoreTable);

export default ScoreTableModel;
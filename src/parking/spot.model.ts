import * as mongoose from 'mongoose';

export const SpotSchema = new mongoose.Schema({
  number: { type: String, required: true },
  floor: { type: Number, required: true },
  occupied: { type: Boolean, required: true },
});

export interface Spot extends mongoose.Document {
  id: string;
  number: string;
  floor: number;
  occupied: boolean;
}

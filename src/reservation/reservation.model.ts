import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  spot: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot', required: true },
  date: { type: String, required: true },
  email: { type: String, required: true },
});

export interface Reservation extends mongoose.Document {
  id: string;
  user: string;
  spot: mongoose.Types.ObjectId;
  date: string;
  email: string;
}

import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

// Password hashing helper using Node.js native crypto
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export interface IAppointment extends Document {
  fullName: string;
  contactNumber: string;
  email?: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason?: string;
  createdAt: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: false },
    department: { type: String, required: true },
    doctor: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    reason: { type: String, required: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

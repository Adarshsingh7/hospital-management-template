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

export interface IDepartment extends Document {
  name: string;
  icon?: string;
  createdAt: Date;
}

const DepartmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: false, default: "calendar" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export interface IDoctor extends Document {
  name: string;
  department: string;
  specialty: string;
  subspecialty?: string;
  availability?: string;
  rating?: string;
  image?: string;
  opdDays: number[];
  startTime: string;
  endTime: string;
  createdAt: Date;
}

const DoctorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    specialty: { type: String, required: true },
    subspecialty: { type: String, required: false },
    availability: { type: String, required: false },
    rating: { type: String, required: false, default: "4.8" },
    image: { type: String, required: false, default: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250&h=250" },
    opdDays: { type: [Number], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Department: Model<IDepartment> =
  mongoose.models.Department || mongoose.model<IDepartment>("Department", DepartmentSchema);

export const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);

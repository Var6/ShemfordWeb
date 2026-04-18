import mongoose, { Schema, Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  details: string;
  image: string; // primary / cover image (Cloudinary URL)
  images: string[]; // additional photos
  icon: string;
  gradient: string;
  color: string;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    icon: { type: String, default: "" },
    gradient: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model<IAchievement>("Achievement", AchievementSchema);

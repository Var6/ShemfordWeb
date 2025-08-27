import mongoose, { Schema, Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  details: string;
  image: string; // Cloudinary URL
  icon: string; // Icon name (optional)
  gradient: string;
  color: string;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, default: "" }, // Store icon name instead of component
    gradient: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model<IAchievement>("Achievement", AchievementSchema);

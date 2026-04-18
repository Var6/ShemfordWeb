import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITopper extends Document {
  name: string;
  class: string;
  section: string;
  percentage: string;
  rank: number;
  year: string;
  category: "Class Topper" | "CBSE Board";
  subject: string;
  photo: string;
  message: string;
}

const TopperSchema = new Schema<ITopper>(
  {
    name:       { type: String, required: true },
    class:      { type: String, required: true }, // "10", "12", "5", etc.
    section:    { type: String, default: "" },
    percentage: { type: String, required: true }, // "98.6%" or "492/500"
    rank:       { type: Number, default: 1 },     // 1, 2, 3
    year:       { type: String, required: true }, // "2024-25"
    category:   { type: String, enum: ["Class Topper", "CBSE Board"], default: "Class Topper" },
    subject:    { type: String, default: "Overall" },
    photo:      { type: String, required: true },
    message:    { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.Topper || model<ITopper>("Topper", TopperSchema);

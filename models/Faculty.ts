import mongoose, { Schema, model, models } from "mongoose";

const FacultySchema = new Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    achievements: { type: String },
    experience: { type: String },
    joinedDate: { type: String },
    bio: { type: String },
    message: { type: String },
    profileUrl: { type: String }, // Cloudinary or external URL
  },
  { timestamps: true }
);

const Faculty = models.Faculty || model("Faculty", FacultySchema);
export default Faculty;

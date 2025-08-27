import mongoose, { Schema, model, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    category: { type: String },
    files: [
      {
        url: { type: String },  // Cloudinary URL or direct file URL
        name: { type: String }, // Original filename for display
      },
    ],
  },
  { timestamps: true }
);

const Announcement = models.Announcement || model("Announcement", AnnouncementSchema);
export default Announcement;

import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: string;
  time: string;
  description: string;
  category: string;
  venue: string;
  capacity: number;
  registered: number;
  featured: boolean;
  image: string;
  registerLink: string;
  organizer: string;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    venue: { type: String, required: true },
    capacity: { type: Number, required: true },
    registered: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true }, // Cloudinary URL
    registerLink: { type: String, required: true },
    organizer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

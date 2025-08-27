import mongoose, { Schema, Document } from "mongoose";

export interface IFacility extends Document {
  title: string;
  description: string;
  category: string; // e.g., academic, arts, sports, wellness
  image: string; // gradient or URL
  icon: string; // store icon name as string
  features: string[];
}

const FacilitySchema = new Schema<IFacility>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.models.Facility || mongoose.model<IFacility>("Facility", FacilitySchema);

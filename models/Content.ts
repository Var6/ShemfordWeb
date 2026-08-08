import mongoose, { Schema, Document } from "mongoose";

/**
 * One document per public page. `data` holds only the fields an admin has
 * actually overridden — anything absent falls back to the default declared in
 * lib/content/registry.ts, so the site renders correctly on an empty database.
 */
export interface IContent extends Document {
  page: string;
  data: Record<string, unknown>;
}

const ContentSchema = new Schema<IContent>(
  {
    page: { type: String, required: true, unique: true, index: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.models.Content ||
  mongoose.model<IContent>("Content", ContentSchema);

import mongoose, { Schema, model, models } from "mongoose";

const CalendarSchema = new Schema({
  type: { 
    type: String, 
    enum: ['holiday', 'vacation', 'notice'], 
    required: true 
  },

  // Common fields
  title: { type: String, required: true },
  description: { type: String },

  // Dates
  date: { type: String }, // For single-day holidays
  start: { type: String }, // For vacations
  end: { type: String },
  reopen: { type: String },

  // Holiday-specific fields
  category: { 
    type: String, 
    enum: ['religious', 'national', 'cultural', 'educational', 'celebration', null],
    default: null
  },
  color: { type: String },

  // Notice-specific fields
  priority: { 
    type: String, 
    enum: ['high', 'medium', 'low', null], 
    default: null 
  },
  fileUrl: { type: String }, // Cloudinary link
  fileName: { type: String },

  // Vacation-specific
  icon: { type: String }, // e.g., 'Sun'

}, { timestamps: true });

export default models.Calendar || model("Calendar", CalendarSchema);

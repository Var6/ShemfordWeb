import mongoose, { Schema, model, models } from "mongoose";

const CalendarSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // e.g., religious, national, vacation, academic
    date: { type: Date },                        // For single-day events
    start: { type: Date },                       // For vacations
    end: { type: Date },                         // For vacations
    reopen: { type: Date },                      // Optional reopen date
    priority: { type: String, default: "medium" }, // high, medium, low
    color: { type: String },                     // gradient class for UI
    files: [
      {
        url: String,
        name: String,
      },
    ],
  },
  { timestamps: true }
);

const Calendar = models.Calendar || model("Calendar", CalendarSchema);
export default Calendar;

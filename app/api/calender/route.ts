import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Calendar from "@/models/Calendar";

// Get all entries
export async function GET() {
  await connectDB();
  const items = await Calendar.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

// Add new entry
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newItem = await Calendar.create(data);
  return NextResponse.json(newItem);
}

// Delete entry
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Calendar.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}

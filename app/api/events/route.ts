import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Events";

export async function GET() {
  await connectDB();
  const events = await Event.find().sort({ createdAt: -1 });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newEvent = await Event.create(data);
  return NextResponse.json(newEvent);
}

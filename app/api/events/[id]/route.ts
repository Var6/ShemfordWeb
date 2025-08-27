import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Events";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updatedEvent = await Event.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedEvent);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Event.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Event deleted" });
}

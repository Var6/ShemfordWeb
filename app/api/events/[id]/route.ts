import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Events";

export async function PUT(req: Request) {
  await connectDB();

  // Get ID from URL
  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1]; // last segment = id

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  const data = await req.json();
  const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updatedEvent);
}

export async function DELETE(req: Request) {
  await connectDB();

  // Get ID from URL
  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event deleted" });
}

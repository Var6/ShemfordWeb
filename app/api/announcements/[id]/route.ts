import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export async function PUT(req: Request) {
  await connectDB();

  // Extract id from URL
  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1]; // last segment = id

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  const body = await req.json();
  const updated = await Announcement.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1];

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  await Announcement.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

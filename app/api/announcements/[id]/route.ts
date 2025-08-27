import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { title, date, description, priority, category, files } = await req.json();

  const updated = await Announcement.findByIdAndUpdate(
    params.id,
    { title, date, description, priority, category, files },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Announcement.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

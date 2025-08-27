import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { name, subject, achievements, experience, joinedDate, bio, message, profileUrl } = await req.json();

  const updated = await Faculty.findByIdAndUpdate(
    params.id,
    { name, subject, achievements, experience, joinedDate, bio, message, profileUrl },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Faculty.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

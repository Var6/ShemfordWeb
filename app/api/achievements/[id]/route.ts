import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updatedAchievement = await Achievement.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedAchievement);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Achievement.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Achievement deleted" });
}

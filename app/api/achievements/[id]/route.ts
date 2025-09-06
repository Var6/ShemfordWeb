import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  const { id } = context.params;

  const data = await request.json();
  const updatedAchievement = await Achievement.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(updatedAchievement);
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  const { id } = context.params;

  await Achievement.findByIdAndDelete(id);
  return NextResponse.json({ message: "Achievement deleted" });
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function PUT(request: Request, context: any) {
  await connectDB();
  const { id } = context.params;

  const data = await request.json();
  const updatedAchievement = await Achievement.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedAchievement) {
    return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
  }

  return NextResponse.json(updatedAchievement);
}

export async function DELETE(request: Request, context: any) {
  await connectDB();
  const { id } = context.params;

  const deletedAchievement = await Achievement.findByIdAndDelete(id);

  if (!deletedAchievement) {
    return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Achievement deleted" });
}

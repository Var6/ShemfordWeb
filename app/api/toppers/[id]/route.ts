import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topper from "@/models/Topper";

export async function PUT(req: Request, context: any) {
  await connectDB();
  const { id } = await context.params;
  const data = await req.json();
  const updated = await Topper.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: any) {
  await connectDB();
  const { id } = await context.params;
  const deleted = await Topper.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}

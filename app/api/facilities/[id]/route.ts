import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Facility from "@/models/Facility";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updatedFacility = await Facility.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedFacility);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Facility.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Facility deleted" });
}

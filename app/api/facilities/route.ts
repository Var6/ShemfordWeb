import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Facility from "@/models/Facility";

export async function GET() {
  await connectDB();
  const facilities = await Facility.find().sort({ createdAt: -1 });
  return NextResponse.json(facilities);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newFacility = await Facility.create(data);
  return NextResponse.json(newFacility);
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topper from "@/models/Topper";

export async function GET() {
  await connectDB();
  const toppers = await Topper.find().sort({ category: 1, rank: 1, class: 1 }).lean();
  return NextResponse.json(toppers);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const topper = await Topper.create(data);
  return NextResponse.json(topper, { status: 201 });
}

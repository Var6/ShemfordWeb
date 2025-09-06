import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export async function GET() {
  await connectDB();
  const announcements = await Announcement.find();
  return NextResponse.json(announcements);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const announcement = await Announcement.create(body);
  return NextResponse.json(announcement);
}

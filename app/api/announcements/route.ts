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
  const { title, date, description, priority, category, files } = await req.json();

  const announcement = await Announcement.create({
    title,
    date,
    description,
    priority,
    category,
    files, // [{ url, name }]
  });

  return NextResponse.json(announcement);
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

export async function GET() {
  await connectDB();
  const faculties = await Faculty.find();
  return NextResponse.json(faculties);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, subject, achievements, experience, joinedDate, bio, message, profileUrl } = await req.json();

  const faculty = await Faculty.create({
    name,
    subject,
    achievements,
    experience,
    joinedDate,
    bio,
    message,
    profileUrl,
  });

  return NextResponse.json(faculty);
}

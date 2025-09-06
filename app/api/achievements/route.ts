import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

// GET all achievements
export async function GET() {
  await connectDB();
  const achievements = await Achievement.find().sort({ createdAt: -1 });
  return NextResponse.json(achievements);
}

// POST new achievement
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newAchievement = await Achievement.create(data);
  return NextResponse.json(newAchievement);
}

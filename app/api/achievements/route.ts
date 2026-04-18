import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

// GET all achievements
export async function GET() {
  await connectDB();
  const achievements = await Achievement.find().sort({ createdAt: -1 }).lean();
  // ensure images is always an array (old docs may not have the field)
  const normalised = achievements.map((a: any) => ({
    ...a,
    images: Array.isArray(a.images) ? a.images : [],
  }));
  return NextResponse.json(normalised);
}

// POST new achievement
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newAchievement = await Achievement.create(data);
  return NextResponse.json(newAchievement);
}

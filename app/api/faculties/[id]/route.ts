import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

// PUT: Update a faculty by ID
export async function PUT(req: Request) {
  await connectDB();

  try {
    // Extract ID from URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const id = segments[segments.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
    }

    const { name, subject, achievements, experience, joinedDate, bio, message, profileUrl } = await req.json();

    const updated = await Faculty.findByIdAndUpdate(
      id,
      { name, subject, achievements, experience, joinedDate, bio, message, profileUrl },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

// DELETE: Delete a faculty by ID
export async function DELETE(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const id = segments[segments.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
    }

    const deleted = await Faculty.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

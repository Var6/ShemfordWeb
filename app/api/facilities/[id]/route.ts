import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Facility from "@/models/Facility";

// PUT: Update a facility by ID
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

    const data = await req.json();

    const updatedFacility = await Facility.findByIdAndUpdate(id, data, { new: true });

    if (!updatedFacility) {
      return NextResponse.json({ error: "Facility not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFacility);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

// DELETE: Delete a facility by ID
export async function DELETE(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const id = segments[segments.length - 1];

    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
    }

    const deletedFacility = await Facility.findByIdAndDelete(id);

    if (!deletedFacility) {
      return NextResponse.json({ error: "Facility not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Facility deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

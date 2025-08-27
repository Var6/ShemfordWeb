import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const data = await req.formData();
  const files = data.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      file.arrayBuffer().then((bytes) => {
        const buffer = Buffer.from(bytes);
        cloudinary.uploader
          .upload_stream({ folder: "uploads" }, (error, result) => {
            if (error) reject(error);
            else resolve({ url: result?.secure_url, name: file.name });
          })
          .end(buffer);
      });
    });
  });

  const uploads = await Promise.all(uploadPromises);
  return NextResponse.json(uploads.length === 1 ? uploads[0] : uploads);
}

import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(">>> DEBUG: POST /api/events hit at " + new Date().toISOString());
  try {
    await connectDB();
    const formData = await request.formData();
    let event: any;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      console.error("Invalid JSON data - event data", error);
      return NextResponse.json(
        {
          message: "Invalid JSON data - Event data",
          error:
            error instanceof Error ? error.message : "Internal Server Error",
        },
        { status: 500 },
      );
    }

    const file = formData.get("image") as File;

    if (!file) {
      console.error("Image file is required");
      return NextResponse.json(
        {
          message: "Image file is required",
        },
        { status: 500 },
      );
    }

    let tags = JSON.parse(formData.get("tags") as string);
    tags = tags.map((tag: string) => tag.trim().toLowerCase());
    event.tags = tags;

    let agenda = JSON.parse(formData.get("agenda") as string);
    agenda = agenda.map((item: string) => item.trim().toLowerCase());
    event.agenda = agenda;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvents",
          },
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          },
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Event creation failed", error);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Events retrieved successfully",
        events: events,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Event retrieval failed", error);
    return NextResponse.json(
      {
        message: "Event retrieval failed",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
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
        { status: 500 }
      );
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event creation failed", error);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

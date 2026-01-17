import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/events/[slug]
 * Fetches event details by slug.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const sanitizedSlug = slug.trim().toLowerCase();

    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event retrieved successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch event failed", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 }
    );
  }
}

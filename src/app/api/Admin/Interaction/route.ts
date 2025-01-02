import { connect } from "@/dbconfig/dbconfig";
import Interaction, { IInteraction } from "@/models/Interaction";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

// Ensure the database is connected
connect();

// GET request handler: Fetch interactions for a specific lead
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing leadId parameter" },
        { status: 400 }
      );
    }

    const interactions: IInteraction[] = await Interaction.find({
      leadId,
    }).sort({ date: -1 });
    return NextResponse.json(interactions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interactions", details: error },
      { status: 500 }
    );
  }
}

// POST request handler: Add a new interaction
export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { leadId, interactionType, details, date } = requestData;

    if (!leadId || !interactionType) {
      return NextResponse.json(
        { error: "Missing required fields: leadId, interactionType" },
        { status: 400 }
      );
    }

    const interaction = await Interaction.create({
      leadId,
      interactionType,
      details,
      date,
    });

    // Update last call date if interaction is a call
    if (interactionType === "Call") {
      await Lead.findByIdAndUpdate(leadId, { lastCallDate: date });
    }

    return NextResponse.json(interaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create interaction", details: error },
      { status: 500 }
    );
  }
}

import { connect } from "@/dbconfig/dbconfig";
import Lead, { ILead } from "@/models/Lead";
import { NextResponse } from "next/server";

// Ensure the database is connected
connect();

// GET request handler: Fetch performance metrics for all leads
export async function GET(request: Request) {
  try {
    const leads: ILead[] = await Lead.find({}, "name performanceMetrics");
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch performance metrics", details: error },
      { status: 500 }
    );
  }
}

// PATCH request handler: Update performance metrics for a lead
export async function PATCH(request: Request) {
  try {
    const { leadId, performanceMetrics } = await request.json();

    if (!leadId || !performanceMetrics) {
      return NextResponse.json(
        { error: "Missing required fields: leadId or performanceMetrics" },
        { status: 400 }
      );
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { performanceMetrics },
      { new: true }
    );

    if (!updatedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update performance metrics", details: error },
      { status: 500 }
    );
  }
}

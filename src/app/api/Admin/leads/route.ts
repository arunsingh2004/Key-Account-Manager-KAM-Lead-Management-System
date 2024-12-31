import { connect } from "@/dbconfig/dbconfig";
import Lead, { ILead } from "@/models/Lead";
import { NextResponse } from "next/server";

// Ensure the database is connected
connect();

// GET request handler
export async function GET() {
  try {
    const leads: ILead[] = await Lead.find({});
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leads", details: error },
      { status: 500 }
    );
  }
}

// POST request handler
export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    const newLead = await Lead.create(requestData);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead", details: error },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Contact from "@/models/Contact";

connect();
export async function GET() {
  try {
    const contacts = await Contact.find();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
// POST: Add a new contact
export async function POST(request: Request) {
  try {
    const { leadId, name, role, contactInfo } = await request.json();

    // Validate input
    if (!leadId || !name || !role || !contactInfo) {
      console.error("Validation failed: Missing fields");
      return NextResponse.json(
        { error: "All fields are required, including leadId" },
        { status: 400 }
      );
    }

    // Create the contact
    const newContact = await Contact.create({
      leadId,
      name,
      role,
      contactInfo,
    });
    console.log("Contact created:", newContact);
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/Admin/contacts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

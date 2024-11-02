import { NextResponse } from "next/server";
import { Child } from "../../../types/child";

// Mock data for a single child
const childData: Child = {
  parentId: 1,
  firstName: "John",
  lastname: "Doe",
  phoneNumber: "123-456-7890",
  goals: [],
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Child ID is required" },
        { status: 400 }
      );
    }

    // In a real-world scenario, you would fetch this data from a database based on the ID
    // For this example, we're always returning the same child data regardless of the ID
    return NextResponse.json(childData);
  } catch (error) {
    console.error("Error fetching child data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { db } from "@/lib/firebase/config";
import { NextResponse } from "next/server";
import { collection, getDocs, query, updateDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      steps,
      calories_burned,
      distance_km,
      active_minutes,
      sleep_hours,
      heart_rate_avg,
      date,
    } = body;

    // Validate required fields
    if (
      !steps ||
      !calories_burned ||
      !distance_km ||
      !active_minutes ||
      !sleep_hours ||
      !heart_rate_avg ||
      !date
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the first parent document
    const parentQuery = query(collection(db, "parents"));
    const parentSnapshot = await getDocs(parentQuery);
    if (parentSnapshot.empty) {
      return NextResponse.json(
        { message: "No parent documents found" },
        { status: 404 }
      );
    }

    const parentDoc = parentSnapshot.docs[0];
    const parentData = parentDoc.data();
    const children = parentData.children;

    if (!children || children.length === 0) {
      return NextResponse.json(
        { message: "No children found for the parent" },
        { status: 404 }
      );
    }

    // Retrieve the current dailyStats array for the first child
    const dailyStats = children[0].dailyStats || [];

    // Append the new data to the dailyStats array
    dailyStats.push({
      stepsTaken: steps,
      caloriesBurned: calories_burned,
      distance_km,
      active_minutes,
      hoursSlept: sleep_hours,
      heart_rate_avg,
      date,
    });

    // Update the children array with the modified dailyStats
    children[0].dailyStats = dailyStats;

    // Update the parent document with the modified children array
    await updateDoc(parentDoc.ref, { children });

    return NextResponse.json({ message: "Data added successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding data", error: error.message },
      { status: 500 }
    );
  }
}

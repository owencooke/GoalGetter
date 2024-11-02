// app/api/kids/route.ts
import { db } from "@/lib/firebase/config";
import { Child } from "../../../types/child";
import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "kids"));
    const children: Child[] = snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
        } as Child)
    );
    return NextResponse.json(children);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch children", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newKid: Child = await request.json();
    const docRef = await addDoc(collection(db, "kids"), {
      ...newKid,
    });
    return NextResponse.json({ id: docRef.id, ...newKid });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to add kid", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updatedKidData }: Child & { id: string } =
      await request.json();

    const docRef = doc(db, "kids", id);

    await updateDoc(docRef, {
      ...updatedKidData,
    });

    return NextResponse.json({ id, ...updatedKidData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update child", message: error.message },
      { status: 500 }
    );
  }
}

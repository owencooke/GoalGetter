// app/api/parents/route.ts
import { db } from "@/lib/firebase/config";
import { Parent } from "../../../types/parent";
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
    const snapshot = await getDocs(collection(db, "parents"));
    const parents: Parent[] = snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
        } as Parent)
    );
    return NextResponse.json(parents);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch parents", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newParent: Parent = await request.json();
    const docRef = await addDoc(collection(db, "parents"), {
      ...newParent,
    });
    return NextResponse.json({ id: docRef.id, ...newParent });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to add parent", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updatedParentData }: Parent & { id: string } =
      await request.json();

    const docRef = doc(db, "parents", id);

    await updateDoc(docRef, {
      ...updatedParentData,
    });

    return NextResponse.json({ id, ...updatedParentData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update parent", message: error.message },
      { status: 500 }
    );
  }
}

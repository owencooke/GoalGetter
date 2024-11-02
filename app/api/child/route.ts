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

// Mock data for a single child
const childData: Child = {
    parentId: 1,
    firstName: "John",
    lastname: "Doe",
    phoneNumber: "123-456-7890",
    lat: 37.7749,
    long: -122.4194,
    dailyStats: [],
};

export async function GET() {
    try {
        const snapshot = await getDocs(collection(db, "child"));
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
        const newChild: Child = await request.json();
        const docRef = await addDoc(collection(db, "child"), {
            ...newChild,
        });
        return NextResponse.json({ id: docRef.id, ...newChild });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to add child", message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...updatedChildData }: Child & { id: string } =
            await request.json();

        const docRef = doc(db, "child", id);

        await updateDoc(docRef, {
            ...updatedChildData,
        });

        return NextResponse.json({ id, ...updatedChildData });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to update child", message: error.message },
            { status: 500 }
        );
    }
}

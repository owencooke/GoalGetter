// app/api/pets/route.ts
import { db } from "@/lib/firebase/config";
import { Pet } from "@/app/types/pet";
import { NextResponse } from "next/server";
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    addDoc,
} from "firebase/firestore";

export async function GET() {
    try {
        const snapshot = await getDocs(collection(db, "pets"));
        const pets: Pet[] = snapshot.docs.map(
            (doc) => ({ ...doc.data() } as Pet)
        );
        return NextResponse.json(pets);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to kids data", message: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const newPet: Pet = await request.json();
        const docRef = await addDoc(collection(db, "pets"), newPet);
        return NextResponse.json({ id: docRef.id, ...newPet });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to add goal", message: error.message },
            { status: 500 }
        );
    }
}

// export async function DELETE(request: Request) {
//   try {
//     const { id } = request.query;
//     const docRef = doc(db, "pets", id as string);
//     await deleteDoc(docRef);
//     return NextResponse.json({ message: "Pet deleted successfully" });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Failed to delete pet", message: error.message },
//       { status: 500 }
//     );
//   }
// }

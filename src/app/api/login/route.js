import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import app from "../../../database/firebaseConfig";
import { collection, doc, getFirestore, getDoc } from "firebase/firestore";

const db = getFirestore(app);
const userCollection = collection(db, "buildFast-users");

export async function POST(request, response) {
  const { email, password } = await request.json();
  const userDocRef = doc(userCollection, email);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    console.log(userData);
    try {
      const isPasswordValid = await bcrypt.compare(password, userData.password);

      if (isPasswordValid) {
        return NextResponse.json({ user: userData });
      } else {
        return NextResponse.json({ error: "Wrong Password" }, { status: 400 });
      }
    } catch (err) {
      return NextResponse.json({ error: "Error in login" }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }
}

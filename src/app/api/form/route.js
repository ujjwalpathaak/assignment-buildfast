import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import app from "../../../database/firebaseConfig";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const saltRounds = 10;

const emailSchema = z.string().email("Invalid email format");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

export async function POST(request, response) {
  const { email, password } = await request.json();
  const db = getFirestore(app);
  const userCollection = collection(db, "buildFast-users");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Fill all the blanks!" },
      { status: 400 }
    );
  }

  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);

    const hashedPassword = await hashPassword(password);

    await setDoc(doc(userCollection, email), {
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      email: email,
      password: hashedPassword,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

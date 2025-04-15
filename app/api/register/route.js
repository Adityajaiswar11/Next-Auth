
import { connectDb } from "@/app/lib/DBconnect";
import { User } from "@/app/Models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();

    const { email, password, ...rest } = await req.json();

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const saveUser = new User({
      email,
      password: hashPassword,
      ...rest
    });

    await saveUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error", error: e.message },
      { status: 500 }
    );
  }
}

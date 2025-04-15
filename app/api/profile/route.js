import { connectDb } from "@/app/lib/DBconnect";
import { User } from "@/app/Models/UserModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    const users = await User.find().select("-password").lean();

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found", status: 200 });
    }
    return NextResponse.json({ profile:users, message: "Success", status: 200 });

  } catch (e) {
    return NextResponse.json({
      message: "Internal server error",
      error: e.message,
      status: 500
    });
  }
}

import mongoose from "mongoose";

export const connectDb = async () => {
  try {
     mongoose.connect("mongodb://localhost:27017/NextAuth")
    console.log("DB connected");
  } catch (e) {
    console.error("DB not connected:", e);
  }
};

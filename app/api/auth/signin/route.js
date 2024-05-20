import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return Response.json({ success: false, message: "User not found" });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return Response.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc;

    cookies().set("access_token",token)

    return Response.json(rest);
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to Signin",
      error:error.message,
    },{status:400});
  }
}

import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await connectDB();

  const { username, email, password } = await request.json();

  try {
    const user = await User.findOne({ email });

    if (user) {
      return Response.json({ success: false, message: "User already exist" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    return Response.json({
      success: true,
      message: "User created Successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
      error:error.message,
    },{status:400});
  }
}

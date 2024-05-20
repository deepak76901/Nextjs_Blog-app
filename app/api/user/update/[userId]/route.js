import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";

export async function PUT(request, { params }) {
  await connectDB();

  const changedUser = await request.json();
  const userId = params.userId
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      changedUser,
      { new: true }
    );
    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({
      success: false,
      message: "user updation failed",
      error:error.message,
    },{status:400});
  }
}

import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";

export async function DELETE(_request, { params }) {
  await connectDB();

  try {
    await User.findByIdAndDelete(params.userId);

    return Response.json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to delete User",
      error:error.message
    },{status:400});
  }
}

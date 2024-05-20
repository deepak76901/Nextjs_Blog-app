import { connectDB } from "@/db/connectDB";
import Post from "@/models/post.model";

export async function DELETE(request, { params }) {
  await connectDB();
  const { postId, userId } = params;

  try {
    await Post.findByIdAndDelete(postId);
    return Response.json({
      success: true,
      message: "Post deleted Successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    },{status:400});
  }
}

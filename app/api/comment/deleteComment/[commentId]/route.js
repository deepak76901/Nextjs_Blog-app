import { connectDB } from "@/db/connectDB";
import Comment from "@/models/comment.model";

export async function DELETE(_request, { params }) {
  await connectDB();

  try {
    await Comment.findByIdAndDelete(params.commentId);
    return Response.json({
      success: true,
      message: "Comment deleted Sucessfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch Comments",
      error: error.message,
    },{status:400});
  }
}

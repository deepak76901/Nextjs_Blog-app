import { connectDB } from "@/db/connectDB";
import Post from "@/models/post.model";

export async function PUT(request, { params }) {
  await connectDB();

  const { postId, userId } = params;
  const changedPost = await request.json();
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, changedPost, {
      new: true,
    });

    return Response.json(updatedPost);
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    },{status:400});
  }
}

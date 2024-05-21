import { connectDB } from "@/db/connectDB";
import Post from "@/models/post.model";

export async function POST(request, { params }) {
  await connectDB();
  const newPost = await request.json();

  const slug = newPost.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  try {
    const post = new Post({ ...newPost, slug, userId: params.userId });
    const result = await post.save();

    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

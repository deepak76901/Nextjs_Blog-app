import { connectDB } from "@/db/connectDB";
import Post from "@/models/post.model";

export async function POST(request) {
  await connectDB();
  const newPost = await request.json();
  try {
    const post = new Post(newPost);
    await post.save();

    return Response.json(post);
  } catch (error) {
    return Response.json({ success: false, error:error.message },{status:400});
  }
}

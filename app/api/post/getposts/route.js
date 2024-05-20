import { connectDB } from "@/db/connectDB";
import Post from "@/models/post.model";

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);

  let limit = parseInt(searchParams.get("limit") || 9);
  let startIndex = parseInt(searchParams.get("startIndex") || 0);
  let sortDirection = searchParams.get("sort") === "asc" ? 1 : -1;

  let slug = searchParams.get("slug");
  let postId = searchParams.get("postId");
  let searchTerm = searchParams.get("searchTerm");
  let category = searchParams.get("category");

  let query = Post.find({});

  if (slug) {
    query = query.find({ slug });
  }
  if (postId) {
    query = query.find({ _id: postId });
  }

  if (searchTerm) {
    let searchTerms = searchTerm.split(/[,; ]+/);
    query = query.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
      ],
    });
    console.log(searchTerms);
  }
  if (category) {
    query = query.find({ category });
  }
  query = query
    .limit(limit)
    .skip(startIndex)
    .sort({ updatedAt: sortDirection });

  try {
    const posts = await query.exec();
    const totalPosts = posts.length;

    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    return Response.json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

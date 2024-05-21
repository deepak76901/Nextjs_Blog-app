import { connectDB } from "@/db/connectDB";
import Comment from "@/models/comment.model";
import { headers } from "next/headers";

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  let limit = searchParams.get("limit");
  try {
    const comments = await Comment.find({}).limit(limit);
    const totalComments = comments.length;

    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    return Response.json({comments,totalComments,lastMonthComments})
  } catch (error) {
    return Response.json({
        success:false,
        message:"Failed to fetch Comments",
        error:error.message
    },{status:400})
  }
}

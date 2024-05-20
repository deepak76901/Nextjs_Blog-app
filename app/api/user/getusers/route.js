import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  let limit = searchParams.get("limit");
  try {
    const users = await User.find({}).limit(limit);
    const totalUsers = users.length;

    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    return Response.json({ users, totalUsers, lastMonthUsers });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch Users",
      error:error.message,
    },{status:400});
  }
}

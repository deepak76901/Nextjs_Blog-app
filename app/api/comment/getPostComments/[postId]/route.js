import { connectDB } from "@/db/connectDB";
import Comment from "@/models/comment.model";

export async function GET(request,{params}){
    await connectDB();

    try {
      const postComments = await Comment.find({postId : params.postId})

      return Response.json(postComments)
    } catch (error) {
        return Response.json({
            success:false,
            message:"Failed to fetch Comments",
            error:error.message
        },{status:400})
    }
}
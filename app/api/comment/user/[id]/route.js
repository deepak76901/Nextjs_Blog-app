import { connectDB } from "@/db/connectDB";
import Comment from "@/models/comment.model";

export async function GET(request,{params}){
    await connectDB();

    try {
      const commentData =  await Comment.findById({_id:params.id})
      console.log(commentData)

      return Response.json(commentData.userId)
    } catch (error) {
        return Response.json({
            success:false,
            message:"Failed to fetch Comments",
            error:error.message
        },{status:400})
    }
}
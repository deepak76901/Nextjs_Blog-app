import { connectDB } from "@/db/connectDB";
import Comment from "@/models/comment.model";

export async function POST(request){
    await connectDB();

    const data = await request.json()
    
    try {
      const newComment = new Comment(data);
      await newComment.save()

      return Response.json(newComment)
    } catch (error) {
        return Response.json({
            success:false,
            message:"Failed to create Comments",
            error:error.message
        },{status:400})
    }
   
}
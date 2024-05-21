import { connectDB } from "@/db/connectDB";
import Comment from "@/models/comment.model";

export async function PUT(request,{params}){
    await connectDB();

    try {
        Comment.findByIdAndUpdate(params.id,)
    } catch (error) {
        
    }
}
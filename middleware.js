import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function middleware(request) {
  const token = cookies().get("access_token");

  if (!token) {
    return Response.json(
      { success: false, message: "Token not found" },
      { status: 404 }
    );
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }
       

    });
  }
  console.log("Middleware called")
  // return NextResponse.redirect("/sign-in")
   

}

export const config = {
  matcher: "/dashboard",
};

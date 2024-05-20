import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return redirect("/sign-in");
  }

  return children
}

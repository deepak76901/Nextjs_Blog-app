import CreatePost from "@/components/pages/CreatePost";
import PrivateRoute from "@/components/PrivateRoute";

export default function page() {
  return (
    <PrivateRoute>
      <CreatePost />
    </PrivateRoute>
  );
}

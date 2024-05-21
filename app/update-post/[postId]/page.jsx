import UpdatePost from '@/components/pages/UpdatePost'
import PrivateRoute from '@/components/PrivateRoute'

export default function page() {
  return (
      <PrivateRoute>
        <UpdatePost/>
      </PrivateRoute>
  )
}

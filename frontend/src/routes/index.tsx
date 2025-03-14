import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../contexts/auth'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { user } = useAuth()
  return (
    <div>
      <h3>Welcome Home {user?.name ? user.name : "stranger" }!</h3>
    </div>
  )
}
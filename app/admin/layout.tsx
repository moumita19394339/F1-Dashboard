import { AppLayout } from '@/components/layout'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  )
}

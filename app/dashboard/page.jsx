import DashboardPage from '@/components/pages/DashboardPage'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense>
      <DashboardPage/>
    </Suspense>
  )
}

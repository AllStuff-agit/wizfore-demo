import { ReactNode } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <AdminSidebar />
        
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1 ml-64">
          {/* 헤더 */}
          <AdminHeader />
          
          {/* 페이지 콘텐츠 */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
'use client'

import { Bell, Search, Settings, User } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 페이지 제목 영역 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600">위즈포레 관리자 시스템에 오신 것을 환영합니다</p>
        </div>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center space-x-4">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색..."
              className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 알림 */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
            <Bell className="w-5 h-5" />
            {/* 알림 배지 */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* 설정 */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>

          {/* 프로필 */}
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">관리자</span>
          </button>
        </div>
      </div>
    </header>
  )
}
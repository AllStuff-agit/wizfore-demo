'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const navigation = [
    { 
      name: '센터소개', 
      href: '/about',
      submenu: [
        { name: '센터 개요', href: '/about' },
        { name: '센터장 소개', href: '/about/director' },
        { name: '센터 발자취', href: '/about/history' },
        { name: '자문위원', href: '/about/advisors' },
        { name: '오시는길', href: '/about/location' },
      ]
    },
    { 
      name: '프로그램', 
      href: '/programs',
      submenu: [
        { name: '치료 프로그램', href: '/programs/individual' },
        { name: '상담 프로그램', href: '/programs/assessment' },
        { name: '방과후 프로그램', href: '/programs/afterschool' },
        { name: '성인 주간활동 프로그램', href: '/programs/adult-day' },
      ]
    },
    { 
      name: '전문가 소개', 
      href: '/team',
      submenu: [
        { name: '치료·상담사', href: '/team/therapists' },
        { name: '주간·방과후 교사', href: '/team/teachers' },
      ]
    },
    { 
      name: '커뮤니티', 
      href: '/community',
      submenu: [
        { name: '센터 소식', href: '/community/news' },
        { name: '공지사항', href: '/community/notices' },
        { name: '협력 기관', href: '/community/partners' },
      ]
    },
    { 
      name: '문의', 
      href: '/contact',
      submenu: [
        { name: '상담 예약', href: '/contact/reservation' },
        { name: '온라인 문의', href: '/contact/inquiry' },
        { name: '연락처 정보', href: '/contact' },
      ]
    },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 로고 - 마인드스토리 스타일 */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {/* 로고 이미지들 - 마인드스토리처럼 여러 개 */}
              <div className="w-10 h-10 bg-mindstory-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div className="w-10 h-10 bg-mindstory-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div className="w-10 h-10 bg-mindstory-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="w-10 h-10 bg-mindstory-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold text-mindstory-gray-text">위즈포레</div>
              <div className="text-xs text-gray-600">사회서비스센터</div>
            </div>
          </Link>

          {/* 오른쪽 SNS 아이콘들 - 마인드스토리 스타일 */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#" 
              className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center hover:bg-yellow-500 transition-colors"
              aria-label="카카오톡"
            >
              <MessageCircle size={16} className="text-white" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 bg-mindstory-green rounded flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="네이버 블로그"
            >
              <span className="text-white font-bold text-xs">N</span>
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 토글"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav 
          className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t md:border-t-0 border-gray-200 transition-all duration-300`}
          onMouseEnter={() => setIsNavExpanded(true)}
          onMouseLeave={() => setIsNavExpanded(false)}
        >
          {/* 메인 네비게이션 */}
          <ul className="flex flex-col md:flex-row md:justify-center py-4 md:py-0 space-y-2 md:space-y-0 md:space-x-8">
            {navigation.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="block px-4 py-2 md:px-0 md:py-4 text-mindstory-gray-text hover:text-mindstory-lime font-medium transition-colors border-b-2 border-transparent hover:border-mindstory-lime"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* 전체 서브메뉴 드롭다운 */}
          <div 
            className={`md:block hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
              isNavExpanded 
                ? 'max-h-64 opacity-100 py-6' 
                : 'max-h-0 opacity-0 py-0'
            }`}
          >
            <div className="container-custom mx-auto px-4">
              <div className="grid grid-cols-5 gap-8">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-3">
                    <h3 className="font-semibold text-mindstory-gray-text text-sm border-b border-mindstory-lime pb-2">
                      {item.name}
                    </h3>
                    {item.submenu && (
                      <ul className="space-y-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="text-sm text-gray-600 hover:text-mindstory-lime transition-colors block py-1"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setIsNavExpanded(false)
                              }}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모바일용 서브메뉴 */}
          <div className="md:hidden">
            {isMenuOpen && navigation.map((item) => (
              <div key={`mobile-${item.name}`} className="border-t border-gray-100 py-3">
                <div className="px-4">
                  <h3 className="font-semibold text-mindstory-gray-text text-sm mb-2">
                    {item.name}
                  </h3>
                  {item.submenu && (
                    <ul className="space-y-1 pl-4">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className="text-sm text-gray-600 hover:text-mindstory-lime transition-colors block py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

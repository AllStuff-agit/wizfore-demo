'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: '센터소개', href: '/about' },
    { name: '심리상담', href: '/consulting' },
    { name: '치료프로그램', href: '/programs' },
    { name: '검사 프로그램', href: '/assessment' },
    { name: '예약/상담후기', href: '/community' },
    { name: '커뮤니티', href: '/community/notice' },
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
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t md:border-t-0 border-gray-200`}>
          <ul className="flex flex-col md:flex-row md:justify-center py-4 md:py-0 space-y-2 md:space-y-0 md:space-x-8">
            {navigation.map((item) => (
              <li key={item.name}>
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
        </nav>
      </div>
    </header>
  )
}

export default Header

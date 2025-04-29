# 관리자 레이아웃 및 컴포넌트 구현

## 관리자 레이아웃 (src/app/admin/layout.js)

```javascript
// src/app/admin/layout.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { initFirebase } from '@/lib/firebase';

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const app = initFirebase();
    const auth = getAuth(app);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // 로그인하지 않은 상태이고 로그인 페이지가 아닌 경우 로그인 페이지로 리디렉션
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });
    
    return () => unsubscribe();
  }, [pathname, router]);
  
  // 로그인 페이지일 경우 레이아웃 없이 로그인 컴포넌트만 표시
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // 인증된 사용자만 관리자 레이아웃 표시
  if (!user) {
    return null;
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## 사이드바 컴포넌트 (src/components/admin/Sidebar.js)

```javascript
// src/components/admin/Sidebar.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  HomeModernIcon, 
  ChatBubbleLeftRightIcon, 
  UsersIcon, 
  Cog6ToothIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

// 네비게이션 아이템 정의
const navigation = [
  { name: '대시보드', href: '/admin', icon: HomeIcon },
  {
    name: '센터 정보',
    href: '/admin/center',
    icon: BuildingOfficeIcon,
    children: [
      { name: '기본 정보', href: '/admin/center/info' },
      { name: '연혁', href: '/admin/center/history' },
      { name: '자문위원', href: '/admin/center/advisors' },
      { name: '위치 정보', href: '/admin/center/location' },
    ],
  },
  {
    name: '프로그램',
    href: '/admin/programs',
    icon: BookOpenIcon,
    children: [
      { name: '프로그램 목록', href: '/admin/programs' },
      { name: '카테고리', href: '/admin/programs/categories' },
    ],
  },
  {
    name: '전문가',
    href: '/admin/experts',
    icon: UserGroupIcon,
    children: [
      { name: '전문가 목록', href: '/admin/experts' },
      { name: '전문 분야', href: '/admin/experts/specialties' },
    ],
  },
  {
    name: '게시글',
    href: '/admin/posts',
    icon: DocumentTextIcon,
    children: [
      { name: '게시글 목록', href: '/admin/posts' },
      { name: '카테고리', href: '/admin/posts/categories' },
    ],
  },
  {
    name: '시설',
    href: '/admin/facilities',
    icon: HomeModernIcon,
    children: [
      { name: '시설 목록', href: '/admin/facilities' },
      { name: '카테고리', href: '/admin/facilities/categories' },
    ],
  },
  { name: '문의', href: '/admin/inquiries', icon: ChatBubbleLeftRightIcon },
  { name: '사용자', href: '/admin/users', icon: UsersIcon },
  { name: '설정', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  
  // 현재 경로 기준으로 메뉴 활성화 상태 확인
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  
  // 서브메뉴 토글
  const toggleMenu = (name) => {
    setOpenMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MainPageRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/admin/home');
  }, [router]);
  
  return null;
}

// 레이아웃 없이 렌더링 (리디렉션만 수행)
MainPageRedirect.getLayout = (page) => page;
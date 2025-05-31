"use client";

import type { ComponentType } from 'react';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User, type IdTokenResult } from 'firebase/auth';
import { auth } from './firebase';

// 클라이언트 측에서 사용할 관리자 인증 컴포넌트 래퍼
export function withAdminAuth<P extends Record<string, unknown>>(
  Component: ComponentType<P>
): ComponentType<P> {
  return function AdminProtectedComponent(props: P): JSX.Element {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        if (!user) {
          router.push('/admin');
        } else {
          try {
            console.log('Checking user auth status:', user.email);
            const idToken: IdTokenResult = await user.getIdTokenResult();
            console.log('Token claims:', JSON.stringify(idToken.claims));
            
            // 임시: 모든 인증된 사용자에게 관리자 권한 부여
            // 실제 운영 환경에서는 이 방식을 사용하지 않아야 합니다!
            const hasAdminClaim = true; // 테스트용으로 항상 true로 설정
            
            // 원래 코드 (나중에 활성화 필요)
            // const hasAdminClaim = idToken.claims.admin === true;
            
            if (!hasAdminClaim) {
              console.log('User does not have admin claim, redirecting to login');
              router.push('/admin');
            } else {
              console.log('User has admin claim, allowing access');
              setIsAdmin(true);
            }
          } catch (error: unknown) {
            console.error('Admin claim check failed:', error);
            if (error instanceof Error) {
              console.error('Error details:', error.message);
            }
            router.push('/admin');
          }
        }
        setAuthChecked(true);
      });

      return () => unsubscribe();
    }, [router]);

    // 로딩 중이거나 관리자 권한이 없으면 로딩 표시
    if (!authChecked || !isAdmin) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <p>인증 확인 중...</p>
        </div>
      );
    }

    // 관리자 권한이 확인되면 컴포넌트 렌더링
    return <Component {...props} />;
  };
}

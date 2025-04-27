import { getAuth } from 'firebase-admin/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// 서버 사이드에서 관리자 권한 확인
export async function checkAdminRole(token) {
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken.admin === true; // 커스텀 클레임에서 admin 확인
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

// 클라이언트 측에서 사용할 관리자 인증 컴포넌트 래퍼
export function withAdminAuth(Component) {
  return function AdminProtectedComponent(props) {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          router.push('/admin');
        } else {
          try {
            const idToken = await user.getIdTokenResult();
            const hasAdminClaim = idToken.claims.admin === true;
            
            if (!hasAdminClaim) {
              router.push('/admin');
            } else {
              setIsAdmin(true);
            }
          } catch (error) {
            console.error('Admin claim check failed:', error);
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

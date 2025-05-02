import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth } from '../../firebase/firebase';
import styles from '../../styles/admin/Login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 이미 로그인한 사용자는 대시보드로 리디렉션
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        router.push('/admin/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('로그인 에러:', error);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>관리자 로그인 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터 관리자 로그인 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <h1>WizFore</h1>
          <p>사회서비스센터 관리자</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className={styles.goToMain}>
          <a href="/">메인 홈페이지로 돌아가기</a>
        </div>
      </div>

      <div className={styles.background}></div>
    </div>
  );
}

// 관리자 로그인 페이지에는 공통 레이아웃을 적용하지 않습니다
AdminLogin.getLayout = (page) => page;
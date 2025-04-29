import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/AdminPosts.module.css';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('전체');
  const router = useRouter();

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(db, '게시글'), orderBy('게시일', 'desc'));
        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPosts(postsList);
        setLoading(false);
      } catch (error) {
        console.error('게시글 데이터 가져오기 오류:', error);
        setError('게시글 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 카테고리 필터링 함수
  const filteredPosts = activeCategory === '전체'
    ? posts
    : posts.filter(post => post.카테고리 === activeCategory);

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, '게시글', id));
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const postRef = doc(db, '게시글', id);
      await updateDoc(postRef, {
        게시상태: !currentStatus
      });

      // 상태 업데이트
      setPosts(
        posts.map(post => 
          post.id === id 
            ? {...post, 게시상태: !currentStatus} 
            : post
        )
      );
    } catch (error) {
      console.error('게시글 상태 변경 오류:', error);
      alert('게시글 상태 변경 중 오류가 발생했습니다.');
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('ko-KR');
    } catch (error) {
      console.error('날짜 변환 오류:', error);
      return '-';
    }
  };

  // 내용 요약 함수 (30자로 제한)
  const summarizeContent = (content) => {
    if (!content) return '';
    if (content.length <= 30) return content;
    return content.substring(0, 30) + '...';
  };

  if (loading) {
    return (
      <AdminLayout title="게시글 관리 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="게시글 관리 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>게시글 관리</h1>
        <button 
          className={styles.addButton} 
          onClick={() => router.push('/admin/posts/add')}
        >
          <i className="fas fa-plus"></i> 새 게시글 작성
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.categoryTabs}>
        <button 
          className={`${styles.categoryTab} ${activeCategory === '전체' ? styles.active : ''}`}
          onClick={() => setActiveCategory('전체')}
        >
          전체
        </button>
        <button 
          className={`${styles.categoryTab} ${activeCategory === '공지사항' ? styles.active : ''}`}
          onClick={() => setActiveCategory('공지사항')}
        >
          공지사항
        </button>
        <button 
          className={`${styles.categoryTab} ${activeCategory === '센터소식' ? styles.active : ''}`}
          onClick={() => setActiveCategory('센터소식')}
        >
          센터 소식
        </button>
        <button 
          className={`${styles.categoryTab} ${activeCategory === '행사안내' ? styles.active : ''}`}
          onClick={() => setActiveCategory('행사안내')}
        >
          행사 안내
        </button>
        <button 
          className={`${styles.categoryTab} ${activeCategory === 'SNS연동' ? styles.active : ''}`}
          onClick={() => setActiveCategory('SNS연동')}
        >
          SNS 연동
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>썸네일</th>
              <th>제목</th>
              <th>카테고리</th>
              <th>내용 미리보기</th>
              <th>게시일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    {post.썸네일URL ? (
                      <img 
                        src={post.썸네일URL} 
                        alt={post.제목} 
                        className={styles.thumbnailImage} 
                      />
                    ) : (
                      <div className={styles.noImage}>이미지 없음</div>
                    )}
                  </td>
                  <td className={styles.titleCell}>{post.제목}</td>
                  <td>{post.카테고리}</td>
                  <td className={styles.contentPreview}>{summarizeContent(post.내용)}</td>
                  <td>{formatDate(post.게시일)}</td>
                  <td>
                    <span 
                      className={`${styles.status} ${post.게시상태 ? styles.published : styles.draft}`}
                      onClick={() => handleToggleStatus(post.id, post.게시상태)}
                    >
                      {post.게시상태 ? '게시됨' : '임시저장'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button 
                      className={styles.editButton} 
                      onClick={() => router.push(`/admin/posts/edit/${post.id}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(post.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  {activeCategory === '전체' 
                    ? '등록된 게시글이 없습니다. 새 게시글을 작성해주세요.' 
                    : `'${activeCategory}' 카테고리에 등록된 게시글이 없습니다.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
Posts.getLayout = (page) => page;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin/experts/Index.module.css';

export default function Experts() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // 전문가 데이터 가져오기
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertsCollection = collection(db, '전문가');
        const expertsSnapshot = await getDocs(expertsCollection);
        const expertsList = expertsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // 표시 순서대로 정렬
        expertsList.sort((a, b) => (a.표시순서 || 0) - (b.표시순서 || 0));
        
        setExperts(expertsList);
        setLoading(false);
      } catch (error) {
        console.error('전문가 데이터 가져오기 오류:', error);
        setError('전문가 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 전문가 정보를 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, '전문가', id));
        setExperts(experts.filter(expert => expert.id !== id));
      } catch (error) {
        console.error('전문가 삭제 오류:', error);
        alert('전문가 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const expertRef = doc(db, '전문가', id);
      await updateDoc(expertRef, {
        대표전문가여부: !currentStatus
      });

      // 상태 업데이트
      setExperts(
        experts.map(expert => 
          expert.id === id 
            ? {...expert, 대표전문가여부: !currentStatus} 
            : expert
        )
      );
    } catch (error) {
      console.error('전문가 상태 변경 오류:', error);
      alert('전문가 상태 변경 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <AdminLayout title="전문가 관리 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="전문가 관리 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>전문가 관리</h1>
        <button 
          className={styles.addButton} 
          onClick={() => router.push('/admin/experts/add')}
        >
          <i className="fas fa-plus"></i> 새 전문가 추가
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.categoryTabs}>
        <button className={`${styles.categoryTab} ${styles.active}`}>전체</button>
        <button className={styles.categoryTab}>치료사</button>
        <button className={styles.categoryTab}>상담사</button>
        <button className={styles.categoryTab}>교사</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>순서</th>
              <th>사진</th>
              <th>이름</th>
              <th>직책</th>
              <th>전문 분야</th>
              <th>대표 표시</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {experts.length > 0 ? (
              experts.map((expert, index) => (
                <tr key={expert.id}>
                  <td>{expert.표시순서 || index + 1}</td>
                  <td>
                    {expert.프로필사진URL ? (
                      <img 
                        src={expert.프로필사진URL} 
                        alt={expert.이름} 
                        className={styles.thumbnailImage} 
                      />
                    ) : (
                      <div className={styles.noImage}>사진 없음</div>
                    )}
                  </td>
                  <td>{expert.이름}</td>
                  <td>{expert.직책}</td>
                  <td>
                    {expert.전문분야 ? (
                      <div className={styles.specialtyTags}>
                        {expert.전문분야.slice(0, 2).map((specialty, i) => (
                          <span key={i} className={styles.specialtyTag}>{specialty}</span>
                        ))}
                        {expert.전문분야.length > 2 && <span className={styles.moreTag}>+{expert.전문분야.length - 2}</span>}
                      </div>
                    ) : (
                      "미지정"
                    )}
                  </td>
                  <td>
                    <span 
                      className={`${styles.status} ${expert.대표전문가여부 ? styles.featured : styles.notFeatured}`}
                      onClick={() => handleToggleStatus(expert.id, expert.대표전문가여부)}
                    >
                      {expert.대표전문가여부 ? '대표 표시' : '일반'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button 
                      className={styles.editButton} 
                      onClick={() => router.push(`/admin/experts/edit/${expert.id}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(expert.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  등록된 전문가가 없습니다. 새로운 전문가를 추가해주세요.
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
Experts.getLayout = (page) => page;

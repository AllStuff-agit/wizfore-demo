import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin/facilities/Index.module.css';

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
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

  // 시설 데이터 가져오기
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const facilitiesCollection = collection(db, '시설');
        const facilitiesSnapshot = await getDocs(facilitiesCollection);
        const facilitiesList = facilitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // 표시 순서대로 정렬
        facilitiesList.sort((a, b) => (a.표시순서 || 0) - (b.표시순서 || 0));
        
        setFacilities(facilitiesList);
        setLoading(false);
      } catch (error) {
        console.error('시설 데이터 가져오기 오류:', error);
        setError('시설 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 시설 정보를 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, '시설', id));
        setFacilities(facilities.filter(facility => facility.id !== id));
      } catch (error) {
        console.error('시설 삭제 오류:', error);
        alert('시설 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const facilityRef = doc(db, '시설', id);
      await updateDoc(facilityRef, {
        활성화: !currentStatus
      });

      // 상태 업데이트
      setFacilities(
        facilities.map(facility => 
          facility.id === id 
            ? {...facility, 활성화: !currentStatus} 
            : facility
        )
      );
    } catch (error) {
      console.error('시설 상태 변경 오류:', error);
      alert('시설 상태 변경 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <AdminLayout title="시설 관리 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="시설 관리 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>시설 관리</h1>
        <button 
          className={styles.addButton} 
          onClick={() => router.push('/admin/facilities/add')}
        >
          <i className="fas fa-plus"></i> 새 시설 추가
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.categoryTabs}>
        <button className={`${styles.categoryTab} ${styles.active}`}>전체</button>
        <button className={styles.categoryTab}>치료실</button>
        <button className={styles.categoryTab}>상담실</button>
        <button className={styles.categoryTab}>활동공간</button>
        <button className={styles.categoryTab}>스포츠시설</button>
        <button className={styles.categoryTab}>편의시설</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>순서</th>
              <th>이미지</th>
              <th>이름</th>
              <th>카테고리</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {facilities.length > 0 ? (
              facilities.map((facility, index) => (
                <tr key={facility.id}>
                  <td>{facility.표시순서 || index + 1}</td>
                  <td>
                    {facility.이미지URL ? (
                      <img 
                        src={facility.이미지URL} 
                        alt={facility.이름} 
                        className={styles.thumbnailImage} 
                      />
                    ) : (
                      <div className={styles.noImage}>이미지 없음</div>
                    )}
                  </td>
                  <td>{facility.이름}</td>
                  <td>{facility.카테고리}</td>
                  <td>
                    <span 
                      className={`${styles.status} ${facility.활성화 ? styles.active : styles.inactive}`}
                      onClick={() => handleToggleStatus(facility.id, facility.활성화)}
                    >
                      {facility.활성화 ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button 
                      className={styles.editButton} 
                      onClick={() => router.push(`/admin/facilities/edit/${facility.id}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(facility.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.noData}>
                  등록된 시설이 없습니다. 새로운 시설을 추가해주세요.
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
Facilities.getLayout = (page) => page;

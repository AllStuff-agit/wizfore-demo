import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/team/Advisors.module.css';

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    이름: '',
    소속: '',
    직책: '',
    전문분야: '',
    프로필사진URL: '',
    소개글: '',
    isActive: true
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  
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

  // 자문위원 데이터 불러오기
  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      setIsLoading(true);
      
      // Firestore에서 자문위원 데이터 가져오기
      const advisorsCollection = collection(db, '센터정보', 'advisors', 'items');
      const q = query(advisorsCollection, orderBy('이름'));
      const querySnapshot = await getDocs(q);
      
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setAdvisors(items);
    } catch (err) {
      console.error('자문위원 데이터 불러오기 오류:', err);
      setError('자문위원 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 입력 폼 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 이미지 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setProfileImage(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      이름: '',
      소속: '',
      직책: '',
      전문분야: '',
      프로필사진URL: '',
      소개글: '',
      isActive: true
    });
    setProfileImage(null);
    setImagePreview('');
    setEditMode(false);
    setEditId(null);
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const path = `advisors/profile_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // 입력값 검증
    if (!formData.이름 || !formData.소속 || !formData.직책) {
      alert('필수 필드를 모두 입력해주세요.');
      setSaving(false);
      return;
    }

    try {
      let profileImageURL = formData.프로필사진URL;

      // 새 프로필 이미지 업로드 (있는 경우)
      if (profileImage) {
        profileImageURL = await uploadImage(profileImage);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (editMode && formData.프로필사진URL && formData.프로필사진URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, formData.프로필사진URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      const advisorData = {
        ...formData,
        프로필사진URL: profileImageURL,
        updatedAt: serverTimestamp()
      };

      if (editMode) {
        // 기존 항목 업데이트
        const advisorRef = doc(db, '센터정보', 'advisors', 'items', editId);
        await updateDoc(advisorRef, advisorData);
      } else {
        // 새 항목 추가
        const advisorsCollection = collection(db, '센터정보', 'advisors', 'items');
        const newItemRef = doc(advisorsCollection);
        advisorData.createdAt = serverTimestamp();
        await setDoc(newItemRef, advisorData);
      }

      resetForm();
      fetchAdvisors();
      alert(editMode ? '자문위원 정보가 수정되었습니다.' : '자문위원이 추가되었습니다.');
    } catch (err) {
      console.error(editMode ? '자문위원 수정 오류:' : '자문위원 추가 오류:', err);
      setError(editMode ? '자문위원 정보 수정에 실패했습니다.' : '자문위원 추가에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 항목 수정 모드 전환
  const handleEdit = (advisor) => {
    setFormData({
      이름: advisor.이름 || '',
      소속: advisor.소속 || '',
      직책: advisor.직책 || '',
      전문분야: advisor.전문분야 || '',
      프로필사진URL: advisor.프로필사진URL || '',
      소개글: advisor.소개글 || '',
      isActive: advisor.isActive !== false
    });
    setImagePreview(advisor.프로필사진URL || '');
    setEditMode(true);
    setEditId(advisor.id);
  };

  // 항목 삭제
  const handleDelete = async (id, imageURL) => {
    if (!window.confirm('정말로 이 자문위원을 삭제하시겠습니까?')) {
      return;
    }

    try {
      // Firestore에서 자문위원 문서 삭제
      const advisorRef = doc(db, '센터정보', 'advisors', 'items', id);
      await deleteDoc(advisorRef);

      // Storage에서 프로필 이미지 삭제 (있는 경우)
      if (imageURL && imageURL.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageURL);
          await deleteObject(imageRef);
        } catch (error) {
          console.warn('이미지 삭제 실패:', error);
        }
      }

      fetchAdvisors();
      alert('자문위원이 삭제되었습니다.');
    } catch (err) {
      console.error('자문위원 삭제 오류:', err);
      setError('자문위원 삭제에 실패했습니다.');
    }
  };

  // 항목 활성화 상태 전환
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const advisorRef = doc(db, '센터정보', 'advisors', 'items', id);
      await updateDoc(advisorRef, {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchAdvisors();
    } catch (err) {
      console.error('상태 변경 오류:', err);
      setError('자문위원 상태 변경에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="전문 자문단 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="전문 자문단 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <div className={styles.headerNav}>
          <Link href="/admin/team">전문가 소개</Link> &gt; 전문 자문단
        </div>
        <h1>전문 자문단</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.contentGrid}>
        {/* 자문위원 목록 섹션 */}
        <section className={styles.listSection}>
          <h2>자문위원 목록</h2>
          
          {advisors.length === 0 ? (
            <div className={styles.emptyList}>등록된 자문위원이 없습니다.</div>
          ) : (
            <div className={styles.advisorsGrid}>
              {advisors.map((advisor) => (
                <div 
                  key={advisor.id} 
                  className={`${styles.advisorCard} ${!advisor.isActive ? styles.inactiveCard : ''}`}
                >
                  <div className={styles.advisorHeader}>
                    <div className={styles.advisorStatus}>
                      {advisor.isActive ? (
                        <span className={styles.statusActive}>활성</span>
                      ) : (
                        <span className={styles.statusInactive}>비활성</span>
                      )}
                    </div>
                    <div className={styles.advisorActions}>
                      <button 
                        onClick={() => handleEdit(advisor)} 
                        className={styles.editButton}
                        title="수정"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(advisor.id, advisor.프로필사진URL)} 
                        className={styles.deleteButton}
                        title="삭제"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button 
                        onClick={() => handleToggleActive(advisor.id, advisor.isActive)} 
                        className={styles.toggleButton}
                        title={advisor.isActive ? '비활성화' : '활성화'}
                      >
                        {advisor.isActive ? 
                          <i className="fas fa-eye-slash"></i> : 
                          <i className="fas fa-eye"></i>
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.advisorContent}>
                    <div className={styles.advisorImage}>
                      {advisor.프로필사진URL ? (
                        <img src={advisor.프로필사진URL} alt={`${advisor.이름} 프로필`} />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.advisorInfo}>
                      <h3>{advisor.이름}</h3>
                      <p className={styles.advisorTitle}>{advisor.소속} {advisor.직책}</p>
                      {advisor.전문분야 && (
                        <p className={styles.advisorSpecialty}>
                          <span className={styles.label}>전문 분야:</span> {advisor.전문분야}
                        </p>
                      )}
                      {advisor.소개글 && (
                        <p className={styles.advisorBio}>{advisor.소개글}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* 입력 폼 섹션 */}
        <section className={styles.formSection}>
          <h2>{editMode ? '자문위원 수정' : '새 자문위원 추가'}</h2>
          
          <form onSubmit={handleSubmit} className={styles.advisorForm}>
            <div className={styles.formGroup}>
              <label htmlFor="이름">이름 *</label>
              <input
                type="text"
                id="이름"
                name="이름"
                value={formData.이름}
                onChange={handleInputChange}
                placeholder="예: 홍길동"
                required
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="소속">소속 *</label>
                <input
                  type="text"
                  id="소속"
                  name="소속"
                  value={formData.소속}
                  onChange={handleInputChange}
                  placeholder="예: OO대학교"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="직책">직책 *</label>
                <input
                  type="text"
                  id="직책"
                  name="직책"
                  value={formData.직책}
                  onChange={handleInputChange}
                  placeholder="예: 교수"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="전문분야">전문 분야</label>
              <input
                type="text"
                id="전문분야"
                name="전문분야"
                value={formData.전문분야}
                onChange={handleInputChange}
                placeholder="예: 언어병리학, 특수교육"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="프로필사진">프로필 사진</label>
              <div className={styles.imageUpload}>
                <input
                  type="file"
                  id="프로필사진"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="프로필 사진 미리보기" />
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="소개글">소개글</label>
              <textarea
                id="소개글"
                name="소개글"
                value={formData.소개글}
                onChange={handleInputChange}
                rows="4"
                placeholder="자문위원 소개글을 입력하세요"
              ></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <span>활성화 (웹사이트에 표시)</span>
              </label>
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> 저장 중...
                  </>
                ) : (
                  editMode ? '수정하기' : '추가하기'
                )}
              </button>
              
              {editMode && (
                <button 
                  type="button" 
                  className={styles.cancelButton} 
                  onClick={resetForm}
                >
                  취소
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
AdvisorsPage.getLayout = (page) => page;
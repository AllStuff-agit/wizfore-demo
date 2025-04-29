import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminFacilityForm.module.css';

export default function EditFacility() {
  const [formData, setFormData] = useState({
    이름: '',
    카테고리: '치료실',
    설명: '',
    이미지URL: '',
    추가이미지: [],
    가상투어URL: '',
    표시순서: 0,
    활성화: true
  });

  const [originalData, setOriginalData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const router = useRouter();
  const { id } = router.query;

  // 카테고리 옵션
  const categoryOptions = ['치료실', '상담실', '활동공간', '스포츠시설', '편의시설'];

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
    const fetchFacility = async () => {
      if (!id) return;

      try {
        const facilityDoc = await getDoc(doc(db, '시설', id));
        
        if (facilityDoc.exists()) {
          const data = facilityDoc.data();
          setFormData({
            이름: data.이름 || '',
            카테고리: data.카테고리 || '치료실',
            설명: data.설명 || '',
            이미지URL: data.이미지URL || '',
            추가이미지: data.추가이미지 || [],
            가상투어URL: data.가상투어URL || '',
            표시순서: data.표시순서 || 0,
            활성화: data.활성화 !== false
          });
          setOriginalData(data);
          setImagePreview(data.이미지URL);
        } else {
          setError('해당 시설 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('시설 정보 가져오기 오류:', error);
        setError('시설 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setImageFile(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.some(file => !file.type.match('image.*'))) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setAdditionalImageFiles(files);
  };

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const removeExistingImage = (index) => {
    const newImages = [...formData.추가이미지];
    newImages.splice(index, 1);
    setFormData({ ...formData, 추가이미지: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      let imageURL = formData.이미지URL;
      let additionalImages = [...formData.추가이미지];

      // 메인 이미지 업로드 (새 이미지가 있는 경우)
      if (imageFile) {
        const timestamp = Date.now();
        const path = `facilities/${timestamp}_${imageFile.name}`;
        imageURL = await uploadImage(imageFile, path);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (originalData?.이미지URL && originalData.이미지URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.이미지URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      // 추가 이미지 업로드 (새 이미지가 있는 경우)
      if (additionalImageFiles.length > 0) {
        const uploadPromises = additionalImageFiles.map(async (file, index) => {
          const timestamp = Date.now();
          const path = `facilities/additional/${timestamp}_${index}_${file.name}`;
          return await uploadImage(file, path);
        });

        const uploadedURLs = await Promise.all(uploadPromises);
        additionalImages = [...additionalImages, ...uploadedURLs];
      }

      // Firestore 업데이트
      const facilityRef = doc(db, '시설', id);
      await updateDoc(facilityRef, {
        ...formData,
        이미지URL: imageURL,
        추가이미지: additionalImages,
        수정일: serverTimestamp()
      });

      // 저장 성공 후 목록 페이지로 이동
      router.push('/admin/facilities');
    } catch (error) {
      console.error('시설 수정 오류:', error);
      setError('시설 정보 저장 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="시설 정보 수정 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="시설 정보 수정 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>시설 정보 수정</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="이름">시설 이름 *</label>
            <input
              type="text"
              id="이름"
              name="이름"
              value={formData.이름}
              onChange={handleInputChange}
              required
              placeholder="예: 언어치료실 1"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="카테고리">카테고리 *</label>
            <select
              id="카테고리"
              name="카테고리"
              value={formData.카테고리}
              onChange={handleInputChange}
              required
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="설명">시설 설명</label>
          <textarea
            id="설명"
            name="설명"
            value={formData.설명}
            onChange={handleInputChange}
            rows="5"
            placeholder="시설에 대한 상세 설명을 입력하세요"
          ></textarea>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="표시순서">표시 순서</label>
            <input
              type="number"
              id="표시순서"
              name="표시순서"
              value={formData.표시순서}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="활성화"
                checked={formData.활성화}
                onChange={handleInputChange}
              />
              <span>활성화</span>
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="이미지">대표 이미지</label>
          <div className={styles.imageUpload}>
            <input
              type="file"
              id="이미지"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="이미지 미리보기" />
                <p>현재 이미지</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>현재 추가 이미지</label>
          <div className={styles.additionalImagesPreview}>
            {formData.추가이미지.length > 0 ? (
              <div className={styles.imagesGrid}>
                {formData.추가이미지.map((url, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img src={url} alt={`추가 이미지 ${index + 1}`} />
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={() => removeExistingImage(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>추가 이미지가 없습니다</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="추가이미지">새 추가 이미지 (여러 개 선택 가능)</label>
          <input
            type="file"
            id="추가이미지"
            accept="image/*"
            onChange={handleAdditionalImagesChange}
            multiple
          />
          {additionalImageFiles.length > 0 && (
            <p className={styles.fileCount}>{additionalImageFiles.length}개의 파일이 선택됨</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="가상투어URL">가상 투어 URL (선택사항)</label>
          <input
            type="url"
            id="가상투어URL"
            name="가상투어URL"
            value={formData.가상투어URL}
            onChange={handleInputChange}
            placeholder="360도 가상 투어 URL"
          />
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => router.push('/admin/facilities')}
            disabled={saving}
          >
            취소
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
EditFacility.getLayout = (page) => page;

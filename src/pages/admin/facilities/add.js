import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/AdminFacilityForm.module.css';

export default function AddFacility() {
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
  
  const [imageFile, setImageFile] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      let imageURL = formData.이미지URL;
      let additionalImages = formData.추가이미지;

      // 메인 이미지 업로드
      if (imageFile) {
        const timestamp = Date.now();
        const path = `facilities/${timestamp}_${imageFile.name}`;
        imageURL = await uploadImage(imageFile, path);
      }

      // 추가 이미지 업로드
      if (additionalImageFiles.length > 0) {
        const uploadPromises = additionalImageFiles.map(async (file, index) => {
          const timestamp = Date.now();
          const path = `facilities/additional/${timestamp}_${index}_${file.name}`;
          return await uploadImage(file, path);
        });

        const uploadedURLs = await Promise.all(uploadPromises);
        additionalImages = [...formData.추가이미지, ...uploadedURLs];
      }

      // Firestore에 저장
      await addDoc(collection(db, '시설'), {
        ...formData,
        이미지URL: imageURL,
        추가이미지: additionalImages,
        생성일: serverTimestamp(),
        수정일: serverTimestamp()
      });

      // 저장 성공 후 목록 페이지로 이동
      router.push('/admin/facilities');
    } catch (error) {
      console.error('시설 추가 오류:', error);
      setError('시설 정보 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="시설 추가 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>새 시설 추가</h1>
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
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="추가이미지">추가 이미지 (여러 개 선택 가능)</label>
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
            disabled={loading}
          >
            취소
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
AddFacility.getLayout = (page) => page;

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminPostForm.module.css';

// 리치 텍스트 에디터 대신 일반 textarea 사용

export default function EditPost() {
  const [formData, setFormData] = useState({
    제목: '',
    카테고리: '센터소식',
    내용: '',
    썸네일URL: '',
    게시상태: false,
    상단고정: false,
    태그: []
  });

  const [originalData, setOriginalData] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef(null);

  // 카테고리 옵션
  const categoryOptions = ['공지사항', '센터소식', '행사안내', 'SNS연동'];


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
    const fetchPost = async () => {
      if (!id) return;

      try {
        const postDoc = await getDoc(doc(db, '게시글', id));
        
        if (postDoc.exists()) {
          const data = postDoc.data();
          setFormData({
            제목: data.제목 || '',
            카테고리: data.카테고리 || '센터소식',
            내용: data.내용 || '',
            썸네일URL: data.썸네일URL || '',
            게시상태: data.게시상태 || false,
            상단고정: data.상단고정 || false,
            태그: data.태그 || []
          });
          setOriginalData(data);
          setThumbnailPreview(data.썸네일URL);
        } else {
          setError('해당 게시글을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('게시글 데이터 가져오기 오류:', error);
        setError('게시글 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setThumbnailFile(file);
    
    // 썸네일 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setThumbnailPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleTagAdd = () => {
    if (newTag.trim() === '') return;
    
    if (!formData.태그.includes(newTag.trim())) {
      setFormData({
        ...formData,
        태그: [...formData.태그, newTag.trim()]
      });
    }
    
    setNewTag('');
  };

  const handleTagRemove = (tag) => {
    setFormData({
      ...formData,
      태그: formData.태그.filter(t => t !== tag)
    });
  };

  const uploadThumbnail = async (file) => {
    const timestamp = Date.now();
    const path = `posts/thumbnails/${timestamp}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      let thumbnailURL = formData.썸네일URL;

      // 새 썸네일 이미지 업로드 (있는 경우)
      if (thumbnailFile) {
        thumbnailURL = await uploadThumbnail(thumbnailFile);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (originalData?.썸네일URL && originalData.썸네일URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.썸네일URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      // Firestore 업데이트
      const postRef = doc(db, '게시글', id);
      await updateDoc(postRef, {
        ...formData,
        썸네일URL: thumbnailURL,
        수정일: serverTimestamp()
      });

      // 저장 성공 후 목록 페이지로 이동
      router.push('/admin/posts');
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      setError('게시글 수정 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="게시글 수정 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="게시글 수정 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>게시글 수정</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="제목">제목 *</label>
          <input
            type="text"
            id="제목"
            name="제목"
            value={formData.제목}
            onChange={handleInputChange}
            required
            placeholder="게시글 제목을 입력하세요"
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

        <div className={styles.formGroup}>
          <label htmlFor="내용">내용 *</label>
          <textarea
            id="내용"
            name="내용"
            value={formData.내용}
            onChange={handleInputChange}
            rows="10"
            className={styles.textArea}
            placeholder="게시글 내용을 입력하세요"
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="썸네일">썸네일 이미지</label>
          <div className={styles.thumbnailUpload}>
            <input
              type="file"
              id="썸네일"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview && (
              <div className={styles.thumbnailPreview}>
                <img src={thumbnailPreview} alt="썸네일 미리보기" />
                <p>현재 썸네일 이미지</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>태그</label>
          <div className={styles.tagInput}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              placeholder="태그를 입력하고 Enter 또는 추가 버튼을 누르세요"
            />
            <button 
              type="button" 
              onClick={handleTagAdd}
              className={styles.tagAddButton}
            >
              추가
            </button>
          </div>
          <div className={styles.tagList}>
            {formData.태그.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                <button 
                  type="button" 
                  onClick={() => handleTagRemove(tag)}
                  className={styles.tagRemoveButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="게시상태"
                checked={formData.게시상태}
                onChange={handleInputChange}
              />
              <span>게시하기</span>
              <small>(체크하지 않으면 임시저장됩니다)</small>
            </label>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="상단고정"
                checked={formData.상단고정}
                onChange={handleInputChange}
              />
              <span>상단 고정</span>
              <small>(중요 공지는 상단에 고정됩니다)</small>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => router.push('/admin/posts')}
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
EditPost.getLayout = (page) => page;

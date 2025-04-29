import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/AdminPostForm.module.css';

// 리치 텍스트 에디터 사용 (선택적)
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AddPost() {
  const [formData, setFormData] = useState({
    제목: '',
    카테고리: '센터소식',
    내용: '',
    썸네일URL: '',
    게시상태: false,
    상단고정: false,
    태그: []
  });
  
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const router = useRouter();
  const fileInputRef = useRef(null);

  // 카테고리 옵션
  const categoryOptions = ['공지사항', '센터소식', '행사안내', 'SNS연동'];

  // 리치 텍스트 에디터 모듈
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, 내용: content });
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
    setLoading(true);
    
    try {
      let thumbnailURL = '';

      // 썸네일 이미지 업로드 (있는 경우)
      if (thumbnailFile) {
        thumbnailURL = await uploadThumbnail(thumbnailFile);
      }

      // Firestore에 저장
      await addDoc(collection(db, '게시글'), {
        ...formData,
        썸네일URL: thumbnailURL,
        게시일: serverTimestamp(),
        생성일: serverTimestamp(),
        수정일: serverTimestamp(),
        작성자: auth.currentUser.email
      });

      // 저장 성공 후 목록 페이지로 이동
      router.push('/admin/posts');
    } catch (error) {
      console.error('게시글 저장 오류:', error);
      setError('게시글을 저장하는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="게시글 작성 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>새 게시글 작성</h1>
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
          <div className={styles.editorContainer}>
            <ReactQuill
              theme="snow"
              value={formData.내용}
              onChange={handleEditorChange}
              modules={quillModules}
              placeholder="게시글 내용을 입력하세요"
            />
          </div>
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
AddPost.getLayout = (page) => page;

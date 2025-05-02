import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/experts/Form.module.css';

export default function AddExpert() {
  const [formData, setFormData] = useState({
    이름: '',
    직책: '',
    전문가유형: '치료사',
    전문분야: [],
    학력: [],
    자격증: [],
    경력: [],
    소개글: '',
    담당프로그램: [],
    대표전문가여부: false,
    표시순서: 0
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [newValue, setNewValue] = useState({
    학력: '',
    자격증: '',
    경력: '',
    전문분야: ''
  });
  
  const router = useRouter();

  // 전문가 유형 옵션
  const expertTypeOptions = ['치료사', '상담사', '교사'];

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 프로그램 목록 가져오기
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsCollection = collection(db, '프로그램');
        const programsSnapshot = await getDocs(programsCollection);
        const programsList = programsSnapshot.docs.map(doc => ({
          id: doc.id,
          이름: doc.data().이름
        }));
        
        setPrograms(programsList);
      } catch (error) {
        console.error('프로그램 데이터 가져오기 오류:', error);
      }
    };

    fetchPrograms();
  }, []);

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

    setProfileImage(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setNewValue({ ...newValue, [name]: value });
  };

  const addArrayItem = (field) => {
    if (newValue[field] && newValue[field].trim() !== '') {
      setFormData({
        ...formData,
        [field]: [...formData[field], newValue[field]]
      });
      setNewValue({ ...newValue, [field]: '' });
    }
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleProgramToggle = (programId) => {
    const currentPrograms = formData.담당프로그램;
    
    if (currentPrograms.includes(programId)) {
      // 이미 선택된 프로그램이면 제거
      setFormData({
        ...formData,
        담당프로그램: currentPrograms.filter(id => id !== programId)
      });
    } else {
      // 선택되지 않은 프로그램이면 추가
      setFormData({
        ...formData,
        담당프로그램: [...currentPrograms, programId]
      });
    }
  };

  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const path = `experts/${timestamp}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      let profileImageURL = '';

      // 프로필 이미지 업로드
      if (profileImage) {
        profileImageURL = await uploadImage(profileImage);
      }

      // Firestore에 저장
      await addDoc(collection(db, '전문가'), {
        ...formData,
        프로필사진URL: profileImageURL,
        생성일: serverTimestamp(),
        수정일: serverTimestamp()
      });

      // 저장 성공 후 목록 페이지로 이동
      router.push('/admin/experts');
    } catch (error) {
      console.error('전문가 추가 오류:', error);
      setError('전문가 정보 저장 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="전문가 추가 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>새 전문가 추가</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="이름">이름 *</label>
            <input
              type="text"
              id="이름"
              name="이름"
              value={formData.이름}
              onChange={handleInputChange}
              required
              placeholder="예: 이서연"
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
              required
              placeholder="예: 언어치료사"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="전문가유형">전문가 유형 *</label>
            <select
              id="전문가유형"
              name="전문가유형"
              value={formData.전문가유형}
              onChange={handleInputChange}
              required
            >
              {expertTypeOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
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
                <img src={imagePreview} alt="이미지 미리보기" />
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.arrayInputHeader}>
            <label>전문 분야</label>
            <div className={styles.arrayInputActions}>
              <input
                type="text"
                name="전문분야"
                value={newValue.전문분야}
                onChange={handleArrayInputChange}
                placeholder="예: 언어발달, 조음장애 등"
              />
              <button 
                type="button" 
                onClick={() => addArrayItem('전문분야')}
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.전문분야.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('전문분야', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
            {formData.전문분야.length === 0 && (
              <p className={styles.emptyMessage}>등록된 전문 분야가 없습니다</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.arrayInputHeader}>
            <label>학력</label>
            <div className={styles.arrayInputActions}>
              <input
                type="text"
                name="학력"
                value={newValue.학력}
                onChange={handleArrayInputChange}
                placeholder="예: OO대학교 언어치료학과 졸업"
              />
              <button 
                type="button" 
                onClick={() => addArrayItem('학력')}
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.학력.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('학력', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
            {formData.학력.length === 0 && (
              <p className={styles.emptyMessage}>등록된 학력이 없습니다</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.arrayInputHeader}>
            <label>자격증</label>
            <div className={styles.arrayInputActions}>
              <input
                type="text"
                name="자격증"
                value={newValue.자격증}
                onChange={handleArrayInputChange}
                placeholder="예: 언어재활사 1급"
              />
              <button 
                type="button" 
                onClick={() => addArrayItem('자격증')}
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.자격증.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('자격증', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
            {formData.자격증.length === 0 && (
              <p className={styles.emptyMessage}>등록된 자격증이 없습니다</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.arrayInputHeader}>
            <label>경력</label>
            <div className={styles.arrayInputActions}>
              <input
                type="text"
                name="경력"
                value={newValue.경력}
                onChange={handleArrayInputChange}
                placeholder="예: OO아동발달센터 (2018-2020)"
              />
              <button 
                type="button" 
                onClick={() => addArrayItem('경력')}
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.경력.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('경력', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
            {formData.경력.length === 0 && (
              <p className={styles.emptyMessage}>등록된 경력이 없습니다</p>
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
            rows="5"
            placeholder="전문가 소개글을 입력하세요"
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>담당 프로그램</label>
          <div className={styles.programCheckboxes}>
            {programs.length > 0 ? (
              programs.map((program) => (
                <label key={program.id} className={styles.programCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.담당프로그램.includes(program.id)}
                    onChange={() => handleProgramToggle(program.id)}
                  />
                  <span>{program.이름}</span>
                </label>
              ))
            ) : (
              <p className={styles.emptyMessage}>등록된 프로그램이 없습니다</p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="대표전문가여부"
              checked={formData.대표전문가여부}
              onChange={handleInputChange}
            />
            <span>메인 페이지에 대표 전문가로 표시</span>
          </label>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => router.push('/admin/experts')}
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
AddExpert.getLayout = (page) => page;

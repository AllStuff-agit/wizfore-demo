import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    event: '',
    isActive: true
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isMigrating, setIsMigrating] = useState(false);
  
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

  // 연혁 데이터 불러오기
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      
      // Firestore에서 연혁 데이터 가져오기
      const historyCollection = collection(db, '센터정보', 'history', 'items');
      const q = query(historyCollection, orderBy('year', 'desc'), orderBy('month', 'desc'), orderBy('day', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setHistoryItems(items);
    } catch (err) {
      console.error('연혁 데이터 불러오기 오류:', err);
      setError('연혁 데이터를 불러오는데 실패했습니다.');
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

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      year: '',
      month: '',
      day: '',
      event: '',
      isActive: true
    });
    setEditMode(false);
    setEditId(null);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!formData.year || !formData.month || !formData.day || !formData.event) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const historyItemData = {
        ...formData,
        updatedAt: serverTimestamp()
      };

      if (editMode) {
        // 기존 항목 업데이트
        const historyItemRef = doc(db, '센터정보', 'history', 'items', editId);
        await updateDoc(historyItemRef, historyItemData);
      } else {
        // 새 항목 추가
        const historyItemsCollection = collection(db, '센터정보', 'history', 'items');
        const newItemRef = doc(historyItemsCollection);
        historyItemData.createdAt = serverTimestamp();
        await setDoc(newItemRef, historyItemData);
      }

      resetForm();
      fetchHistory();
    } catch (err) {
      setError('연혁 항목을 저장하는데 실패했습니다.');
      console.error(err);
    }
  };

  // 항목 수정 모드 전환
  const handleEdit = (item) => {
    setFormData({
      year: item.year,
      month: item.month,
      day: item.day,
      event: item.event,
      isActive: item.isActive || true
    });
    setEditMode(true);
    setEditId(item.id);
  };

  // 항목 삭제
  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      try {
        const historyItemRef = doc(db, '센터정보', 'history', 'items', id);
        await deleteDoc(historyItemRef);
        fetchHistory();
      } catch (err) {
        setError('항목을 삭제하는데 실패했습니다.');
        console.error(err);
      }
    }
  };

  // 항목 활성화 상태 전환
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const historyItemRef = doc(db, '센터정보', 'history', 'items', id);
      await updateDoc(historyItemRef, {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchHistory();
    } catch (err) {
      setError('항목 상태를 변경하는데 실패했습니다.');
      console.error(err);
    }
  };

  // 초기 데이터 마이그레이션
  const handleMigrateInitialData = async () => {
    if (!window.confirm('기본 연혁 데이터를 추가하시겠습니까? 이 작업은 기존 연혁 데이터를 유지하고 새 데이터만 추가합니다.')) {
      return;
    }

    try {
      setIsMigrating(true);
      
      // 기본 연혁 데이터
      const initialHistoryData = [
        { year: '2016', month: '03', day: '01', event: '센터 설립', isActive: true },
        { year: '2018', month: '09', day: '15', event: '2호점 오픈', isActive: true },
        { year: '2020', month: '07', day: '01', event: '특수교육 프로그램 확장', isActive: true },
        { year: '2022', month: '01', day: '10', event: '업무협약(MOU) 체결 - OO대학교', isActive: true },
        { year: '2024', month: '04', day: '05', event: '새 웹사이트 오픈', isActive: true }
      ];
      
      const historyItemsCollection = collection(db, '센터정보', 'history', 'items');
      
      // 데이터 추가
      let addedCount = 0;
      for (const item of initialHistoryData) {
        const newItemRef = doc(historyItemsCollection);
        await setDoc(newItemRef, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        addedCount++;
      }
      
      alert(`연혁 데이터 마이그레이션 완료: ${addedCount}개 항목 추가`);
      
      // 데이터 다시 로드
      fetchHistory();
    } catch (err) {
      console.error('초기 데이터 마이그레이션 에러:', err);
      setError('초기 데이터 마이그레이션에 실패했습니다.');
    } finally {
      setIsMigrating(false);
    }
  };

  // 숫자 입력값 포맷팅 함수 (1자리 -> 01)
  const formatTwoDigits = (value) => {
    return value.toString().padStart(2, '0');
  };

  if (loading) {
    return (
      <AdminLayout title="센터 발자취 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="센터 발자취 - 위즈포레 관리자">
      <div className="page-header">
        <div className="header-nav">
          <Link href="/admin/about">센터 소개</Link> &gt; 센터 발자취
        </div>
        <h1>센터 발자취</h1>
        
        <button 
          className={`migrate-button ${isMigrating ? 'disabled' : ''}`}
          onClick={handleMigrateInitialData}
          disabled={isMigrating}
        >
          {isMigrating ? '기본 데이터 추가 중...' : '기본 연혁 데이터 추가'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="content-grid">
        {/* 연혁 목록 섹션 */}
        <section className="list-section">
          <h2>연혁 목록</h2>
          
          <div className="table-header">
            <div className="table-date">날짜</div>
            <div className="table-event">내용</div>
            <div className="table-status">상태</div>
            <div className="table-actions">관리</div>
          </div>
          
          {isLoading ? (
            <div className="loading-table">로딩 중...</div>
          ) : historyItems.length === 0 ? (
            <div className="empty-list">등록된 연혁이 없습니다.</div>
          ) : (
            <div className="history-table">
              {/* 연혁 목록 테이블 내용 */}
              {historyItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`table-row ${!item.isActive ? 'inactive-row' : ''}`}
                >
                  <div className="table-date">
                    {item.year}.{item.month}.{item.day}
                  </div>
                  <div className="table-event">
                    {item.event}
                  </div>
                  <div className="table-status">
                    <span className={item.isActive ? 'active-status' : 'inactive-status'}>
                      {item.isActive ? '활성' : '비활성'}
                    </span>
                  </div>
                  <div className="table-actions">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="edit-button"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="delete-button"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button 
                      onClick={() => handleToggleActive(item.id, item.isActive)} 
                      className="toggle-button"
                    >
                      {item.isActive ? 
                        <i className="fas fa-eye-slash"></i> : 
                        <i className="fas fa-eye"></i>
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* 입력 폼 섹션 */}
        <section className="form-section">
          <h2>{editMode ? '연혁 수정' : '새 연혁 추가'}</h2>
          
          <form onSubmit={handleSubmit} className="history-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="year">연도</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="YYYY"
                  pattern="[0-9]{4}"
                  title="4자리 숫자로 입력하세요 (예: 2024)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="month">월</label>
                <input
                  type="text"
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  placeholder="MM"
                  pattern="[0-9]{2}"
                  title="2자리 숫자로 입력하세요 (예: 01)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="day">일</label>
                <input
                  type="text"
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  placeholder="DD"
                  pattern="[0-9]{2}"
                  title="2자리 숫자로 입력하세요 (예: 01)"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="event">내용</label>
              <input
                type="text"
                id="event"
                name="event"
                value={formData.event}
                onChange={handleInputChange}
                placeholder="연혁 내용을 입력하세요"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <span>활성화 (웹사이트에 표시)</span>
              </label>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {editMode ? '수정하기' : '추가하기'}
              </button>
              {editMode && (
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={resetForm}
                >
                  취소
                </button>
              )}
            </div>
          </form>
        </section>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .header-nav {
          font-size: 0.9rem;
          color: #6B7280;
          margin-bottom: 0.5rem;
        }
        
        .header-nav a {
          color: #2563EB;
          text-decoration: none;
        }
        
        .header-nav a:hover {
          text-decoration: underline;
        }
        
        .page-header h1 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .migrate-button {
          background-color: #10B981;
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }
        
        .migrate-button:hover {
          background-color: #059669;
        }
        
        .migrate-button.disabled {
          background-color: #D1FAE5;
          cursor: not-allowed;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2rem;
        }
        
        .list-section, .form-section {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          padding: 1.5rem;
        }
        
        .list-section h2, .form-section h2 {
          font-size: 1.2rem;
          color: #4B5563;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr 1fr;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background-color: #F3F4F6;
          border-radius: 0.375rem;
          font-weight: 600;
          color: #4B5563;
          margin-bottom: 0.5rem;
        }
        
        .history-table {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr 1fr;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          background-color: #F9FAFB;
          transition: background-color 0.15s ease-in-out;
        }
        
        .table-row:hover {
          background-color: #F3F4F6;
        }
        
        .inactive-row {
          opacity: 0.6;
        }
        
        .table-date {
          color: #4B5563;
          font-weight: 500;
        }
        
        .table-event {
          color: #1F2937;
        }
        
        .table-status {
          display: flex;
          align-items: center;
        }
        
        .active-status, .inactive-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .active-status {
          background-color: #D1FAE5;
          color: #047857;
        }
        
        .inactive-status {
          background-color: #F3F4F6;
          color: #6B7280;
        }
        
        .table-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .edit-button, .delete-button, .toggle-button {
          background: none;
          border: none;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.25rem;
          transition: background-color 0.15s ease-in-out;
        }
        
        .edit-button {
          color: #2563EB;
        }
        
        .edit-button:hover {
          background-color: #EFF6FF;
        }
        
        .delete-button {
          color: #DC2626;
        }
        
        .delete-button:hover {
          background-color: #FEE2E2;
        }
        
        .toggle-button {
          color: #4B5563;
        }
        
        .toggle-button:hover {
          background-color: #F3F4F6;
        }
        
        .loading-table, .empty-list {
          padding: 2rem;
          text-align: center;
          color: #6B7280;
        }
        
        .history-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }
        
        .form-group input[type="text"] {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.15s ease-in-out;
        }
        
        .form-group input[type="text"]:focus {
          border-color: #2563EB;
          outline: none;
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 500;
          color: #374151;
        }
        
        .checkbox-label input {
          margin-right: 0.5rem;
        }
        
        .form-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        
        .submit-button, .cancel-button {
          padding: 0.75rem 1.25rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }
        
        .submit-button {
          background-color: #2563EB;
          color: white;
          border: none;
        }
        
        .submit-button:hover {
          background-color: #1D4ED8;
        }
        
        .cancel-button {
          background-color: #F3F4F6;
          color: #4B5563;
          border: 1px solid #D1D5DB;
        }
        
        .cancel-button:hover {
          background-color: #E5E7EB;
        }
        
        .error {
          background-color: #FEE2E2;
          color: #B91C1C;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #2563EB;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
HistoryPage.getLayout = (page) => page;
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { getAllHistory, addHistoryItem, updateHistoryItem, deleteHistoryItem, toggleHistoryActive, migrateInitialHistory } from '../../services/historyService';
import { withAdminAuth } from '../../middlewares/withAdminAuth';
import styles from '../../styles/AdminHistory.module.css';

function AdminHistory() {
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

  // 연혁 데이터 불러오기
  useEffect(() => {
    console.log('AdminHistory component mounted');
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      console.log('Admin History: 연혁 데이터 불러오기 시작');
      setIsLoading(true);
      const data = await getAllHistory();
      console.log('Admin History: 데이터 수신됨, 항목 수:', data.length);
      
      if (data.length === 0) {
        console.log('Admin History: 연혁 데이터가 비어있음');
      } else {
        console.log('Admin History: 첫 번째 항목 샘플:', data[0]);
      }
      
      setHistoryItems(data);
    } catch (err) {
      console.error('Admin History: 데이터 불러오기 오류:', err);
      console.error('오류 상세:', err.message);
      setError('연혁 데이터를 불러오는데 실패했습니다. 콘솔을 확인해주세요.');
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
      if (editMode) {
        await updateHistoryItem(editId, formData);
      } else {
        await addHistoryItem(formData);
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
        await deleteHistoryItem(id);
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
      await toggleHistoryActive(id, currentStatus);
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
      console.log('Admin History: 초기 데이터 마이그레이션 시작');
      setIsMigrating(true);
      const count = await migrateInitialHistory();
      console.log(`Admin History: 마이그레이션 완료, ${count}개 항목 추가됨`);
      
      alert(`연혁 데이터 마이그레이션 완료: ${count}개 항목 추가`);
      
      // 약간의 지연을 두고 데이터 다시 로드
      setTimeout(() => {
        console.log('Admin History: 지연 후 데이터 다시 로드');
        fetchHistory();
      }, 1000);
    } catch (err) {
      console.error('Admin History: 마이그레이션 에러:', err);
      console.error('오류 상세:', err.message);
      setError('초기 데이터 마이그레이션에 실패했습니다.');
    } finally {
      setIsMigrating(false);
    }
  };

  // 숫자 입력값 포맷팅 함수 (1자리 -> 01)
  const formatTwoDigits = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <AdminLayout title="연혁 관리 - 위즈포레 사회서비스센터">
      <div className={styles.adminHistoryPage}>
        <div className={styles.pageHeader}>
          <h1>연혁 관리</h1>
          
          <button 
            className={`${styles.migrateButton} ${isMigrating ? styles.disabled : ''}`}
            onClick={handleMigrateInitialData}
            disabled={isMigrating}
          >
            {isMigrating ? '기본 데이터 추가 중...' : '기본 연혁 데이터 추가'}
          </button>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <div className={styles.contentGrid}>
          {/* 입력 폼 섹션 */}
          <section className={styles.formSection}>
            <h2>새 연혁 추가</h2>
            
            <form onSubmit={handleSubmit} className={styles.historyForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
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
                
                <div className={styles.formGroup}>
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
                
                <div className={styles.formGroup}>
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
              
              <div className={styles.formGroup}>
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
              
              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  활성화 (웹사이트에 표시)
                </label>
              </div>
              
              <button type="submit" className={styles.submitButton}>
                {editMode ? '수정하기' : '추가하기'}
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
            </form>
          </section>
          
          {/* 연혁 목록 섹션 */}
          <section className={styles.listSection}>
            <h2>연혁 목록</h2>
            
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : historyItems.length === 0 ? (
              <div className={styles.emptyList}>등록된 연혁이 없습니다.</div>
            ) : (
              <div className={styles.historyTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableDate}>날짜</div>
                  <div className={styles.tableEvent}>내용</div>
                  <div className={styles.tableStatus}>상태</div>
                  <div className={styles.tableActions}>관리</div>
                </div>
                
                {historyItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${styles.tableRow} ${!item.isActive ? styles.inactiveRow : ''}`}
                  >
                    <div className={styles.tableDate}>
                      {item.year}.{item.month}.{item.day}.
                    </div>
                    <div className={styles.tableEvent}>
                      {item.event}
                    </div>
                    <div className={styles.tableStatus}>
                      <span className={item.isActive ? styles.activeStatus : styles.inactiveStatus}>
                        {item.isActive ? '활성' : '비활성'}
                      </span>
                    </div>
                    <div className={styles.tableActions}>
                      <button 
                        onClick={() => handleEdit(item)} 
                        className={styles.editButton}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className={styles.deleteButton}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button 
                        onClick={() => handleToggleActive(item.id, item.isActive)} 
                        className={styles.toggleButton}
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
        </div>
      </div>
    </AdminLayout>
  );
}

// 관리자 인증으로 컴포넌트 래핑
const WrappedComponent = withAdminAuth(AdminHistory);

// 관리자 페이지 레이아웃 적용
WrappedComponent.getLayout = (page) => page;

export default WrappedComponent;

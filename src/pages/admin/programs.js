"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { 
  getAllPrograms, 
  addProgram, 
  updateProgram, 
  deleteProgram, 
  toggleProgramActive,
  migrateInitialPrograms 
} from '../../services/programService';
import { withAdminAuth } from '../../middlewares/withAdminAuth';
import styles from '../../styles/AdminPrograms.module.css';

function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: '',
    isActive: true
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const router = useRouter();

  // 프로그램 데이터 불러오기
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const data = await getAllPrograms();
      setPrograms(data);
    } catch (err) {
      console.error('프로그램 데이터 로드 오류:', err);
      setError('프로그램 데이터를 불러오는데 실패했습니다.');
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
      name: '',
      description: '',
      order: '',
      isActive: true
    });
    setEditMode(false);
    setEditId(null);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!formData.name || !formData.description || !formData.order) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      if (editMode) {
        await updateProgram(editId, formData);
      } else {
        await addProgram(formData);
      }
      resetForm();
      fetchPrograms();
    } catch (err) {
      setError('프로그램을 저장하는데 실패했습니다.');
      console.error(err);
    }
  };

  // 항목 수정 모드 전환
  const handleEdit = (program) => {
    setFormData({
      name: program.name,
      description: program.description,
      order: program.order,
      isActive: program.isActive
    });
    setEditMode(true);
    setEditId(program.id);
  };

  // 항목 삭제
  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 프로그램을 삭제하시겠습니까?')) {
      try {
        await deleteProgram(id);
        fetchPrograms();
      } catch (err) {
        setError('프로그램을 삭제하는데 실패했습니다.');
        console.error(err);
      }
    }
  };

  // 항목 활성화 상태 전환
  const handleToggleActive = async (id, currentStatus) => {
    try {
      await toggleProgramActive(id, currentStatus);
      fetchPrograms();
    } catch (err) {
      setError('프로그램 상태를 변경하는데 실패했습니다.');
      console.error(err);
    }
  };

  // 초기 데이터 마이그레이션
  const handleMigrateInitialData = async () => {
    if (!window.confirm('기본 프로그램 데이터를 추가하시겠습니까? 이 작업은 기존 프로그램 데이터를 유지하고 새 데이터만 추가합니다.')) {
      return;
    }

    try {
      setIsMigrating(true);
      const count = await migrateInitialPrograms();
      alert(`프로그램 데이터 마이그레이션 완료: ${count}개 항목 추가`);
      fetchPrograms();
    } catch (err) {
      console.error('마이그레이션 에러:', err);
      setError('초기 데이터 마이그레이션에 실패했습니다.');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <AdminLayout title="프로그램 관리 - 위즈포레 사회서비스센터">
      <div className={styles.adminProgramsPage}>
        <div className={styles.pageHeader}>
          <h1>프로그램 관리</h1>
          
          <button 
            className={`${styles.migrateButton} ${isMigrating ? styles.disabled : ''}`}
            onClick={handleMigrateInitialData}
            disabled={isMigrating}
          >
            {isMigrating ? '기본 데이터 추가 중...' : '기본 프로그램 데이터 추가'}
          </button>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <div className={styles.contentGrid}>
          {/* 프로그램 목록 섹션 */}
          <section className={styles.listSection}>
            <h2>프로그램 목록</h2>
            
            <div className={styles.tableHeader}>
              <div className={styles.tableOrder}>순서</div>
              <div className={styles.tableName}>프로그램명</div>
              <div className={styles.tableDescription}>설명</div>
              <div className={styles.tableStatus}>상태</div>
              <div className={styles.tableActions}>관리</div>
            </div>
            
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : programs.length === 0 ? (
              <div className={styles.emptyList}>등록된 프로그램이 없습니다.</div>
            ) : (
              <div className={styles.programTable}>
                {programs.map((program) => (
                  <div 
                    key={program.id} 
                    className={`${styles.tableRow} ${!program.isActive ? styles.inactiveRow : ''}`}
                  >
                    <div className={styles.tableOrder}>
                      {program.order}
                    </div>
                    <div className={styles.tableName}>
                      {program.name}
                    </div>
                    <div className={styles.tableDescription}>
                      {program.description}
                    </div>
                    <div className={styles.tableStatus}>
                      <span className={program.isActive ? styles.activeStatus : styles.inactiveStatus}>
                        {program.isActive ? '활성' : '비활성'}
                      </span>
                    </div>
                    <div className={styles.tableActions}>
                      <button 
                        onClick={() => handleEdit(program)} 
                        className={styles.editButton}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(program.id)} 
                        className={styles.deleteButton}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button 
                        onClick={() => handleToggleActive(program.id, program.isActive)} 
                        className={styles.toggleButton}
                      >
                        {program.isActive ? 
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
          <section className={styles.formSection}>
            <h2>{editMode ? '프로그램 수정' : '새 프로그램 추가'}</h2>
            
            <form onSubmit={handleSubmit} className={styles.programForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">프로그램명</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="프로그램명을 입력하세요"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="description">설명</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="프로그램 설명을 입력하세요"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="order">순서</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="표시 순서를 입력하세요"
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
        </div>
      </div>
    </AdminLayout>
  );
}

// 관리자 인증으로 컴포넌트 래핑
const WrappedComponent = withAdminAuth(AdminPrograms);

// 관리자 페이지 레이아웃 적용
WrappedComponent.getLayout = (page) => page;

export default WrappedComponent; 
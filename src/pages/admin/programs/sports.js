import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import { programs } from '../../../data';
import styles from '../../../styles/admin/programs/Programs.module.css';

export default function SportsProgramsPage() {
  const [sportsPrograms, setSportsPrograms] = useState([]);
  
  useEffect(() => {
    // 데이터에서 특수 스포츠 카테고리에 해당하는 프로그램만 필터링
    const filtered = programs.filter(program => program.category === '특수 스포츠');
    setSportsPrograms(filtered);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/admin/programs">프로그램 안내</Link> &gt; 특수 스포츠
        </div>
      </header>

      <section className={styles.programList}>
        <div className={styles.programHeader}>
          <h2>특수 스포츠 목록</h2>
          <button className={styles.addButton} onClick={() => alert('프로그램 추가 기능은 개발 중입니다.')}>
            <i className="fas fa-plus"></i> 프로그램 추가
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.programTable}>
            <thead>
              <tr>
                <th>No.</th>
                <th>프로그램명</th>
                <th>설명</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {sportsPrograms.map((program, index) => (
                <tr key={program.id}>
                  <td>{index + 1}</td>
                  <td>{program.name}</td>
                  <td className={styles.descriptionCell}>{program.description}</td>
                  <td>
                    <span className={program.isActive ? styles.activeStatus : styles.inactiveStatus}>
                      {program.isActive ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.editButton}
                        onClick={() => alert('편집 기능은 개발 중입니다.')}
                      >
                        <i className="fas fa-edit"></i> 편집
                      </button>
                      <button 
                        className={styles.toggleButton}
                        onClick={() => alert('상태 변경 기능은 개발 중입니다.')}
                      >
                        {program.isActive ? (
                          <><i className="fas fa-ban"></i> 비활성화</>
                        ) : (
                          <><i className="fas fa-check"></i> 활성화</>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sportsPrograms.length === 0 && (
                <tr>
                  <td colSpan="5" className={styles.noData}>등록된 프로그램이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

SportsProgramsPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout title="특수 스포츠 관리 - 위즈포레 사회서비스센터">
      {page}
    </AdminLayout>
  );
};
"use client";

import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../services/settingsService';
import AdminLayout from '../../components/AdminLayout';
import { withAdminAuth } from '../../middlewares/withAdminAuth';
import styles from '../../styles/Admin.module.css';

function Settings() {
  const [settings, setSettings] = useState({
    siteName: '',
    phone: '',
    fax: '',
    email: '',
    address: '',
    operatingHours: {
      weekday: { start: '', end: '' },
      saturday: { start: '', end: '' },
      sunday: 'closed'
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      if (data) {
        setSettings(data);
        setEditedSettings(data);
      }
      setIsLoading(false);
    } catch (error) {
      setError('설정을 불러오는 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditedSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(editedSettings);
      setSettings(editedSettings);
      setSuccess('설정이 성공적으로 저장되었습니다.');
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('설정을 저장하는 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedSettings(settings);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSettings(settings);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className={styles.adminContainer}>
        <AdminLayout />
        <div className={styles.adminContent}>
          <div className={styles.loading}>로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <AdminLayout />
      <div className={styles.adminContent}>
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>센터 기본 정보</h1>
            {!isEditing ? (
              <button onClick={handleEdit} className={styles.editButton}>
                <i className="fas fa-edit"></i> 수정
              </button>
            ) : (
              <div className={styles.editActions}>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  취소
                </button>
                <button onClick={handleSubmit} className={styles.saveButton}>
                  저장
                </button>
              </div>
            )}
          </div>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.card}>
          <div className={styles.settingsContent}>
            <div className={styles.settingsGroup}>
              <h2>기본 정보</h2>
              <div className={styles.settingsItem}>
                <label>센터명</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="siteName"
                    value={editedSettings.siteName}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <span>{settings.siteName}</span>
                )}
              </div>

              <div className={styles.settingsItem}>
                <label>대표 전화번호</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedSettings.phone}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <span>{settings.phone}</span>
                )}
              </div>

              <div className={styles.settingsItem}>
                <label>팩스번호</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="fax"
                    value={editedSettings.fax}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{settings.fax}</span>
                )}
              </div>

              <div className={styles.settingsItem}>
                <label>이메일</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedSettings.email}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <span>{settings.email}</span>
                )}
              </div>

              <div className={styles.settingsItem}>
                <label>주소</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editedSettings.address}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <span>{settings.address}</span>
                )}
              </div>
            </div>

            <div className={styles.settingsGroup}>
              <h2>운영시간</h2>
              <div className={styles.settingsItem}>
                <label>평일</label>
                {isEditing ? (
                  <div className={styles.timeInputs}>
                    <input
                      type="time"
                      name="operatingHours.weekday.start"
                      value={editedSettings.operatingHours.weekday.start}
                      onChange={handleChange}
                      required
                    />
                    <span>~</span>
                    <input
                      type="time"
                      name="operatingHours.weekday.end"
                      value={editedSettings.operatingHours.weekday.end}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ) : (
                  <span>
                    {settings.operatingHours.weekday.start} ~ {settings.operatingHours.weekday.end}
                  </span>
                )}
              </div>

              <div className={styles.settingsItem}>
                <label>토요일</label>
                {isEditing ? (
                  <div className={styles.timeInputs}>
                    <input
                      type="time"
                      name="operatingHours.saturday.start"
                      value={editedSettings.operatingHours.saturday.start}
                      onChange={handleChange}
                      required
                    />
                    <span>~</span>
                    <input
                      type="time"
                      name="operatingHours.saturday.end"
                      value={editedSettings.operatingHours.saturday.end}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ) : (
                  <span>
                    {settings.operatingHours.saturday.start} ~ {settings.operatingHours.saturday.end}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 관리자 인증으로 컴포넌트 래핑
const WrappedComponent = withAdminAuth(Settings);

// 관리자 페이지 레이아웃 적용
WrappedComponent.getLayout = (page) => page;

export default WrappedComponent; 
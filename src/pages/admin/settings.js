"use client";

import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../services/settingsService';
import AdminSidebar from '../../components/AdminLayout';
import styles from '../../styles/Admin.module.css';

export default function Settings() {
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

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      if (data) {
        setSettings(data);
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
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(settings);
      setSuccess('설정이 성공적으로 저장되었습니다.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('설정을 저장하는 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.adminContainer}>
        <AdminSidebar />
        <div className={styles.adminContent}>
          <div className={styles.loading}>로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.adminContent}>
        <div className={styles.pageHeader}>
          <h1>센터 기본 정보 설정</h1>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="siteName">센터명</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">대표 전화번호</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fax">팩스번호</label>
              <input
                type="tel"
                id="fax"
                name="fax"
                value={settings.fax}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">주소</label>
              <input
                type="text"
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                required
              />
            </div>

            <h2>운영시간</h2>
            
            <div className={styles.formGroup}>
              <label>평일</label>
              <div className={styles.timeInputs}>
                <input
                  type="time"
                  name="operatingHours.weekday.start"
                  value={settings.operatingHours.weekday.start}
                  onChange={handleChange}
                  required
                />
                <span>~</span>
                <input
                  type="time"
                  name="operatingHours.weekday.end"
                  value={settings.operatingHours.weekday.end}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>토요일</label>
              <div className={styles.timeInputs}>
                <input
                  type="time"
                  name="operatingHours.saturday.start"
                  value={settings.operatingHours.saturday.start}
                  onChange={handleChange}
                  required
                />
                <span>~</span>
                <input
                  type="time"
                  name="operatingHours.saturday.end"
                  value={settings.operatingHours.saturday.end}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              저장하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { defaultSiteData } from '@/lib/data/defaultSiteData'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { contact } = defaultSiteData.siteInfo

  return (
    <footer className="bg-white text-wizfore-text-primary">
      <div className="max-w-6xl mx-auto px-2 pt-16 pb-8">
        <motion.div 
          className="flex flex-col lg:flex-row gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 좌측: 지도 */}
          <div className="lg:w-1/2 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={contact.mapUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="위즈포레 위치"
            />
          </div>

          {/* 우측: 센터 정보 */}
          <div className="lg:w-1/2 space-y-6 text-center lg:pl-8">
            {/* 센터명 */}
            <div>
              <h3 className="text-3xl font-bold text-wizfore-text-primary mb-2">
                {defaultSiteData.siteInfo.name}
              </h3>
            </div>

            {/* 주소 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">주&nbsp;&nbsp;&nbsp;소</h4>
              <div className="flex items-start justify-center space-x-2">
                <MapPin size={16} className="text-wizfore-coral-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-wizfore-text-secondary leading-relaxed max-w-xs break-words">
                  {contact.address}
                </p>
              </div>
            </div>

            {/* 연락처 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">대&nbsp;표&nbsp;번&nbsp;호</h4>
              <div className="flex items-center justify-center space-x-2">
                <Phone size={16} className="text-wizfore-coral-secondary" />
                <span className="text-lg font-bold text-wizfore-coral-primary">
                  {contact.phone}
                </span>
              </div>
            </div>

            {/* 팩스 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">팩&nbsp;&nbsp;&nbsp;스</h4>
              <div className="flex items-center justify-center space-x-2">
                <Phone size={16} className="text-wizfore-coral-secondary" />
                <span className="text-sm text-wizfore-text-secondary">
                  {contact.fax}
                </span>
              </div>
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">이&nbsp;메&nbsp;일</h4>
              <div className="flex items-center justify-center space-x-2">
                <Mail size={16} className="text-wizfore-coral-secondary" />
                <span className="text-sm text-wizfore-text-secondary">
                  {contact.email}
                </span>
              </div>
            </div>

            {/* 운영시간 */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">운&nbsp;영&nbsp;시&nbsp;간</h4>
              <div className="space-y-1 text-sm text-wizfore-text-secondary">
                <div className="flex items-center justify-center space-x-2">
                  <Clock size={14} className="text-wizfore-coral-secondary" />
                  <span>평일: {contact.operatingHours.weekday}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock size={14} className="text-wizfore-coral-secondary" />
                  <span>주말/공휴일: {contact.operatingHours.weekend}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business Information Section */}
        <div className="mt-40 text-center">
          <div className="text-xs text-wizfore-text-light space-x-4">
            <span>사업자등록번호: {contact.businessNumber}</span>
            <span>|</span>
            <span>계좌정보: {contact.accountInfo}</span>
            <span>|</span>
            <div className="inline-flex items-center space-x-1">
              <Mail size={12} />
              <span>{contact.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-2">
          <div className="text-center">
            <p className="text-sm text-wizfore-text-light">
              © {currentYear} {defaultSiteData.siteInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

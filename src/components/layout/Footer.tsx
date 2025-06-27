'use client'

import { useEffect, useState } from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { defaultSiteData } from '@/lib/data/defaultSiteData'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { contact } = defaultSiteData.siteInfo

  return (
    <footer className="bg-white text-wizfore-text-primary">
      <div className="max-w-6xl mx-auto px-2 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side - Map */}
          <div className="lg:w-1/2 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={contact.mapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="위즈포레 사회서비스센터 위치"
            />
          </div>

          {/* Right Side - Company Info (Center Aligned) */}
          <div className="lg:w-1/2 space-y-6 text-center lg:pl-0">
            {/* Company Name */}
            <div>
              <h3 className="text-xl font-bold text-wizfore-coral-primary mb-2">
                {defaultSiteData.siteInfo.name}
              </h3>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">주소</h4>
              <div className="flex items-start justify-center space-x-2">
                <MapPin size={16} className="text-wizfore-coral-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-wizfore-text-secondary leading-relaxed max-w-xs break-words">
                  {contact.address}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">대표번호</h4>
              <div className="flex items-center justify-center space-x-2">
                <Phone size={16} className="text-wizfore-coral-secondary" />
                <span className="text-lg font-bold text-wizfore-coral-primary">
                  {contact.phone}
                </span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-2">
              <h4 className="font-semibold text-wizfore-text-primary">진료시간</h4>
              <div className="space-y-1 text-sm text-wizfore-text-secondary">
                <div className="flex items-center justify-center space-x-2">
                  <Clock size={14} className="text-wizfore-coral-secondary" />
                  <span>평일: {contact.operatingHours.weekday}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock size={14} className="text-wizfore-coral-secondary" />
                  <span>주말/공휴일: {contact.operatingHours.weekend}</span>
                </div>
                <p className="text-xs text-red-500 mt-2">
                  토, 일, 공휴일 일요일 휴진
                </p>
              </div>
            </div>
          </div>
        </div>

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

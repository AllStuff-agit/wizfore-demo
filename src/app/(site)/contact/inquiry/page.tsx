'use client'

import React from 'react'
import InquiryHeroSection from '@/components/contact/InquiryHeroSection'
import OnlineInquirySection from '@/components/contact/OnlineInquirySection'

export default function OnlineInquiryPage() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <InquiryHeroSection />
      
      {/* 온라인 문의 폼 섹션 */}
      <OnlineInquirySection />
    </div>
  )
}
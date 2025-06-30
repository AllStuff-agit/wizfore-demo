'use client'

//import { HeroSection, OverviewSection, StatsSection, TimelineSection } from '@/components/about/history'

import HeroSection from '@/components/about/history/HeroSection'
import StatsSection from '@/components/about/history/StatsSection'
import TimelineSection from '@/components/about/history/TimelineSection'

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <StatsSection />
      <TimelineSection />
    </div>
  )
}
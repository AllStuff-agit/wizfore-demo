import HeroSection from '@/components/home/HeroSection'
import CategoryCards from '@/components/home/CategoryCards'
import AboutSection from '@/components/home/AboutSection'
import ProgramGrid from '@/components/home/ProgramGrid'
import MainServicesSection from '@/components/home/MainServicesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 - 슬라이더 방식 */}
      <HeroSection />
      
      {/* 4개 카테고리 카드 */}
      <CategoryCards />
      
      {/* 센터 소개 - "내 이야기가 있는 곳" */}
      <AboutSection />
      
      {/* 프로그램 그리드 - 3x4 레이아웃 */}
      <ProgramGrid />
      
      {/* 주요 사업 분야 */}
      <MainServicesSection />
    </div>
  )
}

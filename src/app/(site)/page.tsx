import HeroSection from '@/components/home/HeroSection'
import CategoryCards from '@/components/home/CategoryCards'
import AboutSection from '@/components/home/AboutSection'
import ProgramGrid from '@/components/home/ProgramGrid'
import VoucherSection from '@/components/home/VoucherSection'

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
      
      {/* 바우처 이용 안내 */}
      <VoucherSection />
    </div>
  )
}

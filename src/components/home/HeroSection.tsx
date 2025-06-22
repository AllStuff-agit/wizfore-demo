'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { HeroSlide } from '@/types'

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  // Firebase에서 슬라이드 데이터 가져오기
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const docRef = doc(db, 'homeConfig', 'main')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          const heroSlides = data.hero?.slides || []
          
          // 활성화된 슬라이드만 필터링하고 순서대로 정렬
          const enabledSlides = heroSlides
            .filter((slide: HeroSlide) => slide.enabled)
            .sort((a: HeroSlide, b: HeroSlide) => a.order - b.order)
          
          setSlides(enabledSlides)
          setIsAutoPlaying(data.hero?.autoPlay ?? true)
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error)
        // 에러 시 기본 슬라이드 사용
        setSlides([])
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number): void => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-mindstory-lime mx-auto mb-4"></div>
          <p className="text-gray-600">슬라이드를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex items-center justify-center">
        <div className="container-custom mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
            위즈포레 사회서비스센터
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            함께 어우러지는 지혜의 숲에서 전문적인 사회서비스를 제공합니다.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center bg-mindstory-lime hover:bg-mindstory-lime-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            센터 소개 보기
          </Link>
        </div>
      </section>
    )
  }

  const currentSlideData = slides[currentSlide] || slides[0]

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* 마인드스토리 스타일 배경 - 따뜻한 그라데이션 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.backgroundColor}`} />
          
          {/* 배경 이미지 오버레이 (실제 사진처럼) */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23f5f5f5" width="1200" height="800"/><g fill-opacity=".1"><circle fill="%23${currentSlide === 0 ? 'ff9800' : currentSlide === 1 ? '2196f3' : '4caf50'}" cx="200" cy="200" r="100"/><circle fill="%23${currentSlide === 0 ? 'e91e63' : currentSlide === 1 ? '9c27b0' : '009688'}" cx="1000" cy="600" r="120"/></g></svg>')`
            }}
          />

          {/* 콘텐츠 */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container-custom mx-auto px-4 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl mb-4 text-mindstory-gray-text font-medium">
                  {currentSlideData.title}
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
                  {currentSlideData.subtitle}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-mindstory-gray-text max-w-3xl mx-auto leading-relaxed">
                  {currentSlideData.description}
                </p>
                <Link
                  href={currentSlideData.buttonLink}
                  className="inline-flex items-center bg-mindstory-lime hover:bg-mindstory-lime-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {currentSlideData.buttonText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 네비게이션 화살표 - 마인드스토리 스타일 */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-mindstory-gray-text transition-all duration-300 shadow-lg"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-mindstory-gray-text transition-all duration-300 shadow-lg"
        aria-label="다음 슬라이드"
      >
        <ChevronRight size={24} />
      </button>

      {/* 슬라이드 인디케이터 - 마인드스토리 스타일 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-mindstory-lime scale-125' 
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* 자동재생 컨트롤 */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-8 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-mindstory-gray-text transition-all duration-300 shadow-lg"
        aria-label={isAutoPlaying ? '자동재생 정지' : '자동재생 시작'}
      >
        {isAutoPlaying ? (
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-mindstory-gray-text rounded-full" />
            <div className="w-1 h-4 bg-mindstory-gray-text rounded-full" />
          </div>
        ) : (
          <Play size={16} className="ml-0.5" />
        )}
      </button>
    </section>
  )
}

export default HeroSection

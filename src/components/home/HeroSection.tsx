'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { HeroSlide } from '@/types'

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const docRef = doc(db, 'homeConfig', 'main')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const heroSlides = data.hero?.slides || []

          const enabledSlides = heroSlides
            .filter((slide: HeroSlide) => slide.enabled)
            .sort((a: HeroSlide, b: HeroSlide) => a.order - b.order)

          setSlides(enabledSlides)
          setIsAutoPlaying(data.hero?.autoPlay ?? true)
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error)
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


  if (loading || slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden px-4 md:px-8 lg:px-16 py-8">
        <div 
          className="relative h-full w-full bg-wizfore-light-beige rounded-[3rem]"
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-wizfore-text-primary">
                위즈포레 사회서비스센터
              </h1>
              <p className="text-lg md:text-xl text-wizfore-text-secondary leading-relaxed">
                함께 어우러지는 지혜의 숲에서 전문적인 사회서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentSlideData = slides[currentSlide] || slides[0]

  return (
    <section className="relative h-screen overflow-hidden px-4 md:px-8 lg:px-16 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-4 md:inset-8 lg:inset-16 inset-y-8 rounded-[3rem] overflow-hidden"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.backgroundColor}`} />
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><rect fill=\"%23f5f5f5\" width=\"1200\" height=\"800\"/><g fill-opacity=\".1\"><circle fill=\"%23${currentSlide === 0 ? 'ff9800' : currentSlide === 1 ? '2196f3' : '4caf50'}\" cx=\"200\" cy=\"200\" r=\"100\"/><circle fill=\"%23${currentSlide === 0 ? 'e91e63' : currentSlide === 1 ? '9c27b0' : '009688'}\" cx=\"1000\" cy=\"600\" r=\"120\"/></g></svg>')`
              }}
            />
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <h2 className="text-2xl md:text-3xl mb-4 text-wizfore-text-secondary font-medium">
                    {currentSlideData.title}
                  </h2>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-wizfore-text-primary">
                    {currentSlideData.subtitle}
                  </h1>
                  <p className="text-lg md:text-xl text-wizfore-text-secondary leading-relaxed">
                    {currentSlideData.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute left-8 md:left-12 lg:left-20 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-wizfore-text-primary transition-all duration-300 shadow-lg"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute right-8 md:right-12 lg:right-20 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-wizfore-text-primary transition-all duration-300 shadow-lg"
          aria-label="다음 슬라이드"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-wizfore-warm-brown scale-125' 
                  : 'bg-wizfore-text-light hover:bg-wizfore-text-secondary'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-8 right-8 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-wizfore-text-primary transition-all duration-300 shadow-lg"
          aria-label={isAutoPlaying ? '자동재생 정지' : '자동재생 시작'}
        >
          {isAutoPlaying ? (
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-wizfore-text-primary rounded-full" />
              <div className="w-1 h-4 bg-wizfore-text-primary rounded-full" />
            </div>
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </button>
    </section>
  )
}

export default HeroSection
'use client'

import { motion } from 'framer-motion'
import type { DirectorInfo } from '@/types'

interface DirectorHeroSectionProps {
  director: DirectorInfo
}

const DirectorHeroSection: React.FC<DirectorHeroSectionProps> = ({ director }) => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[calc(100vh-5rem)] overflow-hidden px-4 md:px-8 lg:px-16 pb-24 md:pb-32 lg:pb-40">
      <div className="absolute inset-x-4 md:inset-x-8 lg:inset-x-16 top-0 bottom-4 md:bottom-8 lg:bottom-16 rounded-[3rem] overflow-hidden border-2 border-white">
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${director.heroImageUrl || '/images/hero/defaultHero.jpg'}')`
          }}
        />
        
        {/* 중앙 텍스트 */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              센터장 소개
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DirectorHeroSection
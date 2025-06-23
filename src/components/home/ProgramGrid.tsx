'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllProgramsFlattened } from '@/lib/services/defaultDataService'
import Marquee from '@/components/ui/marquee'
import { 
  Brain, 
  Heart, 
  Users, 
  Target, 
  Lightbulb, 
  Star,
  MessageCircle,
  Activity
} from 'lucide-react'

// 프로그램 아이콘 및 색상 매핑
const programIconsAndColors = [
  { icon: Brain, bgColor: 'bg-blue-500', hoverColor: 'bg-blue-600' },      // 인지/학습
  { icon: Heart, bgColor: 'bg-pink-500', hoverColor: 'bg-pink-600' },      // 정서/심리
  { icon: Users, bgColor: 'bg-green-500', hoverColor: 'bg-green-600' },    // 사회성
  { icon: Target, bgColor: 'bg-orange-500', hoverColor: 'bg-orange-600' }, // 목표달성
  { icon: Lightbulb, bgColor: 'bg-yellow-500', hoverColor: 'bg-yellow-600' }, // 창의성
  { icon: Star, bgColor: 'bg-purple-500', hoverColor: 'bg-purple-600' },   // 특성화
  { icon: MessageCircle, bgColor: 'bg-teal-500', hoverColor: 'bg-teal-600' }, // 상담
  { icon: Activity, bgColor: 'bg-red-500', hoverColor: 'bg-red-600' }      // 활동
]

interface Program {
  id: string
  title: string
  description: string
  categoryTitle: string
  categoryId: string
  order: number
}

const ProgramGrid = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programData = await getAllProgramsFlattened()
        setPrograms(programData)
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="w-full max-w-6xl mx-auto">
            <Marquee pauseOnHover className="[--duration:30s]">
              {[...Array(8)].map((_, index) => (
                <div 
                  key={index} 
                  className="w-80 h-24 bg-white border border-gray-200 rounded-lg mx-3 animate-pulse"
                ></div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            전문 치료 프로그램
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            개별적 특성과 발달 단계에 맞춘 체계적이고 전문적인 치료 프로그램을 제공합니다
          </p>
        </motion.div>

        {/* 프로그램 마키 레이아웃 */}
        <div className="relative w-full px-4 space-y-6 overflow-hidden">
          {/* 그라데이션 마스크 - 왼쪽과 오른쪽 가장자리 */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          {/* 첫 번째 마키 - 정방향 */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Marquee pauseOnHover className="[--duration:60s]">
            {programs.slice(0, Math.ceil(programs.length / 2)).map((program, index) => {
              const iconData = programIconsAndColors[index % programIconsAndColors.length]
              const IconComponent = iconData.icon
            
              // 설명 텍스트를 더 짧게 제한
              const truncatedDescription = program.description.length > 80 
                ? program.description.substring(0, 80) + '...'
                : program.description
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1
                  }}
                  viewport={{ once: true }}
                  className="group cursor-pointer mx-3"
                  style={{ flexShrink: 0 }}
                >
                  {/* 메인 카드 */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      y: -4
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: "easeOut"
                    }}
                    className="bg-white border border-gray-200 rounded-lg p-6 w-80 h-24 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 select-none"
                  >
                    {/* 왼쪽 아이콘 영역 */}
                    <div className={`flex-shrink-0 w-12 h-12 ${iconData.bgColor} group-hover:${iconData.hoverColor} rounded-lg flex items-center justify-center transition-colors duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* 오른쪽 텍스트 영역 */}
                    <div className="flex-1 min-w-0">
                      {/* 프로그램 제목 */}
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 mb-1 truncate">
                        {program.title}
                      </h3>
                      
                      {/* 프로그램 설명 */}
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-1">
                        {truncatedDescription}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
            </Marquee>
          </motion.div>
          
          {/* 두 번째 마키 - 역방향 */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Marquee reverse pauseOnHover className="[--duration:70s]">
            {programs.slice(Math.ceil(programs.length / 2)).map((program, index) => {
              const iconData = programIconsAndColors[(index + Math.ceil(programs.length / 2)) % programIconsAndColors.length]
              const IconComponent = iconData.icon
            
              // 설명 텍스트를 더 짧게 제한
              const truncatedDescription = program.description.length > 80 
                ? program.description.substring(0, 80) + '...'
                : program.description
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1
                  }}
                  viewport={{ once: true }}
                  className="group cursor-pointer mx-3"
                  style={{ flexShrink: 0 }}
                >
                  {/* 메인 카드 */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      y: -4
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: "easeOut"
                    }}
                    className="bg-white border border-gray-200 rounded-lg p-6 w-80 h-24 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 select-none"
                  >
                    {/* 왼쪽 아이콘 영역 */}
                    <div className={`flex-shrink-0 w-12 h-12 ${iconData.bgColor} group-hover:${iconData.hoverColor} rounded-lg flex items-center justify-center transition-colors duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* 오른쪽 텍스트 영역 */}
                    <div className="flex-1 min-w-0">
                      {/* 프로그램 제목 */}
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 mb-1 truncate">
                        {program.title}
                      </h3>
                      
                      {/* 프로그램 설명 */}
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-1">
                        {truncatedDescription}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
            </Marquee>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProgramGrid
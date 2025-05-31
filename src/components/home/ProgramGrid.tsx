'use client'

import { motion } from 'framer-motion'
import { Users, Heart, Brain, MessageCircle, Book, TestTube } from 'lucide-react'

// 6개의 주요 프로그램 + 둥글둥글한 오목한 모양
const programs = [
  {
    id: 'child-counseling',
    title: '아동상담',
    description: '놀이를 통해 아이와 소통하는 아동상담',
    icon: Users,
    bgColor: 'bg-cyan-600',
    shadowColor: 'bg-cyan-300',
    // 아동상담 - 둥근 오목 모양 (좌상단)
    borderRadius: '60% 40% 30% 70% / 68% 25% 75% 32%',
    shadowBorderRadius: '65% 35% 25% 75% / 70% 30% 70% 35%',
    rotation: '3deg'
  },
  {
    id: 'teen-learning',
    title: '청소년 학습상담',
    description: '청소년 마음을 알아주는 학습 문제를 해결하는 학습상담',
    icon: Book,
    bgColor: 'bg-lime-600', 
    shadowColor: 'bg-lime-300',
    // 청소년 학습상담 - 둥근 타원형 (우하단 살짝 오목)
    borderRadius: '45% 55% 70% 30% / 55% 45% 55% 45%',
    shadowBorderRadius: '50% 50% 75% 25% / 60% 40% 60% 40%',
    rotation: '-2deg'
  },
  {
    id: 'teen-counseling',
    title: '청소년 심리상담',
    description: '청소년 마음을 알아주는 심리 문제를 해결하는 심리상담',
    icon: Heart,
    bgColor: 'bg-pink-600',
    shadowColor: 'bg-pink-300',
    // 청소년 심리상담 - 하트 같은 둥근 모양
    borderRadius: '54% 46% 38% 62% / 49% 60% 40% 51%',
    shadowBorderRadius: '59% 41% 33% 67% / 54% 65% 35% 46%',
    rotation: '1deg'
  },
  {
    id: 'adult-counseling',
    title: '성인상담',
    description: '힘이 되어주고 어려움을 풀어가는 상담',
    icon: Brain,
    bgColor: 'bg-yellow-600',
    shadowColor: 'bg-yellow-300',
    // 성인상담 - 좌측이 둥글게 오목한 모양
    borderRadius: '35% 65% 70% 30% / 55% 40% 60% 45%',
    shadowBorderRadius: '40% 60% 75% 25% / 60% 35% 65% 40%',
    rotation: '-4deg'
  },
  {
    id: 'psychological-test',
    title: '심리검사',
    description: '전문 심리연구원이 제공하는 다면적인 심리검사 및 해석',
    icon: TestTube,
    bgColor: 'bg-blue-600',
    shadowColor: 'bg-blue-300',
    // 심리검사 - 구름 같은 둥근 복잡한 모양
    borderRadius: '39% 61% 70% 30% / 56% 23% 77% 44%',
    shadowBorderRadius: '44% 56% 75% 25% / 61% 18% 82% 39%',
    rotation: '2deg'
  },
  {
    id: 'counseling-review',
    title: '상담후기',
    description: '마음의 공식의 생생한 후기를 확인하실 수 있습니다.',
    icon: MessageCircle,
    bgColor: 'bg-emerald-600',
    shadowColor: 'bg-emerald-300',
    // 상담후기 - 물방울 같은 부드러운 모양
    borderRadius: '58% 42% 28% 72% / 35% 66% 34% 65%',
    shadowBorderRadius: '63% 37% 23% 77% / 40% 71% 29% 60%',
    rotation: '-1deg'
  }
]

const ProgramGrid = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {programs.map((program, index) => {
            const IconComponent = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                style={{ height: '280px' }}
              >
                {/* 뒷배경 그림자 레이어 - 둥글둥글한 모양 */}
                <div 
                  className={`absolute inset-0 ${program.shadowColor} opacity-35 transform translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-300 ease-out`}
                  style={{
                    borderRadius: program.shadowBorderRadius,
                    transform: `rotate(${program.rotation}) translate(12px, 12px) scale(1.05)`,
                  }}
                ></div>

                {/* 중간 레이어 - 둥글둥글한 모양 */}
                <div 
                  className={`absolute inset-0 ${program.shadowColor} opacity-25 transform translate-x-1.5 translate-y-1.5 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 ease-out`}
                  style={{
                    borderRadius: program.shadowBorderRadius,
                    transform: `rotate(calc(${program.rotation} * 0.5)) translate(6px, 6px) scale(1.02)`,
                  }}
                ></div>

                {/* 메인 카드 - 둥글둥글한 오목한 모양 */}
                <motion.div
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: parseFloat(program.rotation) * 1.5,
                    y: -8
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className={`relative ${program.bgColor} text-white p-8 h-full flex flex-col justify-center items-center text-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  style={{
                    borderRadius: program.borderRadius,
                    transform: `rotate(${program.rotation})`,
                  }}
                >
                  {/* 추가적인 부드러운 내부 효과 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
                    style={{
                      borderRadius: program.borderRadius,
                    }}
                  ></div>

                  {/* 제목 */}
                  <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight z-10 relative text-white">
                    {program.title}
                  </h3>
                  
                  {/* 설명 */}
                  <p className="text-sm md:text-base opacity-90 leading-relaxed mb-8 px-2 z-10 relative text-white">
                    {program.description}
                  </p>

                  {/* 하단 화살표 버튼 */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <svg 
                        className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 장식용 원들 - 부드러운 블러 효과 */}
                  <div 
                    className="absolute w-6 h-6 bg-white/10 rounded-full blur-sm"
                    style={{
                      top: `${15 + (index * 5)}%`,
                      right: `${10 + (index % 3) * 12}%`
                    }}
                  ></div>
                  <div 
                    className="absolute w-4 h-4 bg-white/15 rounded-full blur-sm"
                    style={{
                      top: `${25 + (index * 3)}%`,
                      right: `${20 + (index % 2) * 18}%`
                    }}
                  ></div>
                  <div 
                    className="absolute w-3 h-3 bg-white/8 rounded-full blur-sm"
                    style={{
                      bottom: `${15 + (index * 4)}%`,
                      left: `${8 + (index % 4) * 10}%`
                    }}
                  ></div>
                  <div 
                    className="absolute w-8 h-8 bg-white/5 rounded-full blur-md"
                    style={{
                      bottom: `${30 + (index * 2)}%`,
                      left: `${15 + (index % 3) * 15}%`
                    }}
                  ></div>

                  {/* 중앙 하이라이트 효과 */}
                  <div 
                    className="absolute top-6 left-6 w-20 h-20 bg-white/8 blur-2xl"
                    style={{
                      borderRadius: '60% 40% 30% 70%',
                    }}
                  ></div>

                  {/* 하단 그림자 효과 */}
                  <div 
                    className="absolute bottom-4 right-4 w-16 h-16 bg-black/10 blur-xl"
                    style={{
                      borderRadius: '40% 60% 70% 30%',
                    }}
                  ></div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProgramGrid
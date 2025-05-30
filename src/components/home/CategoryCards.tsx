'use client'

import { motion } from 'framer-motion'
import { Users, Heart, UserCheck, Building } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    id: 'child-teen',
    title: '아동/청소년 상담',
    description: '아동이 발달 단계에서 겪게 되는 어려움을 전문적인 치료 프로그램을 통해 돕는 프로그램 입니다.',
    icon: Users,
    link: '/programs?category=child-teen',
    bgColor: 'bg-blue-50',
    headerColor: 'bg-mindstory-blue',
    textColor: 'text-mindstory-blue'
  },
  {
    id: 'adult-family',
    title: '성인/부부/가족상담',
    description: '가족내 각 구성원의 역할과 역동을 살펴 봄으로써 가족 구성원 모두 만족감을 누릴 수 있도록 돕는 프로그램입니다.',
    icon: Heart,
    link: '/programs?category=adult-family',
    bgColor: 'bg-green-50',
    headerColor: 'bg-mindstory-green',
    textColor: 'text-mindstory-green'
  },
  {
    id: 'elderly',
    title: '노인개인/집단상담',
    description: '노년기의 삶을 평화롭고 건강하게 살아갈 수 있도록 다양한 방법으로 돕습니다.',
    icon: UserCheck,
    link: '/programs?category=elderly',
    bgColor: 'bg-purple-50',
    headerColor: 'bg-mindstory-purple',
    textColor: 'text-mindstory-purple'
  },
  {
    id: 'group-education',
    title: '집단/교육/기업상담',
    description: '사회성 및 자존감 향상에 도움을 주는 심리치료적 성격을 지닌 집단활동 과정입니다.',
    icon: Building,
    link: '/programs?category=group-education',
    bgColor: 'bg-orange-50',
    headerColor: 'bg-mindstory-orange',
    textColor: 'text-mindstory-orange'
  }
]

const CategoryCards = () => {
  return (
    <section className="py-16 bg-mindstory-gray-light">
      <div className="container-custom mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={category.link}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                    {/* 헤더 - 마인드스토리 스타일 아이콘 영역 */}
                    <div className={`${category.headerColor} p-6 text-center relative`}>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>
                    
                    {/* 콘텐츠 영역 */}
                    <div className="p-6">
                      <p className="text-mindstory-gray-text leading-relaxed text-sm mb-4">
                        {category.description}
                      </p>
                      
                      <div className={`flex items-center ${category.textColor} font-medium group-hover:text-opacity-80 transition-colors`}>
                        <span className="text-sm">DETAIL VIEW &gt;&gt;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryCards

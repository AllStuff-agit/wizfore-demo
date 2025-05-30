'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Brain, Users, Gamepad2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const programs = [
  {
    id: 'language-therapy',
    title: '언어치료',
    description: '언어발달, 발음교정, 의사소통 능력 향상',
    icon: MessageCircle,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    id: 'cognitive-therapy',
    title: '인지치료',
    description: '주의집중력, 기억력, 문제해결능력 향상',
    icon: Brain,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600'
  },
  {
    id: 'counseling',
    title: '심리상담',
    description: '아동·청소년 심리상담, 가족상담',
    icon: Users,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    id: 'special-sports',
    title: '특수체육',
    description: '신체발달, 협응능력, 사회성 향상',
    icon: Gamepad2,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600'
  }
]

const ProgramsPreview = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            전문 프로그램
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            아동의 개별적 특성과 발달 단계에 맞춘 <br />
            체계적이고 전문적인 치료 프로그램을 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => {
            const IconComponent = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-12 h-12 ${program.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {program.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>
                
                <div className="flex items-center text-wizfore-600 font-medium group-hover:text-wizfore-700">
                  <span>자세히 보기</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center bg-wizfore-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-wizfore-700 transition-all duration-300 group"
          >
            <span>지금 신청하기</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProgramsPreview

'use client'

import { motion } from 'framer-motion'
import { User, GraduationCap, Briefcase, Award } from 'lucide-react'
import type { AdvisorInfo } from '@/types'

interface AdvisorsOverviewSectionProps {
  advisors: AdvisorInfo[]
  aboutMessage?: {
    title: string
    messages: string[]
  }
  loading?: boolean
}

const AdvisorsOverviewSection: React.FC<AdvisorsOverviewSectionProps> = ({ 
  advisors, 
  aboutMessage, 
  loading = false 
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-wizfore-text-primary mb-6">
            {aboutMessage?.title || '전문 자문위원단'}
          </h2>
          <div className="text-lg text-wizfore-text-secondary leading-relaxed mb-12">
            {aboutMessage?.messages.map((message, index) => (
              <p key={index} className={index > 0 ? 'mt-4' : ''}>
                {message}
              </p>
            )) || (
              <p>
                위즈포레 사회서비스센터는 다양한 분야의 전문가들로 구성된 자문위원단을 운영하고 있습니다. 
                각 분야의 전문성을 바탕으로 센터의 서비스 질 향상과 운영 개선에 도움을 주고 계십니다.
              </p>
            )}
          </div>

          {/* 전문 분야 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {loading ? (
              // 로딩 스켈레톤
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded mx-auto mb-3" />
                  <div className="h-8 bg-gray-200 rounded mb-1 w-8 mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
                </div>
              ))
            ) : (
              <>
                <motion.div
                  className="bg-blue-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <GraduationCap className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {advisors.filter(a => a.position.includes('교수')).length}
                  </div>
                  <p className="text-blue-700 text-sm font-medium">대학교수</p>
                </motion.div>

                <motion.div
                  className="bg-green-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Briefcase className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {advisors.filter(a => a.position.includes('원장') || a.position.includes('대표')).length}
                  </div>
                  <p className="text-green-700 text-sm font-medium">기관장</p>
                </motion.div>

                <motion.div
                  className="bg-purple-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <User className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {advisors.filter(a => a.position.includes('약사')).length}
                  </div>
                  <p className="text-purple-700 text-sm font-medium">의료진</p>
                </motion.div>

                <motion.div
                  className="bg-orange-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Award className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {advisors.filter(a => a.position.includes('경감')).length}
                  </div>
                  <p className="text-orange-700 text-sm font-medium">공공기관</p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AdvisorsOverviewSection
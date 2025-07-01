'use client'

import { motion } from 'framer-motion'
import { User, GraduationCap, Briefcase, Award } from 'lucide-react'
import type { AdvisorInfo } from '@/types'

interface AdvisorsListSectionProps {
  advisors: AdvisorInfo[]
  loading?: boolean
}

const AdvisorsListSection: React.FC<AdvisorsListSectionProps> = ({ advisors = [], loading = false }) => {
  // 자문위원 전문분야별 아이콘 결정
  const getAdvisorIcon = (position: string = '') => {
    if (position.includes('교수')) {
      return <GraduationCap className="w-8 h-8 text-wizfore-warm-brown" aria-label="교수" />
    } else if (position.includes('원장') || position.includes('대표')) {
      return <Briefcase className="w-8 h-8 text-wizfore-warm-brown" aria-label="기관장" />
    } else if (position.includes('경감')) {
      return <Award className="w-8 h-8 text-wizfore-warm-brown" aria-label="공무원" />
    } else {
      return <User className="w-8 h-8 text-wizfore-warm-brown" aria-label="전문가" />
    }
  }

  const getAdvisorBadgeColor = (position: string = '') => {
    if (position.includes('교수')) {
      return 'bg-blue-100 text-blue-700 border-blue-200'
    } else if (position.includes('원장') || position.includes('대표')) {
      return 'bg-green-100 text-green-700 border-green-200'
    } else if (position.includes('약사')) {
      return 'bg-purple-100 text-purple-700 border-purple-200'
    } else if (position.includes('경감')) {
      return 'bg-orange-100 text-orange-700 border-orange-200'
    } else {
      return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-wizfore-text-primary mb-4">
            자문위원 소개
          </h2>
          <p className="text-wizfore-text-secondary">
            총 {advisors.length}분의 전문가가 자문위원으로 활동하고 계십니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {loading ? (
            // 로딩 스켈레톤
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-200 p-6 text-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-gray-300 rounded mx-auto mb-2 w-20" />
                  <div className="h-4 bg-gray-300 rounded mx-auto w-16" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : advisors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-wizfore-text-secondary text-lg">자문위원 정보가 없습니다.</p>
            </div>
          ) : (
            advisors.map((advisor, index) => (
            <motion.div
              key={`${advisor.name}-${advisor.order || index}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* 카드 헤더 */}
              <div className="bg-gradient-to-r from-wizfore-warm-brown/10 to-wizfore-warm-brown/5 p-6 text-center">
                <div className="flex justify-center mb-4">
                  {getAdvisorIcon(advisor.position)}
                </div>
                <h3 className="text-xl font-bold text-wizfore-text-primary mb-2 truncate" title={advisor.name || '이름 없음'}>
                  {advisor.name || '이름 없음'}
                </h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm border truncate max-w-full ${getAdvisorBadgeColor(advisor.position)}`}>
                  {(advisor.position || '').includes('교수') ? '교수' :
                   (advisor.position || '').includes('원장') ? '원장' :
                   (advisor.position || '').includes('대표') ? '대표' :
                   (advisor.position || '').includes('약사') ? '약사' :
                   (advisor.position || '').includes('경감') ? '경감' : '전문가'}
                </div>
              </div>

              {/* 카드 본문 */}
              <div className="p-6">
                {/* 직책 */}
                {advisor.position && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Briefcase className="w-4 h-4 text-wizfore-warm-brown mr-2" aria-label="직책" />
                      <span className="text-sm font-medium text-wizfore-text-primary">현재 직책</span>
                    </div>
                    <p className="text-wizfore-text-secondary text-sm leading-relaxed pl-6 break-words">
                      {advisor.position}
                    </p>
                  </div>
                )}

                {/* 학력 */}
                {advisor.education && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-4 h-4 text-wizfore-warm-brown mr-2" aria-label="학력" />
                      <span className="text-sm font-medium text-wizfore-text-primary">학력</span>
                    </div>
                    <p className="text-wizfore-text-secondary text-sm leading-relaxed pl-6 break-words">
                      {advisor.education}
                    </p>
                  </div>
                )}

                {/* 주요 경력 */}
                {advisor.career && advisor.career.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="w-4 h-4 text-wizfore-warm-brown mr-2" aria-label="경력" />
                      <span className="text-sm font-medium text-wizfore-text-primary">주요 경력</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      {advisor.career.map((career, careerIndex) => (
                        <p key={careerIndex} className="text-wizfore-text-secondary text-sm leading-relaxed break-words">
                          • {career}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default AdvisorsListSection
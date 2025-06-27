'use client'

import { motion } from 'framer-motion'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import { User, GraduationCap, Briefcase, Award } from 'lucide-react'

export default function AdvisorsPage() {
  const { aboutInfo } = defaultSiteData
  const { advisors } = aboutInfo

  // 자문위원 전문분야별 아이콘 결정
  const getAdvisorIcon = (position: string) => {
    if (position.includes('교수')) {
      return <GraduationCap className="w-8 h-8 text-wizfore-warm-brown" />
    } else if (position.includes('원장') || position.includes('대표')) {
      return <Briefcase className="w-8 h-8 text-wizfore-warm-brown" />
    } else if (position.includes('경감')) {
      return <Award className="w-8 h-8 text-wizfore-warm-brown" />
    } else {
      return <User className="w-8 h-8 text-wizfore-warm-brown" />
    }
  }

  const getAdvisorBadgeColor = (position: string) => {
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
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/hero/defaultHero.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            자문위원
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            위즈포레의 전문성 향상을 위해 도움을 주시는 분들을 소개합니다
          </motion.p>
        </div>
      </section>

      {/* 개요 섹션 */}
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
              전문가 자문위원단
            </h2>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed">
              위즈포레 사회서비스센터는 다양한 분야의 전문가들로 구성된 자문위원단을 운영하고 있습니다. 
              각 분야의 전문성을 바탕으로 센터의 서비스 질 향상과 운영 개선에 도움을 주고 계십니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 자문위원 목록 섹션 */}
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
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.id}
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
                  <h3 className="text-xl font-bold text-wizfore-text-primary mb-2">
                    {advisor.name}
                  </h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm border ${getAdvisorBadgeColor(advisor.position)}`}>
                    {advisor.position.includes('교수') ? '교수' :
                     advisor.position.includes('원장') ? '원장' :
                     advisor.position.includes('대표') ? '대표' :
                     advisor.position.includes('약사') ? '약사' :
                     advisor.position.includes('경감') ? '경감' : '전문가'}
                  </div>
                </div>

                {/* 카드 본문 */}
                <div className="p-6">
                  {/* 직책 */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Briefcase className="w-4 h-4 text-wizfore-warm-brown mr-2" />
                      <span className="text-sm font-medium text-wizfore-text-primary">현재 직책</span>
                    </div>
                    <p className="text-wizfore-text-secondary text-sm leading-relaxed pl-6">
                      {advisor.position}
                    </p>
                  </div>

                  {/* 학력 */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-4 h-4 text-wizfore-warm-brown mr-2" />
                      <span className="text-sm font-medium text-wizfore-text-primary">학력</span>
                    </div>
                    <p className="text-wizfore-text-secondary text-sm leading-relaxed pl-6">
                      {advisor.education}
                    </p>
                  </div>

                  {/* 주요 경력 */}
                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="w-4 h-4 text-wizfore-warm-brown mr-2" />
                      <span className="text-sm font-medium text-wizfore-text-primary">주요 경력</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      {advisor.career.map((career, careerIndex) => (
                        <p key={careerIndex} className="text-wizfore-text-secondary text-sm leading-relaxed">
                          • {career}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 전문 분야 통계 섹션 */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-4">
              전문 분야
            </h2>
            <p className="text-wizfore-text-secondary">
              다양한 분야의 전문가들이 자문위원으로 참여하고 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* 자문위원 역할 섹션 */}
      <section className="py-16 bg-wizfore-warm-brown/5">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-wizfore-text-primary mb-4">
                자문위원의 역할
              </h2>
              <p className="text-wizfore-text-secondary">
                전문적이고 체계적인 서비스 제공을 위한 다양한 자문 활동
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-wizfore-text-primary mb-4">
                  전문성 향상 지원
                </h3>
                <ul className="space-y-3 text-wizfore-text-secondary">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-wizfore-warm-brown rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    치료 및 상담 프로그램의 전문성 검토
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-wizfore-warm-brown rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    직원 교육 및 연수 프로그램 자문
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-wizfore-warm-brown rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    최신 치료 기법 및 방법론 공유
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-wizfore-text-primary mb-4">
                  운영 개선 자문
                </h3>
                <ul className="space-y-3 text-wizfore-text-secondary">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-wizfore-warm-brown rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    센터 운영 방향성 및 정책 자문
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-wizfore-warm-brown rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    서비스 품질 향상을 위한 제안
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-wizfore-warm-brown rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    외부 기관과의 협력 방안 모색
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
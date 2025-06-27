'use client'

import { motion } from 'framer-motion'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import { Calendar, Award, Users, Building } from 'lucide-react'

export default function HistoryPage() {
  const { aboutInfo } = defaultSiteData
  const { milestones } = aboutInfo

  // 마일스톤을 연도별로 그룹화
  const groupedMilestones = milestones.reduce((acc, milestone) => {
    const year = milestone.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(milestone)
    return acc
  }, {} as Record<string, typeof milestones>)

  // 연도를 내림차순으로 정렬
  const years = Object.keys(groupedMilestones).sort((a, b) => parseInt(b) - parseInt(a))

  // 이벤트 카테고리별 아이콘 및 색상 결정
  const getEventIcon = (event: string) => {
    if (event.includes('설립') || event.includes('등록') || event.includes('지정')) {
      return <Building className="w-5 h-5" />
    } else if (event.includes('수상') || event.includes('표창')) {
      return <Award className="w-5 h-5" />
    } else if (event.includes('업무협약') || event.includes('산학협력')) {
      return <Users className="w-5 h-5" />
    } else {
      return <Calendar className="w-5 h-5" />
    }
  }

  const getEventColor = (event: string) => {
    if (event.includes('설립') || event.includes('등록') || event.includes('지정')) {
      return 'bg-blue-100 text-blue-700 border-blue-200'
    } else if (event.includes('수상') || event.includes('표창')) {
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    } else if (event.includes('업무협약') || event.includes('산학협력')) {
      return 'bg-green-100 text-green-700 border-green-200'
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
            센터 발자취
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            위즈포레의 성장과 발전 과정을 시간순으로 소개합니다
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
              2016년부터 현재까지의 여정
            </h2>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed">
              위즈포레 사회서비스센터는 2016년 설립 이후 지속적인 성장을 통해 
              다양한 사회서비스를 제공하며 지역사회에 기여하고 있습니다. 
              주요 서비스 확장, 협력 기관과의 업무협약, 그리고 다양한 성과를 통해 
              전문성을 인정받아왔습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 타임라인 섹션 */}
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
              주요 연혁
            </h2>
            <p className="text-wizfore-text-secondary">
              연도별 주요 사건과 성과들을 확인해보세요
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {years.map((year, yearIndex) => (
              <motion.div
                key={year}
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: yearIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* 연도 헤더 */}
                <div className="flex items-center mb-6">
                  <div className="bg-wizfore-warm-brown text-white px-6 py-3 rounded-lg font-bold text-xl">
                    {year}년
                  </div>
                  <div className="flex-1 h-px bg-gray-300 ml-4"></div>
                </div>

                {/* 해당 연도의 이벤트들 */}
                <div className="space-y-4 ml-8">
                  {groupedMilestones[year]
                    .sort((a, b) => parseInt(a.month) - parseInt(b.month))
                    .map((milestone, index) => (
                      <motion.div
                        key={`${milestone.year}-${milestone.month}-${index}`}
                        className="relative flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {/* 타임라인 점 */}
                        <div className="flex-shrink-0 w-4 h-4 bg-wizfore-warm-brown rounded-full mr-4 mt-2"></div>
                        
                        {/* 이벤트 카드 */}
                        <div className="flex-1 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="text-sm font-medium text-wizfore-text-brand mr-3">
                                  {milestone.month}월
                                </span>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getEventColor(milestone.event)}`}>
                                  {getEventIcon(milestone.event)}
                                  <span className="ml-1">
                                    {milestone.event.includes('업무협약') || milestone.event.includes('산학협력') ? '협력' :
                                     milestone.event.includes('수상') || milestone.event.includes('표창') ? '수상' :
                                     milestone.event.includes('설립') || milestone.event.includes('등록') || milestone.event.includes('지정') ? '설립/지정' : '기타'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-wizfore-text-primary font-medium leading-relaxed">
                                {milestone.event}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
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
              성장 통계
            </h2>
            <p className="text-wizfore-text-secondary">
              지난 9년간의 주요 성과를 숫자로 확인해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div
              className="bg-blue-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {milestones.filter(m => m.event.includes('설립') || m.event.includes('등록') || m.event.includes('지정')).length}
              </div>
              <p className="text-blue-700 font-medium">서비스 설립/지정</p>
            </motion.div>

            <motion.div
              className="bg-green-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">
                {milestones.filter(m => m.event.includes('업무협약') || m.event.includes('산학협력')).length}
              </div>
              <p className="text-green-700 font-medium">협력 관계 구축</p>
            </motion.div>

            <motion.div
              className="bg-yellow-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {milestones.filter(m => m.event.includes('수상') || m.event.includes('표창')).length}
              </div>
              <p className="text-yellow-700 font-medium">수상 및 표창</p>
            </motion.div>

            <motion.div
              className="bg-purple-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-600 mb-2">9</div>
              <p className="text-purple-700 font-medium">운영 연수</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 미래 비전 섹션 */}
      <section className="py-16 bg-wizfore-warm-brown/5">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-6">
              앞으로의 비전
            </h2>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed mb-8">
              위즈포레는 앞으로도 지속적인 발전을 통해 더 많은 분들에게 
              전문적이고 따뜻한 사회서비스를 제공하겠습니다. 
              새로운 프로그램 개발, 시설 확충, 그리고 더 많은 협력 기관과의 
              파트너십을 통해 지역사회의 든든한 동반자가 되겠습니다.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-wizfore-warm-brown text-white rounded-lg font-medium">
              <Calendar className="w-5 h-5 mr-2" />
              계속되는 성장 이야기
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
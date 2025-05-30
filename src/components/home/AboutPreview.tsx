'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Award, Heart } from 'lucide-react'
import Link from 'next/link'

const milestones = [
  { year: '2020', event: '위즈포레사회서비스센터 설립' },
  { year: '2020', event: '발달재활서비스 제공기관 지정' },
  { year: '2021', event: '심리상담 프로그램 확장' },
  { year: '2024', event: '누적 치료 횟수 10,000회 달성' }
]

const AboutPreview = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 센터 소개 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              위즈포레와 함께하는<br />
              <span className="text-wizfore-600">특별한 성장</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              2020년 설립된 위즈포레 사회서비스센터는 아동의 건강한 발달을 위해 
              전문적이고 체계적인 치료와 상담 서비스를 제공하고 있습니다. 
              각 분야의 전문가들과 함께 아이들의 밝은 미래를 만들어갑니다.
            </p>

            {/* 핵심 가치 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-wizfore-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="text-wizfore-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">전문성</h3>
                <p className="text-sm text-gray-600">각 분야 전문가들의 최선의 서비스</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-wizfore-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-wizfore-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">신뢰</h3>
                <p className="text-sm text-gray-600">내담자와의 신뢰 기반 진정한 변화</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-wizfore-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="text-wizfore-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">성장</h3>
                <p className="text-sm text-gray-600">지속적인 발전으로 더 나은 서비스</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center bg-wizfore-600 text-white px-6 py-3 rounded-full font-medium hover:bg-wizfore-700 transition-all duration-300 group"
              >
                <span>센터 자세히 보기</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/location"
                className="inline-flex items-center border-2 border-wizfore-600 text-wizfore-600 px-6 py-3 rounded-full font-medium hover:bg-wizfore-600 hover:text-white transition-all duration-300 group"
              >
                <MapPin size={18} className="mr-2" />
                <span>오시는 길</span>
              </Link>
            </div>
          </motion.div>

          {/* 오른쪽: 연혁 타임라인 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Calendar className="text-wizfore-600 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-900">센터 연혁</h3>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-wizfore-100 rounded-full flex items-center justify-center">
                    <span className="text-wizfore-600 font-bold text-sm">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wizfore-600 mb-1">
                      {milestone.year}년
                    </p>
                    <p className="text-gray-900 font-medium">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 통계 */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-wizfore-600">5+</div>
                <div className="text-sm text-gray-600">운영 연수</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wizfore-600">1,000+</div>
                <div className="text-sm text-gray-600">누적 치료 횟수</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview

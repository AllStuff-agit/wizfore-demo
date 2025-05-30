'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const experts = [
  {
    id: 'director',
    name: '홍길동',
    position: '원장 / 언어치료사',
    image: '/images/experts/director.jpg',
    introduction: '10년 이상의 언어치료 경력을 가진 전문가입니다.',
    education: ['OO대학교 OO학과 학사', 'OO대학교 OO학과 석사'],
    certificates: ['언어재활사 1급', '임상심리사 2급']
  },
  {
    id: 'therapist1',
    name: '김철수',
    position: '언어치료사',
    image: '/images/experts/therapist1.jpg',
    introduction: '언어발달 및 의사소통에 어려움이 있는 아동들을 위한 맞춤형 언어치료를 제공합니다.',
    education: ['OO대학교 언어치료학과 학사'],
    certificates: ['언어재활사 2급']
  },
  {
    id: 'therapist2',
    name: '이영희',
    position: '인지치료사',
    image: '/images/experts/therapist2.jpg',
    introduction: '주의력과 인지능력 향상을 위한 전문적인 치료를 제공합니다.',
    education: ['OO대학교 특수교육학과 학사'],
    certificates: ['인지학습치료사 1급']
  }
]

const ExpertsHighlight = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            전문가 팀
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            풍부한 경험과 전문성을 갖춘 치료사들이<br />
            최선의 치료 서비스를 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* 프로필 이미지 */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="h-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users size={48} className="text-gray-500" />
                  </div>
                </div>
              </div>

              {/* 전문가 정보 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {expert.name}
                </h3>
                <p className="text-wizfore-600 font-medium mb-3">
                  {expert.position}
                </p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {expert.introduction}
                </p>

                {/* 자격증 */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Award size={16} className="text-wizfore-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">주요 자격</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {expert.certificates.map((cert, certIndex) => (
                      <span
                        key={certIndex}
                        className="text-xs bg-wizfore-50 text-wizfore-700 px-2 py-1 rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 학력 */}
                <div className="text-xs text-gray-500">
                  {expert.education.map((edu, eduIndex) => (
                    <div key={eduIndex}>{edu}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/team"
            className="inline-flex items-center border-2 border-wizfore-600 text-wizfore-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-wizfore-600 hover:text-white transition-all duration-300 group"
          >
            <span>전문가 전체 보기</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ExpertsHighlight

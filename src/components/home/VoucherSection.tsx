'use client'

import { motion } from 'framer-motion'
import { Gift, FileText, Users, Heart, Building2, Home } from 'lucide-react'

const voucherPrograms = [
  {
    id: 1,
    title: '전국민 마음건강 투자사업 서비스',
    duration: '1년에 8회 지원',
    requirements: '정신과 의사의 소견서 및 일반건강검진 결과통보서 등',
    eligibility: '자격 기준 없음',
    services: '아동 청소년 및 성인 심리상담',
    price: '1회당 1급 유형은 8만원, 2급 유형은 7만원',
    copayment: '1급: 가형 0원~라형 192,000원 / 2급: 가형 0원~라형 168,000원',
    icon: Gift,
    bgColor: 'bg-blue-50',
    borderColor: 'border-mindstory-blue',
    iconColor: 'text-mindstory-blue'
  },
  {
    id: 2,
    title: '우리아이 심리지원 서비스',
    duration: '1년+1년 연장 가능',
    requirements: '정신과 의사 및 학교장, 임상심리사 소견서',
    eligibility: '중위소득 140% 이하, 만 18세 이하',
    services: '아동 및 청소년 심리상담, 놀이치료, 미술치료, 언어치료, 인지치료, 학습치료, 독서치료, 집중력훈련 등',
    price: '1등급: 정부지원 162,000원+자부담 88,000원',
    copayment: '등급별 상이 (1등급~5등급)',
    icon: Users,
    bgColor: 'bg-green-50',
    borderColor: 'border-mindstory-green',
    iconColor: 'text-mindstory-green'
  },
  {
    id: 3,
    title: '아동 비전형성 서비스',
    duration: '1년 (연장 없음)',
    requirements: '제출서류 없음',
    eligibility: '중위소득 120% 이하, 만 7세~15세',
    services: '또래 친구들과 함께 하는 사회성 및 리더쉽 향상 훈련',
    price: '1등급: 정부지원 126,000원+자부담 14,000원',
    copayment: '등급별 상이 (1등급~3등급)',
    icon: Heart,
    bgColor: 'bg-purple-50',
    borderColor: 'border-mindstory-purple',
    iconColor: 'text-mindstory-purple'
  },
  {
    id: 4,
    title: '정신건강토탈케어',
    duration: '1년+4년 연장가능',
    requirements: '정신과 의사의 소견서',
    eligibility: '중위소득 120% 이하, 만 19세 이상',
    services: '전문가와 1:1 심리상담, 일상생활 코칭, 위기상황개입 및 증상관리',
    price: '정부지원 180,000원+자부담 20,000원',
    copayment: '월 자부담 20,000원',
    icon: Building2,
    bgColor: 'bg-orange-50',
    borderColor: 'border-mindstory-orange',
    iconColor: 'text-mindstory-orange'
  },
  {
    id: 5,
    title: '발달재활서비스',
    duration: '신청한 날부터 만 18세까지',
    requirements: '전문의의 발달재활서비스 의뢰서 및 검사자료',
    eligibility: '만 18세 미만 장애아동, 기준중위소득 180% 이하',
    services: '놀이재활, 심리재활, 언어재활, 인지재활, 미술심리재활, 행동재활, 감각발달재활 등',
    price: '정부지원 140,000~250,000원',
    copayment: '자부담 0원~80,000원',
    icon: FileText,
    bgColor: 'bg-teal-50',
    borderColor: 'border-mindstory-teal',
    iconColor: 'text-mindstory-teal'
  },
  {
    id: 6,
    title: '우리가족 통합 심리지원 서비스',
    duration: '1년 (연장없음)',
    requirements: '가족 유형별 증빙서류, 추천서, 정신건강 관련 의사 진단서',
    eligibility: '24세 이하 아동·청소년이 포함된 가정 (소득기준 없음)',
    services: '가족 통합 심리상담 및 치료',
    price: '1등급: 정부지원 162,000원+자부담 88,000원',
    copayment: '등급별 상이 (1등급~5등급)',
    icon: Home,
    bgColor: 'bg-pink-50',
    borderColor: 'border-mindstory-pink',
    iconColor: 'text-mindstory-pink'
  }
]

const VoucherSection = () => {
  return (
    <section className="py-16 bg-light-peach">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-mindstory-gray-text mb-6">
            "바우처 이용 안내"
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
            <p>
              위즈포레 사회서비스센터에서는
              <strong className="text-mindstory-lime"> 바우처 제도</strong>를 통해
              <strong className="text-mindstory-lime"> 부담없이 전문가의 상담</strong>을 받으실 수 있습니다. 
              아동뿐만 아니라 성인도 바우처를 이용하여
              <strong className="text-mindstory-lime"> 최장 5년까지 상담</strong>을 받으실 수 있으니 
              미리미리 준비하셔서 편안하게 심리 상담을 받아보세요.
            </p>
            
            <p className="text-base text-gray-600">
              일년에 한 두 번 정도 비 정기적으로 주민센터에서 접수를 받고, 각 바우처마다 대상이나 준비해야 할 서류가 상이합니다.
            </p>
            
            <p className="text-base text-gray-600">
              센터에 문의 주시면 자세한 설명과 접수 방법 안내를 받으실 수 있습니다.
              <strong className="text-mindstory-lime"> 더 다양한 바우처로 확대해 나갈 예정</strong>입니다.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voucherPrograms.map((program, index) => {
            const IconComponent = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${program.bgColor} border-2 ${program.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                {/* 헤더 */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-mindstory-lime rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {program.id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-mindstory-gray-text text-lg leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ({program.duration})
                    </p>
                  </div>
                  <IconComponent size={24} className={program.iconColor} />
                </div>

                {/* 상세 정보 */}
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-mindstory-gray-text mb-1">제출 서류:</h4>
                    <p className="text-gray-600">{program.requirements}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-mindstory-gray-text mb-1">자격 기준:</h4>
                    <p className="text-gray-600">{program.eligibility}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-mindstory-gray-text mb-1">서비스 내용:</h4>
                    <p className="text-gray-600">{program.services}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-mindstory-gray-text mb-1">서비스 가격:</h4>
                    <p className="text-gray-600">{program.price}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-mindstory-gray-text mb-1">본인부담금:</h4>
                    <p className="text-gray-600">{program.copayment}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 문의 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white rounded-xl p-8 shadow-md"
        >
          <h3 className="text-2xl font-bold text-mindstory-gray-text mb-4">
            바우처 관련 문의
          </h3>
          <p className="text-gray-600 mb-6">
            각 바우처별 자세한 정보와 신청 방법에 대해서는 센터로 직접 문의해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:051-123-4567"
              className="inline-flex items-center justify-center bg-mindstory-lime text-white px-6 py-3 rounded-full font-semibold hover:bg-mindstory-lime-dark transition-colors"
            >
              📞 051-123-4567
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-mindstory-lime text-mindstory-lime px-6 py-3 rounded-full font-semibold hover:bg-mindstory-lime hover:text-white transition-all"
            >
              온라인 문의하기
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VoucherSection

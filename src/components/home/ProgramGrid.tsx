'use client'

import { motion } from 'framer-motion'
import { Users, Heart, Brain, MessageCircle, Book, Gamepad2, Target, Monitor, Palette, TestTube, UserPlus, Headphones } from 'lucide-react'

const programs = [
  {
    id: 'adult-counseling',
    title: '성인 심리상담',
    description: '우울증, 공황장애, 강박증, 대인관계, 직무스트레스, 가족관계, 자존감, 의사소통 등',
    icon: Users,
    bgColor: 'bg-blue-50',
    iconColor: 'text-mindstory-blue',
    borderColor: 'border-blue-100'
  },
  {
    id: 'teen-counseling',
    title: '청소년 심리상담',
    description: '학교부적응, 또래관계, 불안장애, 비행행동, 학습 및 진로문제, 학교폭력, 성문제 등',
    icon: Heart,
    bgColor: 'bg-green-50',
    iconColor: 'text-mindstory-green',
    borderColor: 'border-green-100'
  },
  {
    id: 'child-play-therapy',
    title: '아동 놀이치료',
    description: '분리불안, 등교거부, 애착문제, 틱, ADHD, 반항행동, 불안, 우울, 야뇨증, 유분증 등',
    icon: Gamepad2,
    bgColor: 'bg-purple-50',
    iconColor: 'text-mindstory-purple',
    borderColor: 'border-purple-100'
  },
  {
    id: 'language-therapy',
    title: '언어치료',
    description: '수용언어, 표현언어, 화용언어, 발음교정, 어휘력 및 문장구성, 성인조음치료 등',
    icon: MessageCircle,
    bgColor: 'bg-orange-50',
    iconColor: 'text-mindstory-orange',
    borderColor: 'border-orange-100'
  },
  {
    id: 'cognitive-therapy',
    title: '인지 학습치료',
    description: '읽기, 쓰기, 수학의 학습 부진, 난독증, ADHD의 학습능력 향상, 학습방법 습득 등',
    icon: Brain,
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-100'
  },
  {
    id: 'art-therapy',
    title: '미술치료',
    description: '우울증, 외상 후 스트레스 증후군, 불안, 적응상의 어려움을 경험하는 아동이나 청소년, 성인 등',
    icon: Palette,
    bgColor: 'bg-pink-50',
    iconColor: 'text-mindstory-pink',
    borderColor: 'border-pink-100'
  },
  {
    id: 'neurofeedback',
    title: '뇌파치료(주의집중력훈련)',
    description: '주의집중력 훈련, 불안감소, 정서안정, 숙면, 우울감소, 치매예방, 건강한 뇌 만들기 등',
    icon: Monitor,
    bgColor: 'bg-teal-50',
    iconColor: 'text-mindstory-teal',
    borderColor: 'border-teal-100'
  },
  {
    id: 'reading-therapy',
    title: '독서치료',
    description: '독서를 통해 유연하고 폭 넓게 사고하면서 성장하고 싶은 모든 사람.',
    icon: Book,
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    borderColor: 'border-yellow-100'
  },
  {
    id: 'social-training',
    title: '사회성훈련',
    description: '친구 사귀기, 감정 표현, 감정 이해, 의사소통, 숨은 의도 파악, 사회적 상황 이해, 정서조절 등',
    icon: UserPlus,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    borderColor: 'border-red-100'
  },
  {
    id: 'psychological-test',
    title: '심리검사',
    description: '종합심리검사, 진로탐색검사, 학습유형검사, 부모양육태도검사, 뇌파검사, 성격유형검사등 표준화된 심리검사',
    icon: TestTube,
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-100'
  },
  {
    id: 'pair-therapy',
    title: '아동 짝 치료',
    description: '사회성이 부족한 아동들을 위한 2:1의 짝치료. 의사소통, 자기주장, 규칙 지키기, 행동교정 등',
    icon: Target,
    bgColor: 'bg-lime-50',
    iconColor: 'text-lime-600',
    borderColor: 'border-lime-100'
  },
  {
    id: 'online-counseling',
    title: '비대면 상담',
    description: '전화상담, 영상통화상담, 화상상담(ZOOM), 카톡상담',
    icon: Headphones,
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    borderColor: 'border-gray-100'
  }
]

const ProgramGrid = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-mindstory-gray-text mb-4">
            전문 치료 프로그램
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            개별적 특성과 발달 단계에 맞춘 체계적이고 전문적인 치료 프로그램을 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const IconComponent = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className={`${program.bgColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border-2 ${program.borderColor} group cursor-pointer`}
              >
                {/* 아이콘 */}
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <IconComponent size={24} className={program.iconColor} />
                </div>
                
                {/* 제목 */}
                <h3 className="text-lg font-bold text-mindstory-gray-text mb-3 group-hover:text-opacity-80 transition-colors">
                  {program.title}
                </h3>
                
                {/* 설명 */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {program.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProgramGrid

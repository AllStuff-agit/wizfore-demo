'use client'

import { motion } from 'framer-motion'
import type { DirectorInfo } from '@/types'

interface DirectorProfileSectionProps {
  director: DirectorInfo
}

const DirectorProfileSection: React.FC<DirectorProfileSectionProps> = ({ director }) => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container-custom mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-16 items-start max-w-7xl mx-auto">
          {/* 프로필 이미지 영역 (40%) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* 장식적 프레임 */}
              <div className="absolute -inset-8 bg-gradient-to-br from-wizfore-coral-primary/20 to-wizfore-soft-pink/20 rounded-3xl transform rotate-3" />
              <div className="absolute -inset-4 bg-white rounded-2xl shadow-2xl transform -rotate-1" />
              
              {/* 프로필 이미지 */}
              <div className="relative w-full aspect-square bg-wizfore-light-beige rounded-xl overflow-hidden">
                <img 
                  src={director.imageUrl || '/images/director/defaultDirector.png'} 
                  alt={`${director.name} 센터장`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* 이름과 직책 */}
            <div className="mt-8 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-wizfore-text-primary mb-2 leading-tight">
                {director.name}
              </h3>
              <p className="text-xl md:text-2xl text-wizfore-coral-primary font-bold">
                {director.position}
              </p>
            </div>
          </motion.div>

          {/* 요약 정보 영역 (60%) */}
          <motion.div
            className="lg:col-span-3 space-y-12"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* 학력 */}
            <div>
              <h4 className="text-2xl font-bold text-wizfore-text-primary mb-6 border-b-2 border-wizfore-coral-primary pb-2">
                학력
              </h4>
              <div className="space-y-3">
                {director.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-wizfore-light-beige/30 transition-colors duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-wizfore-text-primary font-medium">{edu}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 주요 경력 */}
            <div>
              <h4 className="text-2xl font-bold text-wizfore-text-primary mb-6 border-b-2 border-wizfore-coral-primary pb-2">
                주요 경력
              </h4>
              <div className="space-y-3">
                {director.career.map((career, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-wizfore-light-beige/30 transition-colors duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-wizfore-text-primary font-medium">{career}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 위원회 활동 */}
            <div>
              <h4 className="text-2xl font-bold text-wizfore-text-primary mb-6 border-b-2 border-wizfore-coral-primary pb-2">
                위원회 활동
              </h4>
              <div className="space-y-3">
                {director.committees.map((committee, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg transition-colors duration-300 ${
                      committee.includes('현)') 
                        ? 'bg-wizfore-coral-primary/10 border border-wizfore-coral-primary/30' 
                        : 'bg-gray-50 hover:bg-wizfore-light-beige/30'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className={`font-medium ${
                      committee.includes('현)') 
                        ? 'text-wizfore-coral-primary' 
                        : 'text-wizfore-text-primary'
                    }`}>
                      {committee}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DirectorProfileSection
'use client'

import { motion } from 'framer-motion'

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-mindstory-gray-text mb-8">
              "내 이야기가 있는 곳"
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                유아부터 성인까지 함께 하는 종합사회서비스센터로 내담자에게 맞는 치료계획을 수립하여
                <strong className="text-mindstory-lime font-semibold"> 체계적이고 전문적인 치료를 제공합니다.</strong>
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                상담 및 심리치료는 전문가의 역량이 중요한 만큼,
                <strong className="text-mindstory-lime font-semibold"> 전문성과 진실성을 겸비한</strong> 각 영역의
                <strong className="text-mindstory-lime font-semibold"> 전문가 선생님이 함께</strong> 합니다.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-xl font-medium text-mindstory-lime"
              >
                그래서 진정한 회복과 성장의 길을 함께 만들어 갑니다.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 text-right"
            >
              <p className="text-lg font-semibold text-mindstory-gray-text mb-1">
                Kim Jin Ah
              </p>
              <p className="text-gray-600">
                위즈포레 사회서비스센터
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

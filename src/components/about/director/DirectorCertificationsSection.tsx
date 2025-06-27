'use client'

import { motion } from 'framer-motion'
import type { DirectorInfo } from '@/types'

interface DirectorCertificationsSectionProps {
  director: DirectorInfo
}

const DirectorCertificationsSection: React.FC<DirectorCertificationsSectionProps> = ({ director }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-wizfore-light-beige relative overflow-hidden">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-black text-wizfore-text-primary mb-4">전문 자격증</h3>
          <p className="text-lg text-wizfore-text-secondary">검증된 전문성과 지속적인 학습 성과</p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {director.certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-wizfore-coral-primary/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-wizfore-coral-primary to-wizfore-coral-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <h4 className="text-wizfore-text-primary font-bold text-center leading-tight">
                    {cert}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DirectorCertificationsSection
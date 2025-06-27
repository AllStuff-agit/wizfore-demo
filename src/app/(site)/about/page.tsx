'use client'

import { motion } from 'framer-motion'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import { Users, Target, Building, Award } from 'lucide-react'

export default function AboutPage() {
  const { siteInfo, aboutInfo } = defaultSiteData

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
            센터 개요
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {siteInfo.name}의 설립 목적과 핵심 가치를 소개합니다
          </motion.p>
        </div>
      </section>

      {/* 센터 소개 섹션 */}
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
              {siteInfo.name}
            </h2>
            <div className="text-sm text-wizfore-text-secondary mb-6">
              설립일: {siteInfo.establishedDate}
            </div>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed">
              {siteInfo.purpose}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
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
              핵심 가치
            </h2>
            <p className="text-wizfore-text-secondary">
              위즈포레가 추구하는 7가지 핵심 가치입니다
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries(siteInfo.coreValues).map(([key, value], index) => (
              <motion.div
                key={key}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-wizfore-warm-brown/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-6 h-6 text-wizfore-warm-brown" />
                </div>
                <p className="text-wizfore-text-secondary text-center leading-relaxed">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 조직 현황 섹션 */}
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
              조직 현황
            </h2>
            <p className="text-wizfore-text-secondary">
              전문 인력과 이용자 현황을 소개합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 직원 구성 */}
            <motion.div
              className="bg-gray-50 p-8 rounded-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-wizfore-warm-brown mr-3" />
                <h3 className="text-xl font-semibold text-wizfore-text-primary">
                  전문 인력 현황 (총 {siteInfo.organization.totalStaff}명)
                </h3>
              </div>
              <div className="space-y-3">
                {siteInfo.organization.staffComposition.map((staff, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-wizfore-text-secondary">{staff.category}</span>
                    <span className="font-semibold text-wizfore-text-primary">{staff.count}명</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 이용자 구성 */}
            <motion.div
              className="bg-gray-50 p-8 rounded-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Building className="w-6 h-6 text-wizfore-warm-brown mr-3" />
                <h3 className="text-xl font-semibold text-wizfore-text-primary">
                  이용자 현황 (총 {siteInfo.organization.totalClients}명)
                </h3>
              </div>
              <div className="space-y-3">
                {siteInfo.organization.clientComposition.map((client, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-wizfore-text-secondary">{client.category}</span>
                    <span className="font-semibold text-wizfore-text-primary">{client.count}명</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 주요 서비스 섹션 */}
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
              주요 서비스
            </h2>
            <p className="text-wizfore-text-secondary">
              위즈포레에서 제공하는 핵심 서비스들입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {siteInfo.mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-wizfore-warm-brown/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Award className="w-6 h-6 text-wizfore-warm-brown" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-wizfore-text-primary mb-2">
                      {service.title}
                    </h3>
                    <div className="text-sm text-wizfore-text-brand mb-3">
                      {service.startYear}년 시작
                    </div>
                  </div>
                </div>
                <p className="text-wizfore-text-secondary leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.details && (
                  <div className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-sm text-wizfore-text-secondary bg-gray-50 p-3 rounded">
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 시설 현황 섹션 */}
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
              시설 현황
            </h2>
            <p className="text-wizfore-text-secondary">
              전문적인 치료와 상담을 위한 다양한 시설을 갖추고 있습니다
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {aboutInfo.facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg text-center hover:bg-wizfore-warm-brown/10 transition-colors"
              >
                <Building className="w-8 h-8 text-wizfore-warm-brown mx-auto mb-2" />
                <span className="text-sm font-medium text-wizfore-text-primary">
                  {facility}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
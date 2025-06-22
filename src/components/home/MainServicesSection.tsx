'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Heart, Calendar, Phone, Mail } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { MainService } from '@/types'

const serviceIcons = {
  'developmental-intervention': Building2,
  'family-support': Users,
  'disability-day-afterschool': Heart,
  'sports-voucher': Calendar
}

const serviceColors = {
  'developmental-intervention': {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600'
  },
  'family-support': {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600'
  },
  'disability-day-afterschool': {
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600'
  },
  'sports-voucher': {
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600'
  }
}

const MainServicesSection = () => {
  const [mainServices, setMainServices] = useState<MainService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMainServices = async () => {
      try {
        const docRef = doc(db, 'siteInfo', 'main')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          setMainServices(data.mainServices || [])
        }
      } catch (error) {
        console.error('Error fetching main services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMainServices()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto px-4 text-center">
          <div className="animate-pulse">주요 사업 정보를 불러오는 중...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            "주요 사업 분야"
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
            <p>
              위즈포레 사회서비스센터는
              <strong className="text-mindstory-lime"> 다양한 전문 사업</strong>을 통해
              <strong className="text-mindstory-lime"> 종합적인 치료 서비스</strong>를 제공합니다. 
              아동부터 성인까지
              <strong className="text-mindstory-lime"> 생애주기별 맞춤 지원</strong>으로 
              함께 성장하는 지역사회를 만들어갑니다.
            </p>
            
            <p className="text-base text-gray-600">
              각 사업 분야별로 전문 자격을 갖춘 치료사들이 개별 맞춤형 서비스를 제공하고 있습니다.
            </p>
            
            <p className="text-base text-gray-600">
              자세한 상담 및 서비스 이용 문의는 센터로 연락 주시기 바랍니다.
              <strong className="text-mindstory-lime"> 지속적으로 사업 영역을 확대</strong>하고 있습니다.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {mainServices
            .sort((a, b) => a.order - b.order)
            .map((service, index) => {
              const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons] || Building2
              const colors = serviceColors[service.id as keyof typeof serviceColors] || serviceColors['developmental-intervention']
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${colors.bgColor} border-2 ${colors.borderColor} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}
                >
                  {/* 헤더 */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-mindstory-lime rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-xl leading-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ({service.startYear}년부터 운영)
                      </p>
                    </div>
                  </div>

                  {/* 설명 */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* 세부 내용 */}
                  {service.details && service.details.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm">세부 서비스:</h4>
                      <ul className="space-y-1">
                        {service.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-gray-600 text-sm flex items-start">
                            <span className="w-1.5 h-1.5 bg-mindstory-lime rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            서비스 이용 문의
          </h3>
          <p className="text-gray-600 mb-6">
            각 사업별 자세한 정보와 이용 방법에 대해서는 센터로 직접 문의해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:051-324-0940"
              className="inline-flex items-center justify-center bg-mindstory-lime text-white px-6 py-3 rounded-full font-semibold hover:bg-mindstory-lime-dark transition-colors"
            >
              <Phone size={18} className="mr-2" />
              051-324-0940
            </a>
            <a
              href="mailto:wizfore@daum.net"
              className="inline-flex items-center justify-center border-2 border-mindstory-lime text-mindstory-lime px-6 py-3 rounded-full font-semibold hover:bg-mindstory-lime hover:text-white transition-all"
            >
              <Mail size={18} className="mr-2" />
              이메일 문의
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MainServicesSection
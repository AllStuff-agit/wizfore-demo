'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAboutSectionData } from '@/lib/services/defaultDataService'
import type { DefaultSiteData } from '@/types'

interface AboutSectionData {
  siteName: string
  director: DefaultSiteData['aboutInfo']['director']
}

const AboutSection = () => {
  const [data, setData] = useState<AboutSectionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutData = await getAboutSectionData()
        setData(aboutData)
      } catch (error) {
        console.error('Error fetching AboutSection data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-300 rounded mx-auto w-80"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
              </div>
              <div className="h-16 bg-gray-200 rounded w-48 ml-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const title = data?.director?.aboutMessage?.title || "내 이야기가 있는 곳"
  const messages = data?.director?.aboutMessage?.messages || [
    "유아부터 성인까지 함께 하는 종합사회서비스센터로 내담자에게 맞는 치료계획을 수립하여 체계적이고 전문적인 치료를 제공합니다.",
    "상담 및 심리치료는 전문가의 역량이 중요한 만큼, 전문성과 진실성을 겸비한 각 영역의 전문가 선생님이 함께 합니다.",
    "그래서 진정한 회복과 성장의 길을 함께 만들어 갑니다."
  ]
  const directorName = data?.director?.name || "원장"
  const siteName = data?.siteName || "위즈포레 사회서비스센터"

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
              "{title}"
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1
                
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
                    viewport={{ once: true }}
                    className={isLastMessage ? "text-xl font-medium text-mindstory-lime" : ""}
                  >
                    {isLastMessage ? (
                      message
                    ) : (
                      <>
                        {message.split(' ').map((word, wordIndex) => {
                          const shouldHighlight = 
                            word.includes('체계적이고') || 
                            word.includes('전문적인') ||
                            word.includes('전문성과') ||
                            word.includes('진실성을') ||
                            word.includes('겸비한') ||
                            word.includes('전문가') ||
                            word.includes('선생님이') ||
                            word.includes('함께')
                          
                          return shouldHighlight ? (
                            <strong key={wordIndex} className="text-mindstory-lime font-semibold"> {word}</strong>
                          ) : (
                            <span key={wordIndex}> {word}</span>
                          )
                        })}
                      </>
                    )}
                  </motion.p>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 text-right"
            >
              <p className="text-lg font-semibold text-mindstory-gray-text mb-1">
                {directorName}
              </p>
              <p className="text-gray-600">
                {siteName}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

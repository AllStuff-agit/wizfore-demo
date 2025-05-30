'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const news = [
  {
    id: 'notice-001',
    title: '5월 휴무 안내',
    content: '5월 1일은 근로자의 날로 휴무입니다.',
    publishDate: '2025-04-25',
    featured: true,
    category: '공지사항'
  },
  {
    id: 'notice-002',
    title: '여름방학 특별 프로그램 안내',
    content: '위즈포레에서는 여름방학을 맞아 특별 프로그램을 운영합니다...',
    publishDate: '2025-04-20',
    featured: false,
    category: '프로그램'
  },
  {
    id: 'notice-003',
    title: '신규 전문가 영입 소식',
    content: '인지치료 분야의 새로운 전문가가 합류했습니다.',
    publishDate: '2025-04-15',
    featured: false,
    category: '센터소식'
  }
]

const NewsPreview = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
            센터 소식
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            위즈포레의 최신 소식과 프로그램 업데이트를<br />
            가장 먼저 확인하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* 카테고리 및 날짜 */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-wizfore-100 text-wizfore-700 text-xs font-medium px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                      중요
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-wizfore-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(item.publishDate)}</span>
                  </div>
                  
                  <div className="flex items-center text-wizfore-600 text-sm font-medium group-hover:text-wizfore-700">
                    <span>자세히 보기</span>
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* SNS 연동 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              SNS에서도 만나보세요
            </h3>
            <p className="text-gray-600">
              실시간 소식과 유용한 정보를 SNS를 통해 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#"
              className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">f</span>
                </div>
                <span className="text-gray-700 font-medium">Facebook</span>
                <ExternalLink size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>

            <a
              href="#"
              className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">📷</span>
                </div>
                <span className="text-gray-700 font-medium">Instagram</span>
                <ExternalLink size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>

            <a
              href="#"
              className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">▶</span>
                </div>
                <span className="text-gray-700 font-medium">YouTube</span>
                <ExternalLink size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/community"
            className="inline-flex items-center border-2 border-wizfore-600 text-wizfore-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-wizfore-600 hover:text-white transition-all duration-300 group"
          >
            <span>모든 소식 보기</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsPreview

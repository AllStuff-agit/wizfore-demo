'use client'

import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import type { NewsItem } from '@/types'

interface NewsContentSectionProps {
  news: NewsItem[]
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  filteredNews: NewsItem[]
  newsByYear: Record<string, NewsItem[]>
  years: string[]
}

const NewsContentSection: React.FC<NewsContentSectionProps> = ({
  news,
  categories,
  selectedCategory,
  onCategoryChange,
  filteredNews,
  newsByYear,
  years
}) => {
  return (
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
            전체 소식
          </h2>
          <p className="text-wizfore-text-secondary mb-8">
            위즈포레 사회서비스센터의 다양한 협력 활동, 수상 내역, 행사 참여 등 
            주요 소식들을 시간순으로 확인하실 수 있습니다. 
          </p>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => onCategoryChange('all')}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm border transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-wizfore-warm-brown text-white border-wizfore-warm-brown' 
                  : 'bg-white text-wizfore-text-secondary border-gray-200 hover:border-wizfore-warm-brown'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              전체 ({news.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm border transition-colors ${
                  selectedCategory === category 
                    ? 'bg-wizfore-warm-brown text-white border-wizfore-warm-brown' 
                    : 'bg-white text-wizfore-text-secondary border-gray-200 hover:border-wizfore-warm-brown'
                }`}
              >
                {category} ({news.filter(n => n.category === category).length})
              </button>
            ))}
          </div>
        </motion.div>

        {/* 연도별 뉴스 목록 */}
        <div className="max-w-6xl mx-auto">
          {years.map((year, yearIndex) => (
            <motion.div
              key={year}
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: yearIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* 연도 헤더 */}
              <div className="flex items-center mb-8">
                <div className="bg-wizfore-warm-brown text-white px-6 py-3 rounded-lg font-bold text-xl">
                  {year}년
                </div>
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
                <div className="text-wizfore-text-secondary text-sm ml-4">
                  {newsByYear[year].length}건
                </div>
              </div>

              {/* 해당 연도의 뉴스들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsByYear[year]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((item, index) => (
                    <motion.div
                      key={item.title + item.date}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* 카드 헤더 */}
                      <div className="bg-gradient-to-r from-wizfore-warm-brown/10 to-wizfore-warm-brown/5 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm border bg-gray-50 text-gray-700 border-gray-200">
                            {item.category}
                          </div>
                          <div className="text-sm text-wizfore-text-secondary">
                            {new Date(item.date).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-wizfore-text-primary leading-tight">
                          {item.title}
                        </h3>
                      </div>

                      {/* 카드 본문 */}
                      <div className="p-4">
                        <p className="text-wizfore-text-secondary text-sm leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsContentSection
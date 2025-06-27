'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import { Calendar, Award, Users, Newspaper, Filter, TrendingUp } from 'lucide-react'

export default function NewsPage() {
  const news = defaultSiteData.community.news
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'partnership': return <Users className="w-5 h-5" />
      case 'award': return <Award className="w-5 h-5" />
      case 'event': return <Calendar className="w-5 h-5" />
      case 'news': return <Newspaper className="w-5 h-5" />
      default: return <Newspaper className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'partnership': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'award': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'event': return 'bg-green-50 text-green-700 border-green-200'
      case 'news': return 'bg-purple-50 text-purple-700 border-purple-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'partnership': return '협력/협약'
      case 'award': return '수상'
      case 'event': return '행사'
      case 'news': return '소식'
      default: return '기타'
    }
  }

  // 카테고리별 통계
  const categoryStats = [
    { 
      id: 'partnership', 
      name: '협력/협약', 
      count: news.filter(n => n.category === 'partnership').length,
      description: '대학 및 기관과의 업무협약'
    },
    { 
      id: 'news', 
      name: '센터 소식', 
      count: news.filter(n => n.category === 'news').length,
      description: '서비스 안내 및 센터 소식'
    },
    { 
      id: 'event', 
      name: '행사', 
      count: news.filter(n => n.category === 'event').length,
      description: '포럼, 설명회, 탐방 등'
    },
    { 
      id: 'award', 
      name: '수상', 
      count: news.filter(n => n.category === 'award').length,
      description: '표창장 및 공모전 수상'
    }
  ]

  // 필터링된 뉴스
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  // 연도별 그룹화
  const newsByYear = filteredNews.reduce((acc, item) => {
    const year = item.date.substring(0, 4)
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(item)
    return acc
  }, {} as Record<string, typeof news>)

  const years = Object.keys(newsByYear).sort((a, b) => parseInt(b) - parseInt(a))

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
            센터 소식
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            위즈포레의 다양한 활동과 성과를 확인해보세요
          </motion.p>
        </div>
      </section>

      {/* 개요 섹션 */}
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
              센터 소식 및 성과
            </h2>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed">
              위즈포레 사회서비스센터의 다양한 협력 활동, 수상 내역, 행사 참여 등 
              주요 소식들을 시간순으로 확인하실 수 있습니다. 
              총 {news.length}건의 소식을 통해 센터의 성장과 발전 과정을 살펴보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 카테고리별 통계 섹션 */}
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
              소식 현황
            </h2>
            <p className="text-wizfore-text-secondary">
              카테고리별 소식 현황을 확인해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categoryStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-wizfore-warm-brown/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="text-wizfore-warm-brown">
                    {getCategoryIcon(stat.id)}
                  </div>
                </div>
                <div className="text-2xl font-bold text-wizfore-warm-brown mb-1">
                  {stat.count}
                </div>
                <p className="text-wizfore-text-primary font-medium mb-2">{stat.name}</p>
                <p className="text-wizfore-text-secondary text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 필터 및 뉴스 목록 섹션 */}
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
              전체 소식
            </h2>
            <p className="text-wizfore-text-secondary mb-8">
              카테고리별로 필터링하여 원하는 소식을 찾아보세요
            </p>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm border transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-wizfore-warm-brown text-white border-wizfore-warm-brown' 
                    : 'bg-white text-wizfore-text-secondary border-gray-200 hover:border-wizfore-warm-brown'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                전체 ({news.length})
              </button>
              {categoryStats.map((stat) => (
                <button
                  key={stat.id}
                  onClick={() => setSelectedCategory(stat.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm border transition-colors ${
                    selectedCategory === stat.id 
                      ? 'bg-wizfore-warm-brown text-white border-wizfore-warm-brown' 
                      : 'bg-white text-wizfore-text-secondary border-gray-200 hover:border-wizfore-warm-brown'
                  }`}
                >
                  {getCategoryIcon(stat.id)}
                  <span className="ml-2">{stat.name} ({stat.count})</span>
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
                        key={item.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {/* 카드 헤더 */}
                        <div className="bg-gradient-to-r from-wizfore-warm-brown/10 to-wizfore-warm-brown/5 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getCategoryColor(item.category)}`}>
                              {getCategoryIcon(item.category)}
                              <span className="ml-1">{getCategoryName(item.category)}</span>
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

      {/* 성과 요약 섹션 */}
      <section className="py-16 bg-wizfore-warm-brown/5">
        <div className="container-custom mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-wizfore-text-primary mb-6">
              지속적인 성장과 발전
            </h2>
            <p className="text-lg text-wizfore-text-secondary leading-relaxed mb-8">
              위즈포레는 2021년부터 현재까지 지속적인 협력 관계 구축과 전문성 향상을 통해 
              지역사회 사회서비스 기관으로서의 역할을 확대해나가고 있습니다.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-wizfore-warm-brown rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-wizfore-text-secondary">총 소식</div>
                  <div className="text-lg font-semibold text-wizfore-text-primary">{news.length}건</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-wizfore-warm-brown rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-wizfore-text-secondary">협력 기관</div>
                  <div className="text-lg font-semibold text-wizfore-text-primary">{categoryStats[0].count}곳</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
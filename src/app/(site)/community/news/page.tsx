'use client'

import { useState } from 'react'
import { defaultSiteData } from '@/lib/data/defaultSiteData'
import NewsHeroSection from '@/components/community/news/NewsHeroSection'
import NewsContentSection from '@/components/community/news/NewsContentSection'

export default function NewsPage() {
  const news = defaultSiteData.community.news
  const categories = defaultSiteData.community.categories
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
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
      <NewsHeroSection />
      <NewsContentSection 
        news={news}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredNews={filteredNews}
        newsByYear={newsByYear}
        years={years}
      />
    </div>
  )
}
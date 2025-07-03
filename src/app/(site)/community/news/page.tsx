'use client'

import { useState, useEffect } from 'react'
import { getCommunity } from '@/lib/services/dataService'
import NewsHeroSection from '@/components/community/news/NewsHeroSection'
import NewsContentSection from '@/components/community/news/NewsContentSection'
import type { NewsItem } from '@/types'

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true)
        const communityData = await getCommunity()
        setNews(communityData.news || [])
        setCategories(communityData.categories || [])
      } catch (err) {
        console.error('Error fetching community data:', err)
        setError('뉴스 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityData()
  }, [])
  
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wizfore-warm-brown mx-auto mb-4"></div>
          <p className="text-wizfore-text-secondary">뉴스를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-wizfore-warm-brown text-white rounded hover:bg-wizfore-warm-brown/90"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

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
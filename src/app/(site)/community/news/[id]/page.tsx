'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { getCommunity } from '@/lib/services/dataService'
import { findNewsByGlobalId } from '@/lib/utils/newsUtils'
import type { NewsItem } from '@/types'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  
  const [newsItem, setNewsItem] = useState<(NewsItem & { category: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true)
        const communityData = await getCommunity()
        const foundNews = findNewsByGlobalId(communityData.news.articles, id as string)
        
        if (foundNews) {
          setNewsItem(foundNews)
        } else {
          setError('뉴스를 찾을 수 없습니다.')
        }
      } catch (err) {
        console.error('Error fetching news detail:', err)
        setError('뉴스를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchNewsDetail()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wizfore-coral-primary mx-auto mb-4"></div>
          <p className="text-wizfore-text-secondary">뉴스를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || '뉴스를 찾을 수 없습니다.'}</p>
          <button 
            onClick={() => router.push('/community/news')} 
            className="px-4 py-2 bg-wizfore-coral-primary text-white rounded hover:bg-wizfore-coral-secondary transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom mx-auto px-4 py-6">
          <button
            onClick={() => router.push('/community/news')}
            className="inline-flex items-center text-wizfore-text-secondary hover:text-wizfore-coral-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-wizfore-text-primary mb-4">
              {newsItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-wizfore-text-secondary">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(newsItem.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).replace(/\./g, '.').replace(/\s/g, '')}
              </div>
              
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span className="px-2 py-1 bg-wizfore-coral-primary text-white text-xs rounded-full">
                  {newsItem.category}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 본문 */}
      <div className="container-custom mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {newsItem.imageUrl && (
              <div className="mb-8">
                <img
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-wizfore-text-primary whitespace-pre-wrap">
                {newsItem.content}
              </p>
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/community/news')}
              className="inline-flex items-center px-6 py-3 bg-wizfore-coral-primary text-white rounded-lg hover:bg-wizfore-coral-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}